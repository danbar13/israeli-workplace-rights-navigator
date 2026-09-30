import React from 'react';
import { 
  Scale, 
  HelpCircle, 
  Calculator, 
  Search, 
  LayoutGrid, 
  BookOpen, 
  ExternalLink,
  ShieldAlert,
  Moon,
  Sun,
  Palmtree,
  Briefcase,
  Users
} from 'lucide-react';
import { UserZone } from '../data/laborRightsData';

interface HeaderProps {
  activeTab: 'categories' | 'chat' | 'calculators' | 'search' | 'laws';
  setActiveTab: (tab: 'categories' | 'chat' | 'calculators' | 'search' | 'laws') => void;
  zone: UserZone;
  setZone: (zone: UserZone) => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  zone,
  setZone,
  onOpenDisclaimer,
  isDark,
  toggleDarkMode
}) => {
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-200 shadow-xs" dir="rtl">
      
      {/* Top Bar: Global UI Toggle for Employee vs HR & Payroll Zone */}
      <div className="bg-slate-100/90 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800 py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
              מצב משתמש:
            </span>
            <div className="inline-flex items-center bg-slate-200/80 dark:bg-slate-800 p-0.5 sm:p-1 rounded-xl border border-slate-300/70 dark:border-slate-700 shadow-2xs w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setZone('employee')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
                  zone === 'employee'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="מעבר לאזור עובדים: הסברים פשוטים, זכויות יומיומיות, ומיקוד באילת"
              >
                <Palmtree className="w-3.5 h-3.5 flex-shrink-0" />
                <span>אזור עובדים</span>
                <span className="text-[9px] px-1 py-0.2 rounded-full bg-slate-900/10 dark:bg-slate-900/30 font-bold hidden md:inline">
                  פשוט ונגיש
                </span>
              </button>

              <button
                type="button"
                onClick={() => setZone('hr')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
                  zone === 'hr'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="מעבר לאזור משאבי אנוש וחשבות שכר: עומק משפטי, סעיפי הסכם קיבוצי, וחישובי שכר"
              >
                <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="sm:hidden">HR ושכר</span>
                <span className="hidden sm:inline">אזור משאבי אנוש וחשבות שכר</span>
                <span className="text-[9px] px-1 py-0.2 rounded-full bg-white/20 font-bold hidden md:inline">
                  מאגר מלא ומעמיק
                </span>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs flex-shrink-0">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
              zone === 'employee'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60'
                : 'bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 border-brand-300 dark:border-brand-700/60'
            }`}>
              <span className="w-2 h-2 rounded-full animate-ping inline-block" style={{ backgroundColor: zone === 'employee' ? '#f59e0b' : '#0284c7' }} />
              {zone === 'employee' ? 'מהדורת עובדים — דגש אילת' : 'מהדורת HR וחשבות — הסכם 2023-2026'}
            </span>
          </div>

        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => setActiveTab('categories')}>
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-105 flex-shrink-0 ${
              zone === 'employee' 
                ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-sky-500 shadow-amber-500/20' 
                : 'bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-500 shadow-brand-500/20'
            }`}>
              {zone === 'employee' ? <Palmtree className="w-5 h-5 sm:w-6 sm:h-6" /> : <Scale className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-lg lg:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  פורטל זכויות עובדי המלונאות
                </h1>
                <span className="px-1.5 sm:px-2 py-0.2 sm:py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-[9px] sm:text-[10px] font-black rounded-full border border-amber-300 dark:border-amber-700/60 whitespace-nowrap">
                  מהדורת אילת
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Eilat & Israel Hospitality Labor Rights Portal
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'categories'
                  ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-brand-500" />
              <span>{zone === 'employee' ? 'מדריך הזכויות' : 'מאגר הזכויות וההסכמים'}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>יועץ תרחישים</span>
            </button>

            <button
              onClick={() => setActiveTab('calculators')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'calculators'
                  ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>מחשבוני שכר ומלונאות</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'search'
                  ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Search className="w-4 h-4 text-amber-500" />
              <span>חיפוש וסינון</span>
            </button>

            <button
              onClick={() => setActiveTab('laws')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'laws'
                  ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>הסכם ענפי וחוקים</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-2 cursor-pointer shadow-2xs font-bold text-xs"
              aria-label={isDark ? 'מעבר לתצוגת יום' : 'מעבר לתצוגת לילה'}
              title={isDark ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="text-amber-300 hidden md:inline">מצב יום</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="text-slate-700 hidden md:inline">מצב לילה</span>
                </>
              )}
            </button>

            {/* Legal Disclaimer Modal Button */}
            <button
              onClick={onOpenDisclaimer}
              className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60 px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              title="קרא את ההבהרה המשפטית"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">הבהרה משפטית</span>
            </button>

            {/* Kol Zchut Link */}
            <a
              href="https://www.kolzchut.org.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-700 px-3 py-2 rounded-xl transition border border-slate-200 dark:border-slate-700"
            >
              <span>כל זכות</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 border-t border-slate-100 dark:border-slate-800 gap-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'categories' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            מאגר זכויות
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'chat' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            יועץ שאלות
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'calculators' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            מחשבונים
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'search' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            חיפוש
          </button>
          <button
            onClick={() => setActiveTab('laws')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'laws' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            הסכמים וחוקים
          </button>
        </div>
      </div>
    </header>
  );
};
