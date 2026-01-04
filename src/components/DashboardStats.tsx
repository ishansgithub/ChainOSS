import React from 'react';
import {
  CurrencyDollarIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const DashboardStats: React.FC = () => {
  const userStats = [
    {
      label: 'Total Earned',
      value: '955',
      suffix: 'OSS coins',
      icon: CurrencyDollarIcon,
      trend: '+18%'
    },
    {
      label: 'Contributions',
      value: '5',
      suffix: 'projects',
      icon: TrophyIcon,
      trend: '+2'
    },
    {
      label: 'Reputation Score',
      value: '345',
      suffix: 'points',
      icon: StarIcon,
      trend: '+156'
    },
    {
      label: 'Active Streak',
      value: '1',
      suffix: 'days',
      icon: FireIcon,
      trend: 'New!'
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 font-mono">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white tracking-wider uppercase">
            Your_Impact
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-12"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed tracking-wide">
            <span className="text-emerald-400 font-bold">&gt;</span> Track your progress and see how your contributions are making a difference
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group text-center relative">
                <div className="space-y-8 p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-xl group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none"></div>
                  
                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-xl group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
                      <Icon className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="space-y-3 relative z-10">
                    <div className="text-4xl font-black text-white tracking-wider">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-lg text-emerald-400/80 font-bold ml-2">{stat.suffix}</span>
                      )}
                    </div>
                    
                    {/* Trend */}
                    <div className="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-full inline-block tracking-wider uppercase">
                      {stat.trend}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-lg text-emerald-300/80 font-bold tracking-wider uppercase group-hover:text-emerald-200 transition-colors relative z-10">
                    {stat.label.replace(' ', '_')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;