import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import SupportedTechnoliges from '../components/SupportedTechnologies';
import DeveloperTestimonials from '../components/DeveloperTestimonials';
import SignupCTA from '../components/SignupCTA';

const Home: React.FC = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-emerald-950 to-black font-mono">
      {/* Animated Floating Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Animated Green Orbs with Glossy Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400/30 via-green-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-l from-green-400/25 via-emerald-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-emerald-300/10 via-green-400/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-5 h-5 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }}></div>
        
        {/* Glossy Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-500/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <HeroSection isConnected={isConnected} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Process Steps Section */}
      <SupportedTechnoliges />

      <DeveloperTestimonials/>

      {/* Signup CTA Section */}
      <SignupCTA isConnected={isConnected} />

      {/* Custom Animations & Geeky Font Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&family=Space+Mono:wght@400;700&family=Fira+Code:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'JetBrains Mono', 'Space Mono', 'Fira Code', monospace !important;
          letter-spacing: 0.05em !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(1deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-1deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }
        
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 #10b981, -2px 0 #059669; }
          25% { text-shadow: -2px 0 #10b981, 2px 0 #059669; }
          50% { text-shadow: 2px 0 #059669, -2px 0 #10b981; }
          75% { text-shadow: -2px 0 #059669, 2px 0 #10b981; }
        }
        
        .geek-text {
          font-family: 'JetBrains Mono', monospace !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
        }
        
        .glitch-effect:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;