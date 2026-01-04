import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { 
  StarIcon, 
  CpuChipIcon, 
  ServerIcon,
  SparklesIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import StatsGrid from '../components/StatsGrid';
import AchievementGallery from '../components/AchievementGallery';
import ActivityTimeline from '../components/ActivityTimeline';
import ContributionAnalytics from '../components/ContributionAnalytics';

const Profile: React.FC = () => {
  const { isConnected, account } = useWeb3();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur-lg opacity-30"></div>
            <ServerIcon className="w-12 h-12 text-emerald-400 relative z-10" />
          </div>
          <h2 className="text-5xl font-black text-white mb-8 tracking-wider uppercase">Connect_Wallet</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-12"></div>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide">
            <span className="text-emerald-400 font-bold">&gt;</span> Connect your wallet to view your profile and track your open-source contributions.
          </p>
          <p className="text-lg text-emerald-400/80 font-bold tracking-wider uppercase">
            Access your decentralized identity and achievements
          </p>
        </div>
      </div>
    );
  }

  // Calculate achievement points for header
  const achievements = [
    { earned: true, points: 50 },
    { earned: true, points: 200 },
    { earned: true, points: 500 },
    { earned: true, points: 1000 },
    { earned: false, points: 300 },
    { earned: false, points: 750 },
    { earned: false, points: 400 },
    { earned: false, points: 2000 }
  ];

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const earnedAchievements = achievements.filter(a => a.earned).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black font-mono">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/20 via-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-green-400/15 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-24">
          <div className="relative inline-block mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-emerald-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{account?.slice(2, 4).toUpperCase()}</span>
            </div>
            {earnedAchievements > 0 && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-emerald-900 shadow-lg">
                <span className="text-sm font-black text-emerald-900">{earnedAchievements}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-black mb-8 text-white tracking-wider uppercase">Developer_Profile</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-12"></div>
          
          <div className="inline-flex items-center px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-8 backdrop-blur-sm">
            <span className="text-emerald-300 font-bold tracking-wider uppercase text-lg font-mono">
              {account?.slice(0, 8)}...{account?.slice(-6)}
            </span>
          </div>
          
          <div className="text-lg text-emerald-400/80 font-bold tracking-wider uppercase">
            <span className="text-emerald-300 font-black">{totalPoints.toLocaleString()}</span> points earned from {earnedAchievements} achievements
          </div>
        </div>

        {/* Stats Grid Component */}
        <div className="mb-16">
          <StatsGrid />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-12">
            {/* Achievement Gallery Component */}
            <AchievementGallery />
          </div>
          
          <div className="space-y-12">
            {/* Activity Timeline Component */}
            <ActivityTimeline />
          </div>
        </div>

        {/* Contribution Analytics Component */}
        <div className="mb-16">
          <ContributionAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Profile;