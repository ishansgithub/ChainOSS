import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  RocketLaunchIcon,
  WalletIcon,
  PlayIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface HeroSectionProps {
  isConnected: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isConnected }) => {
  const stats = [
    { label: 'Contributors', value: '1.2K', icon: '👥' },
    { label: 'Rewards Paid', value: '2.5M', icon: '💎' },
    { label: 'Projects', value: '156', icon: '🚀' },
  ];

  return (
    <section className="relative min-h-screen flex items-start pt-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-12 relative z-10">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-full">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-emerald-300 tracking-widest uppercase glitch-effect">SYSTEM_ONLINE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-8">
              <h1 className="text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                <span className="block text-white font-black">ChainOSS</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent font-black animate-pulse glitch-effect">
                  REWARDS
                </span>
              </h1>
              
              <p className="text-2xl text-white/80 leading-relaxed max-w-2xl font-medium tracking-wide">
                <span className="text-emerald-400 font-bold">&gt;</span> Transform open-source contributions into crypto rewards through 
                <span className="text-emerald-300 font-bold"> decentralized_validation</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              {isConnected ? (
                <Link
                  to="/dashboard"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-bold shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 text-lg"
                >
                  <SparklesIcon className="w-6 h-6" />
                  <span className="tracking-wider uppercase">Launch_Dashboard</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ) : (
                <div className="inline-flex items-center gap-4 px-10 py-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
                  <WalletIcon className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-300 font-bold tracking-wider uppercase text-lg">Connect_Wallet</span>
                </div>
              )}
              
              <Link
                to="/contributions"
                className="group relative inline-flex items-center gap-4 px-10 py-5 border border-emerald-500/30 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 text-emerald-300 hover:text-emerald-200 font-bold text-lg"
              >
                <PlayIcon className="w-6 h-6" />
                <span className="tracking-wider uppercase">Explore_System</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Right Side - Clean Stats */}
          <div className="relative">
            <div className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-10 relative overflow-hidden">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none"></div>
              
              <div className="text-center mb-12 relative z-10">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4 tracking-wider uppercase glitch-effect">Live_Metrics</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-12 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl mb-3 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      {stat.icon}
                    </div>
                    <div className="text-5xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 tracking-wider">
                      {stat.value}
                    </div>
                    <div className="text-lg text-emerald-400/70 font-bold tracking-widest uppercase group-hover:text-emerald-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;