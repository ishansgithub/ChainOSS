import React, { useState, useEffect } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { web3Service, ContributionCategory } from "../utils/web3";
import { 
  createContribution, 
  getContributions, 
  createValidation,
  updateContribution,
  getContributionById
} from "../firebase";
import {
  PlusIcon,
  CodeBracketIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  HandRaisedIcon,
  XCircleIcon,
  LinkIcon,
  SparklesIcon,
  GiftIcon,
  CpuChipIcon,
  ServerIcon
} from "@heroicons/react/24/outline";

interface Contribution {
  id: string; 
  title: string;
  description: string;
  projectUrl: string;
  githubPR: string;
  contributor: string;
  category: number;
  submissionTime: Date;
  approvalVotes: number;
  rejectionVotes: number;
  totalValidators: number;
  status: number;
  rewardAmount: string;
  claimed: boolean;
  isMock?: boolean;
  voters?: string[]; 
}

const Contributions: React.FC = () => {
  const { isConnected, account } = useWeb3();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectUrl: "",
    githubPR: "",
    category: "bug-fix",
  });

  useEffect(() => {
    fetchContributions();
  }, [isConnected, account]);

  const fetchContributions = async () => {
    // Mock contributions data
    const mockContributions: Contribution[] = [
      {
        id: "1",
        title: "Advanced Memory Pool Optimization",
        description:
          "Implemented sophisticated memory management techniques in the transaction pool, achieving 42% reduction in memory footprint and faster transaction processing.",
        projectUrl: "https://github.com/defi-protocol/core-contracts",
        githubPR: "https://github.com/defi-protocol/core-contracts/pull/247",
        contributor: "0x742d35Cc6634C0532925a3b8D404fddBD4f4d4d4",
        category: ContributionCategory.Performance,
        submissionTime: new Date("2024-01-15"),
        approvalVotes: 15,
        rejectionVotes: 2,
        totalValidators: 18,
        status: 1, // Approved
        rewardAmount: "350",
        claimed: true,
        isMock: true,
      },
      {
        id: "2",
        title: "Zero-Knowledge Proof Integration",
        description:
          "Developed and integrated zk-SNARK verification modules for enhanced privacy in cross-chain transactions. Includes comprehensive test coverage and formal verification.",
        projectUrl: "https://github.com/bridge-protocol/core",
        githubPR: "https://github.com/bridge-protocol/core/pull/89",
        contributor: "0x8ba1f109551bD432803012645Hac136c2c2e2c2e",
        category: ContributionCategory.Security,
        submissionTime: new Date("2024-01-12"),
        approvalVotes: 22,
        rejectionVotes: 1,
        totalValidators: 25,
        status: 1, // Approved
        rewardAmount: "500",
        claimed: false,
        isMock: true,
      },
      {
        id: "3",
        title: "Real-time WebSocket Event System",
        description:
          "Built a scalable real-time notification system using WebSockets and Redis pub/sub, enabling instant updates for governance proposals and voting events.",
        projectUrl: "https://github.com/oss-dao/api-server",
        githubPR: "https://github.com/oss-dao/api-server/pull/156",
        contributor: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        category: ContributionCategory.Feature,
        submissionTime: new Date("2024-01-10"),
        approvalVotes: 8,
        rejectionVotes: 5,
        totalValidators: 15,
        status: 0, // Pending
        rewardAmount: "0",
        claimed: false,
        isMock: true,
      },
      {
        id: "4",
        title: "Multi-signature Wallet Enhancement",
        description:
          "Enhanced the mobile wallet with multi-signature capabilities, hardware wallet integration, and biometric authentication for improved security.",
        projectUrl: "https://github.com/oss-dao/mobile-app",
        githubPR: "https://github.com/oss-dao/mobile-app/pull/78",
        contributor: "0x9876543210fedcba0987654321fedcba09876543",
        category: ContributionCategory.Feature,
        submissionTime: new Date("2024-01-08"),
        approvalVotes: 12,
        rejectionVotes: 8,
        totalValidators: 20,
        status: 2, // Rejected
        rewardAmount: "0",
        claimed: false,
        isMock: true,
      },
      {
        id: "5",
        title: "Interactive Developer Playground",
        description:
          "Created an interactive coding environment with live smart contract testing, step-by-step tutorials, and integrated IDE features for new developers.",
        projectUrl: "https://github.com/oss-dao/documentation",
        githubPR: "https://github.com/oss-dao/documentation/pull/234",
        contributor: "0x456789abcdef0123456789abcdef012345678901",
        category: ContributionCategory.Documentation,
        submissionTime: new Date("2024-01-05"),
        approvalVotes: 18,
        rejectionVotes: 3,
        totalValidators: 21,
        status: 1, // Approved
        rewardAmount: "275",
        claimed: true,
        isMock: true,
      },
    ];

    try {
      setLoading(true);
      
      // Set mock contributions directly
      setContributions(mockContributions);
      
      // Try to fetch from Firebase if available, but don't override mock data
      if (process.env.REACT_APP_FIREBASE_API_KEY && process.env.REACT_APP_FIREBASE_PROJECT_ID) {
        try {
          const firebaseContributions = await getContributions(50);
          if (firebaseContributions.length > 0) {
            // Add Firebase contributions to mock data
            const transformedFirebase = firebaseContributions.map((contrib: any) => ({
              id: contrib.id,
              title: contrib.title,
              description: contrib.description,
              projectUrl: contrib.projectUrl || "",
              githubPR: contrib.githubPR || "",
              contributor: contrib.contributor || "",
              category: contrib.category || 0,
              submissionTime: contrib.createdAt?.toDate() || new Date(),
              approvalVotes: contrib.approvalVotes || 0,
              rejectionVotes: contrib.rejectionVotes || 0,
              totalValidators: contrib.totalValidators || 0,
              status: contrib.status || 0,
              rewardAmount: contrib.rewardAmount || "0",
              claimed: contrib.claimed || false,
              voters: contrib.voters || [],
              isMock: false
            }));
            setContributions([...transformedFirebase, ...mockContributions]);
          }
        } catch (error) {
          console.log("Firebase fetch failed, using mock data only");
        }
      }
    } catch (error) {
      console.error("Failed to fetch contributions:", error);
      // Fallback to mock data
      setContributions(mockContributions);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      value: "bug-fix",
      label: "Bug Fix",
      contractValue: ContributionCategory.BugFix,
    },
    {
      value: "feature",
      label: "Feature",
      contractValue: ContributionCategory.Feature,
    },
    {
      value: "security",
      label: "Security",
      contractValue: ContributionCategory.Security,
    },
    {
      value: "documentation",
      label: "Documentation",
      contractValue: ContributionCategory.Documentation,
    },
    {
      value: "performance",
      label: "Performance",
      contractValue: ContributionCategory.Performance,
    },
    {
      value: "research",
      label: "Research",
      contractValue: ContributionCategory.Research,
    },
  ];

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return <CheckCircleIcon className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <ExclamationCircleIcon className="w-4 h-4 text-rose-400" />;
      default:
        return <ClockIcon className="w-4 h-4 text-amber-400" />;
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case 2:
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Pending";
    }
  };

  const getCategoryColor = (category: number) => {
    const colors: { [key: number]: string } = {
      [ContributionCategory.BugFix]:
        "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30",
      [ContributionCategory.Feature]:
        "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
      [ContributionCategory.Security]:
        "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30",
      [ContributionCategory.Documentation]:
        "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30",
      [ContributionCategory.Performance]:
        "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30",
      [ContributionCategory.Research]:
        "bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/30",
    };
    return (
      colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
    );
  };

  const getCategoryName = (category: number) => {
    const names: { [key: number]: string } = {
      [ContributionCategory.BugFix]: "Bug Fix",
      [ContributionCategory.Feature]: "Feature",
      [ContributionCategory.Security]: "Security",
      [ContributionCategory.Documentation]: "Documentation",
      [ContributionCategory.Performance]: "Performance",
      [ContributionCategory.Research]: "Research",
    };
    return names[category] || "Unknown";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const category = categories.find((c) => c.value === formData.category);
      if (!category) {
        alert("Invalid category selected");
        return;
      }

      // Create a new contribution for immediate display
      const newContribution: Contribution = {
        id: Date.now().toString(), // Use timestamp as unique ID
        title: formData.title,
        description: formData.description,
        projectUrl: formData.projectUrl,
        githubPR: formData.githubPR,
        contributor: account || "0x" + Math.random().toString(16).substr(2, 40),
        category: category.contractValue,
        submissionTime: new Date(),
        approvalVotes: 0,
        rejectionVotes: 0,
        totalValidators: 0,
        status: 0, // Pending
        rewardAmount: "0",
        claimed: false,
        isMock: true,
        voters: []
      };

      // Add the new contribution to the list immediately
      setContributions((prev) => [newContribution, ...prev]);

      // Try to save to Firebase if available
      if (process.env.REACT_APP_FIREBASE_API_KEY && process.env.REACT_APP_FIREBASE_PROJECT_ID) {
        try {
          const contributionData = {
            title: formData.title,
            description: formData.description,
            projectUrl: formData.projectUrl,
            githubPR: formData.githubPR,
            contributor: newContribution.contributor,
            category: category.contractValue,
            approvalVotes: 0,
            rejectionVotes: 0,
            totalValidators: 0,
            status: 0,
            rewardAmount: "0",
            claimed: false,
            voters: []
          };

          const firebaseId = await createContribution(contributionData);
          if (firebaseId) {
            // Update the contribution with the Firebase ID
            setContributions((prev) => 
              prev.map(c => c.id === newContribution.id ? { ...c, id: firebaseId } : c)
            );
          }
        } catch (error) {
          console.error("Firebase save failed:", error);
        }
      }

      // Try to submit to blockchain if available
      if (web3Service.isContractsDeployed()) {
        try {
          await web3Service.submitContribution(
            formData.title,
            formData.description,
            formData.projectUrl,
            formData.githubPR,
            category.contractValue
          );
        } catch (error) {
          console.error("Blockchain submission failed:", error);
        }
      }

      alert("Contribution submitted successfully!");
      setFormData({
        title: "",
        description: "",
        projectUrl: "",
        githubPR: "",
        category: "bug-fix",
      });
      setShowSubmitForm(false);
    } catch (error) {
      console.error("Failed to submit contribution:", error);
      alert("Failed to submit contribution: " + (error as Error).message);
    }
  };

  const handleVote = async (contributionId: string, approve: boolean) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      // Get current contribution
      const contribution = contributions.find(c => c.id === contributionId);
      if (!contribution) {
        alert("Contribution not found");
        return;
      }

      // Check if user has already voted
      if (contribution.voters?.includes(account || "")) {
        alert("You have already voted on this contribution");
        return;
      }

      // Update local state immediately for instant feedback
      const updatedData = {
        approvalVotes: approve ? contribution.approvalVotes + 1 : contribution.approvalVotes,
        rejectionVotes: !approve ? contribution.rejectionVotes + 1 : contribution.rejectionVotes,
        totalValidators: contribution.totalValidators + 1,
        voters: [...(contribution.voters || []), account || ""]
      };

      setContributions((prev) => 
        prev.map(c => c.id === contributionId ? { ...c, ...updatedData } : c)
      );

      // Try to update in Firebase if available
      if (process.env.REACT_APP_FIREBASE_API_KEY && process.env.REACT_APP_FIREBASE_PROJECT_ID) {
        try {
          const success = await updateContribution(contributionId, updatedData);
          if (!success) {
            throw new Error("Failed to update vote in Firebase");
          }
        } catch (error) {
          console.error("Firebase vote update failed:", error);
          // Revert local state if Firebase update failed
          setContributions((prev) => 
            prev.map(c => c.id === contributionId ? { ...c, ...contribution } : c)
          );
          throw error;
        }
      }

      // Try to submit vote to blockchain if available
      if (web3Service.isContractsDeployed()) {
        try {
          await web3Service.validateContribution(
            parseInt(contributionId),
            approve
          );
        } catch (error) {
          console.error("Blockchain vote failed:", error);
        }
      }

      alert("Vote submitted successfully!");
    } catch (error) {
      console.error("Failed to vote:", error);
      alert("Failed to vote: " + (error as Error).message);
    }
  };

  const handleClaimReward = async (contributionId: string) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const tx = await web3Service.claimReward(parseInt(contributionId));
      alert("Reward claimed successfully!");
      fetchContributions();
    } catch (error) {
      console.error("Failed to claim reward:", error);
      alert("Failed to claim reward: " + (error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl blur-lg opacity-30"></div>
            <ServerIcon className="w-10 h-10 text-emerald-400 relative z-10 animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-wider uppercase">Loading_Data</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-emerald-400/80 font-bold tracking-wider uppercase">Fetching_Contributions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black font-mono">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/20 via-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-green-400/15 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 text-white tracking-wider uppercase">
            Contributions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-12"></div>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed tracking-wide">
            <span className="text-emerald-400 font-bold">&gt;</span> Submit your work, earn rewards, and help build the next generation of open-source technology through community validation.
          </p>
        </div>

        {/* Submit Button */}
        {isConnected && (
          <div className="text-center mb-16">
            <button
              onClick={() => setShowSubmitForm(true)}
              className="group relative inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-black tracking-wider uppercase text-xl shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-2"
            >
              <PlusIcon className="w-8 h-8" />
              <span>Submit_Contribution</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}

        {!isConnected && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 px-12 py-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl backdrop-blur-sm">
              <ServerIcon className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Contributions List */}
        <div className="space-y-8">
          {contributions.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur-lg opacity-30"></div>
                <CodeBracketIcon className="w-12 h-12 text-emerald-400 relative z-10" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-wider uppercase">No_Contributions_Yet</h3>
              <p className="text-xl text-emerald-400/80 font-bold tracking-wider uppercase">Be_the_first_to_contribute!</p>
            </div>
          ) : (
            contributions.map((contribution) => (
              <div key={contribution.id} className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-10 relative overflow-hidden">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white tracking-wider uppercase">
                        {contribution.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-bold tracking-wider uppercase text-sm">
                          {getCategoryName(contribution.category)}
                        </span>
                        <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-bold tracking-wider uppercase text-sm">
                          Status: {contribution.status === 0 ? 'Pending' : contribution.status === 1 ? 'Approved' : 'Rejected'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-400 tracking-wider uppercase mb-2">
                        {contribution.rewardAmount} OSS
                      </div>
                      <div className="text-sm text-emerald-400/70 font-bold tracking-wider uppercase">
                        Reward
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xl text-white/80 leading-relaxed font-medium mb-8 tracking-wide">
                    <span className="text-emerald-400 font-bold">&gt;</span> {contribution.description}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {contribution.projectUrl && (
                      <a
                        href={contribution.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                      >
                        <LinkIcon className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                        <span className="font-bold tracking-wider uppercase">Project_Link</span>
                      </a>
                    )}
                    {contribution.githubPR && (
                      <a
                        href={contribution.githubPR}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                      >
                        <CodeBracketIcon className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                        <span className="font-bold tracking-wider uppercase">GitHub_PR</span>
                      </a>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="text-3xl font-black text-emerald-400 mb-2 tracking-wider">
                        {contribution.approvalVotes}
                      </div>
                      <div className="text-sm text-emerald-400/70 font-bold tracking-wider uppercase">
                        Approve
                      </div>
                    </div>
                    <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="text-3xl font-black text-rose-400 mb-2 tracking-wider">
                        {contribution.rejectionVotes}
                      </div>
                      <div className="text-sm text-rose-400/70 font-bold tracking-wider uppercase">
                        Reject
                      </div>
                    </div>
                    <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="text-3xl font-black text-white mb-2 tracking-wider">
                        {contribution.totalValidators}
                      </div>
                      <div className="text-sm text-emerald-400/70 font-bold tracking-wider uppercase">
                        Validators
                      </div>
                    </div>
                    <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="text-xl font-black text-white mb-2 tracking-wider">
                        {contribution.contributor.slice(0, 6)}...{contribution.contributor.slice(-4)}
                      </div>
                      <div className="text-sm text-emerald-400/70 font-bold tracking-wider uppercase">
                        Contributor
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {isConnected &&
                    contribution.status === 0 && (
                      <div className="mb-8">
                        {contribution.contributor !== account ? (
                          contribution.voters?.includes(account || "") ? (
                            <div className="text-center py-6 px-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                              <CheckCircleIcon className="w-8 h-8 inline mr-3" />
                              <span className="text-yellow-400 font-black text-xl tracking-wider uppercase">You have already voted on this contribution</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <button
                                onClick={() => handleVote(contribution.id, true)}
                                className="group/btn py-6 px-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 rounded-2xl flex items-center justify-center space-x-3 text-xl tracking-wider uppercase"
                              >
                                <HandRaisedIcon className="w-8 h-8 group-hover/btn:scale-110 transition-transform" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleVote(contribution.id, false)}
                                className="group/btn py-6 px-8 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black hover:bg-rose-500/20 hover:border-rose-500/40 transition-all duration-300 rounded-2xl flex items-center justify-center space-x-3 text-xl tracking-wider uppercase"
                              >
                                <XCircleIcon className="w-8 h-8 group-hover/btn:scale-110 transition-transform" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="text-center py-6 px-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
                            <SparklesIcon className="w-8 h-8 inline mr-3" />
                            <span className="text-blue-400 font-black text-xl tracking-wider uppercase">This is your contribution</span>
                          </div>
                        )}
                      </div>
                    )}

                  {/* Reward */}
                  {contribution.status === 1 && (
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 p-8 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                            <GiftIcon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-emerald-300 tracking-wider uppercase mb-2">Reward Available</h4>
                            <p className="text-emerald-400/80 font-bold tracking-wider uppercase">Your contribution has been approved!</p>
                          </div>
                        </div>
                        {contribution.contributor === account && !contribution.claimed && (
                          <button
                            onClick={() => handleClaimReward(contribution.id)}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-black tracking-wider uppercase"
                          >
                            Claim Reward
                          </button>
                        )}
                        {contribution.claimed && (
                          <div className="px-8 py-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl">
                            <span className="text-emerald-300 font-bold tracking-wider uppercase">Claimed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>  

        {/* Submit Form Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 border border-gray-600/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-light text-white mb-2">
                      Submit New Contribution
                    </h2>
                    <p className="text-gray-400">
                      Share your work with the community and earn rewards
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSubmitForm(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-200 mb-3">
                        Contribution Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-slate-900/50 border border-gray-600/50 text-white text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors rounded-xl"
                        placeholder="Brief, descriptive title of your contribution"
                        required
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-200 mb-3">
                        Detailed Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-slate-900/50 border border-gray-600/50 text-white text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors h-32 resize-none rounded-xl"
                        placeholder="Provide a comprehensive description of your contribution, including the problem solved and impact"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-200 mb-3">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-slate-900/50 border border-gray-600/50 text-white text-lg focus:border-blue-500 focus:outline-none transition-colors rounded-xl"
                      >
                        {categories.map((category) => (
                          <option
                            key={category.value}
                            value={category.value}
                            className="bg-slate-800"
                          >
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-200 mb-3">
                        Project Repository
                      </label>
                      <input
                        type="url"
                        value={formData.projectUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectUrl: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-slate-900/50 border border-gray-600/50 text-white text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors rounded-xl"
                        placeholder="https://github.com/organization/repository"
                        required
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-200 mb-3">
                        Pull Request URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubPR}
                        onChange={(e) =>
                          setFormData({ ...formData, githubPR: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-slate-900/50 border border-gray-600/50 text-white text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors rounded-xl"
                        placeholder="https://github.com/organization/repository/pull/123"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <SparklesIcon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-blue-300 font-medium mb-2">
                          Contribution Guidelines
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>
                            • Ensure your contribution adds significant value to
                            the project
                          </li>
                          <li>
                            • Include detailed documentation and testing where
                            applicable
                          </li>
                          <li>
                            • Follow the project's coding standards and best
                            practices
                          </li>
                          <li>
                            • Your submission will be reviewed by community
                            validators
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700/50">
                    <button
                      type="button"
                      onClick={() => setShowSubmitForm(false)}
                      className="flex-1 py-4 px-6 bg-gray-700/50 text-gray-300 font-medium hover:bg-gray-700/70 transition-colors rounded-xl border border-gray-600/50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      Submit Contribution
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributions;