import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Users, Shield, Search, Menu, X, LogOut, Home, Info, Phone, Camera, Newspaper, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLeagueOfficialAuth } from '../../contexts/LeagueOfficialAuthContext';

const Header: React.FC = () => {
  const { isAuthenticated: isAdminAuthenticated, logout: adminLogout } = useAuth();
  const { isAuthenticated: isOfficialAuthenticated, logout: officialLogout } = useLeagueOfficialAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isOfficialRoute = location.pathname.startsWith('/officials');
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    if (isOfficialRoute) {
      officialLogout();
      navigate('/officials/login');
    } else {
      adminLogout();
      navigate('/admin/login');
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Player Search', path: '/search', icon: Search },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <header className="bg-theme-gradient text-white shadow-strong border-b border-theme-accent/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-12 rounded-lg overflow-hidden border-2 border-theme-accent shadow-glow transition-all group-hover:border-theme-accentLight group-hover:shadow-glow-accent">
              <img
                src="https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/club-logos//-1Niwpcf1ltBk_KrB1iMQw_64x64.png"
                alt="FKF Aldai Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-theme-accent">FKF Aldai</span>
              <span className="text-sm text-theme-accent/70">Team Management</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 hover:text-theme-accent transition-all px-3 py-2 rounded-lg ${
                    location.pathname === item.path ? 'bg-theme-primary/50 text-theme-accent shadow-glow' : ''
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}

            {isAdminAuthenticated && isAdminRoute ? (
              <>
                <Link to="/admin" className="flex items-center space-x-1 hover:text-theme-accent transition-all px-3 py-2 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Admin Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all shadow-soft hover:shadow-strong"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : isOfficialAuthenticated && isOfficialRoute ? (
              <>
                <Link to="/officials/dashboard" className="flex items-center space-x-1 hover:text-theme-accent transition-all px-3 py-2 rounded-lg">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Officials Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all shadow-soft hover:shadow-strong"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/officials/login"
                  className="flex items-center space-x-1 border-2 border-theme-accent hover:bg-theme-accent hover:text-theme-primary text-theme-accent px-4 py-2 rounded-lg font-semibold transition-all shadow-glow hover:shadow-strong"
                >
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Officials Login</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 space-y-3 pb-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 py-2 px-3 hover:bg-theme-primary/50 rounded-lg transition-all ${
                    location.pathname === item.path ? 'bg-theme-primary/50 text-theme-accent' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {isAdminAuthenticated && isAdminRoute ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 py-2 px-3 hover:bg-theme-primary/50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-5 w-5" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left py-2 px-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : isOfficialAuthenticated && isOfficialRoute ? (
              <>
                <Link
                  to="/officials/dashboard"
                  className="flex items-center space-x-2 py-2 px-3 hover:bg-theme-primary/50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span>Officials Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left py-2 px-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/officials/login"
                  className="flex items-center space-x-2 py-2 px-3 border-2 border-theme-accent hover:bg-theme-accent hover:text-theme-primary text-theme-accent rounded-lg transition-all font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span>Officials Login</span>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
