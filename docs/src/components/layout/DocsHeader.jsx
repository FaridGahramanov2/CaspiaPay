import { Link } from 'react-router-dom';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DocsHeader({ onMenuClick }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('caspiapay_docs_theme');
    return saved ? saved === 'dark' : true; // default to dark
  });

  useEffect(() => {
    localStorage.setItem('caspiapay_docs_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mr-2"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AZ</span>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">CaspiaPay</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/quickstart" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            Quickstart
          </Link>
          <Link to="/authentication" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            API Reference
          </Link>
          <Link to="/sdks" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            SDKs
          </Link>
          <Link to="/connect" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            Connect
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="#"
            className="hidden sm:inline-block ml-2 px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
