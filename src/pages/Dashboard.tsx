import React from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
  ServerIcon
} from "@heroicons/react/24/outline";

// Import the new components
import DashboardStats from "../components/DashboardStats";
import WalletInfo from "../components/WalletInfo";
import RecentActivity from "../components/RecentActivity";
import ReputationDashboard from "../components/ReputationDashboard";

const Dashboard: React.FC = () => {
  const { isConnected, account, balance, tokenBalance } = useWeb3();

  if (!isConnected) {
    return (
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl font-mono">
        <div className="text-center">
          <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl blur-lg opacity-30"></div>
              <ServerIcon className="w-12 h-12 text-emerald-400 relative z-10" />
            </div>

            {/* Title */}
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 tracking-wider uppercase">
              Connect_Wallet
            </h2>

            {/* Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-12"></div>

            {/* Description */}
            <div className="space-y-8">
              <p className="text-xl text-white/80 leading-relaxed font-medium tracking-wide">
                <span className="text-emerald-400 font-bold">&gt;</span> Welcome to your Dashboard. Monitor your contributions, track rewards, and stay updated with the latest DAO activities in this comprehensive dashboard.
              </p>
              
              <p className="text-lg text-emerald-400/70 font-bold tracking-wider uppercase">
                [ CONNECT_WALLET_TO_ACCESS_DASHBOARD ]
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in font-mono bg-gradient-to-br from-black via-emerald-950 to-black min-h-screen">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/20 via-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-l from-green-400/15 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-12 lg:space-y-0">
          {/* Header Content */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-black text-white tracking-wider uppercase">
              User_Dashboard
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl tracking-wide">
              <span className="text-emerald-400 font-bold">&gt;</span> Welcome back,{" "}
              <span className="text-emerald-300 font-black uppercase tracking-wider">Contributor</span>!
              Here's your decentralized impact overview.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6">
            <Link
              to="/contributions"
              className="group relative inline-flex items-center space-x-4 px-10 py-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
            >
              <PlusIcon className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 group-hover:rotate-90 transition-all duration-300 flex-shrink-0" />
              <span className="text-emerald-300 group-hover:text-emerald-200 transition-colors font-bold text-lg tracking-wider uppercase">
                New_Contribution
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Wallet Info Component */}
      <div className="relative z-10">
        <WalletInfo
          account={account!}
          balance={balance}
          tokenBalance={tokenBalance}
        />
      </div>

      {/* Stats Component */}
      <div className="relative z-10">
        <DashboardStats />
      </div>

      {/* Recent Activity Component */}
      <div className="relative z-10">
        <RecentActivity />
      </div>

      <div className="relative z-10">
        <ReputationDashboard/>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(10px) rotate(-1deg); }
        }
        
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 #10b981, -2px 0 #059669; }
          25% { text-shadow: -2px 0 #10b981, 2px 0 #059669; }
          50% { text-shadow: 2px 0 #059669, -2px 0 #10b981; }
          75% { text-shadow: -2px 0 #059669, 2px 0 #10b981; }
        }
        
        .glitch-effect:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
