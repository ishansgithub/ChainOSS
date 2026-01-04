import React from 'react';
import { 
  GiftIcon, 
  UsersIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: GiftIcon,
      title: 'Token Rewards',
      description: 'Get paid in tokens for open-source work you already love doing — no paperwork, just smart contracts.',
    },
    {
      icon: UsersIcon,
      title: 'Community Validation',
      description: 'Contributions are reviewed and valued by fellow developers — fair, open, and based on real impact.',
    },
    {
      icon: ChartBarIcon,
      title: 'Impact Analytics',
      description: 'See the difference you\'re making with clear insights into how your code helps the community.',
    }
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            How It <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent glitch-effect">Works</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-10"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed tracking-wide">
            <span className="text-emerald-400 font-bold">&gt;</span> A transparent, blockchain-powered process for recognizing valuable open-source work
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group text-center relative">
                <div className="space-y-8">
                  {/* Icon with glossy effect */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-xl group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-sm">
                      <Icon className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-wider uppercase glitch-effect">
                    {feature.title.replace(' ', '_')}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 leading-relaxed font-medium text-lg group-hover:text-white/80 transition-colors tracking-wide">
                    <span className="text-emerald-400 font-bold">&gt;</span> {feature.description}
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

export default FeaturesSection;