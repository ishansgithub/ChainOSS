import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CodeBracketIcon,
  UserIcon,
  WalletIcon,
  Bars3Icon,
  XMarkIcon,
  CpuChipIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const ResponsiveNavbar: React.FC = () => {
  const location = useLocation();
  const { isConnected, account, connectWallet, disconnect, isLoading } = useWeb3();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    // { name: 'Proposals', href: '/proposals', icon: DocumentTextIcon },
    { name: 'Contributions', href: '/contributions', icon: CodeBracketIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const isActive = (href: string) => location.pathname === href;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav
        ref={navRef}
        className="fixed top-6 left-6 right-6 z-50 bg-emerald-500/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-500/30 font-mono"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-black text-white tracking-wider flex items-center space-x-2">
                <CpuChipIcon className="w-6 h-6 text-emerald-400" />
                <span>Chain</span>
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">OSS</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40'
                        : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30'
                    } flex items-center px-6 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 border relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">{item.name.replace(' ', '_')}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Wallet Section */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-4">
                  {/* Account Display */}
                  <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
                    <span className="text-sm text-emerald-300 font-bold tracking-wider uppercase font-mono">
                      {formatAddress(account!)}
                    </span>
                  </div>
                  
                  {/* Disconnect Button */}
                  <button
                    onClick={disconnect}
                    className="flex items-center px-4 py-3 hover:bg-emerald-500/10 text-emerald-400/80 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/40 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-xl font-black tracking-wider uppercase text-sm transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  {isLoading ? 'Connecting...' : 'Connect_Wallet'}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-xl hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/40 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-2'
          } overflow-hidden`}>
            <div className="px-2 pt-2 pb-4 space-y-2">
              {/* Mobile Navigation Links */}
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40'
                        : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30'
                    } flex items-center px-4 py-4 rounded-xl text-base font-bold tracking-wider uppercase transition-all duration-300 border`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name.replace(' ', '_')}
                  </Link>
                );
              })}

              {/* Mobile Wallet Section */}
              <div className="pt-4 mt-4">
                {isConnected ? (
                  <div className="space-y-4">
                    {/* Account Display */}
                    <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <span className="text-sm text-emerald-300 font-bold tracking-wider uppercase font-mono">
                        {formatAddress(account!)}
                      </span>
                    </div>
                    
                    {/* Disconnect Button */}
                    <button
                      onClick={() => {
                        disconnect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center px-4 py-4 hover:bg-emerald-500/10 text-emerald-400/80 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/40 rounded-xl text-base font-bold tracking-wider uppercase transition-all duration-300"
                    >
                      <XMarkIcon className="w-5 h-5 mr-2" />
                      Disconnect_Wallet
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      connectWallet();
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-xl font-black tracking-wider uppercase text-base transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Connecting...' : 'Connect_Wallet'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer div to push content below the navbar */}
      <div className="h-32"></div>
    </>
  );
};

export default ResponsiveNavbar;