import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, updateDoc, arrayUnion, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Collections
const USERS_COLLECTION = 'users';
const CONTRIBUTIONS_COLLECTION = 'contributions';
const PROJECTS_COLLECTION = 'projects';
const VALIDATIONS_COLLECTION = 'validations';

// User Management
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, USERS_COLLECTION, userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Contribution Management
export const createContribution = async (contributionData) => {
  try {
    const docRef = await addDoc(collection(db, CONTRIBUTIONS_COLLECTION), {
      ...contributionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating contribution:', error);
    return null;
  }
};

export const getContributions = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, CONTRIBUTIONS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting contributions:', error);
    return [];
  }
};

export const getUserContributions = async (userId) => {
  try {
    const q = query(
      collection(db, CONTRIBUTIONS_COLLECTION),
      where('contributor', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user contributions:', error);
    return [];
  }
};

export const updateContribution = async (contributionId, updates) => {
  try {
    await updateDoc(doc(db, CONTRIBUTIONS_COLLECTION, contributionId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating contribution:', error);
    return false;
  }
};

export const getContributionById = async (contributionId) => {
  try {
    const contributionDoc = await getDoc(doc(db, CONTRIBUTIONS_COLLECTION, contributionId));
    return contributionDoc.exists() ? { id: contributionDoc.id, ...contributionDoc.data() } : null;
  } catch (error) {
    console.error('Error getting contribution:', error);
    return null;
  }
};

// Project Management
export const createProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const getProjects = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export const getProjectById = async (projectId) => {
  try {
    const projectDoc = await getDoc(doc(db, PROJECTS_COLLECTION, projectId));
    return projectDoc.exists() ? { id: projectDoc.id, ...projectDoc.data() } : null;
  } catch (error) {
    console.error('Error getting project:', error);
    return null;
  }
};

// Validation Management
export const createValidation = async (validationData) => {
  try {
    const docRef = await addDoc(collection(db, VALIDATIONS_COLLECTION), {
      ...validationData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating validation:', error);
    return null;
  }
};

export const updateContributionValidations = async (contributionId, validationData) => {
  try {
    await updateDoc(doc(db, CONTRIBUTIONS_COLLECTION, contributionId), {
      validations: arrayUnion(validationData),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating contribution validations:', error);
    return false;
  }
};

// Generic CRUD operations
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return null;
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return null;
  }
};

export const updateDocument = async (collectionName, docId, updates) => {
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    return false;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    return false;
  }
};

export const queryDocuments = async (collectionName, constraints = [], limitCount = 50) => {
  try {
    const q = query(
      collection(db, collectionName),
      ...constraints,
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    return [];
  }
};