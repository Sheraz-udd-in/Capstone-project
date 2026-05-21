import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sprout, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 glass-dark shadow-soft border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden md:block">
              Smart Crop Advisory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t('home')}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('dashboard')}
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  👨‍🌾 {user?.name}
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">
                    {t('login')}
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/signup">
                    {t('signup')}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border/50"
            >
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('home')}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('dashboard')}
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="text-sm font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="gap-2 justify-start"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {language === 'en' ? 'हिंदी' : 'English'}
                  </span>
                </Button>

                {isAuthenticated ? (
                  <>
                    <div className="text-sm text-muted-foreground">
                      👨‍🌾 {user?.name}
                    </div>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                      {t('logout')}
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        {t('login')}
                      </Link>
                    </Button>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        {t('signup')}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
