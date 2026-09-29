import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  DisclaimerBanner 
} from './components/DisclaimerBanner';
import { 
  DisclaimerModal 
} from './components/DisclaimerModal';
import { 
  CategoriesGrid 
} from './components/CategoriesGrid';
import { 
  InteractiveChat 
} from './components/InteractiveChat';
import { 
  Calculators 
} from './components/Calculators';
import { 
  SmartSearch 
} from './components/SmartSearch';
import { 
  LawsSummary 
} from './components/LawsSummary';
import { 
  Footer 
} from './components/Footer';
import { 
  AccessibilityMenu 
} from './components/AccessibilityMenu';
import { 
  Scale, 
  HelpCircle, 
  Calculator, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  Coins,
  Sun,
  Clock,
  Briefcase
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'categories' | 'chat' | 'calculators' | 'search' | 'laws'>('categories');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('labor_rights_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply Dark Mode class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('labor_rights_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('labor_rights_theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('labor_rights_disclaimer_ack');
    if (!hasAcknowledged) {
      setIsDisclaimerOpen(true);
    }
  }, []);

  const handleAcknowledgeDisclaimer = () => {
    localStorage.setItem('labor_rights_disclaimer_ack', 'true');
    setIsDisclaimerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-hebrew text-slate-900 dark:text-slate-100 transition-colors duration-200" dir="rtl">
      
      {/* Skip to Main Content Link for screen readers & keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        דלג לתוכן המרכזי
      </a>

      {/* Persistent Legal Disclaimer Banner */}
      <DisclaimerBanner onOpenModal={() => setIsDisclaimerOpen(true)} />

      {/* Main Header with Dark Mode Toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Modern Innovative Hero Banner (visible on Overview / Categories tab) */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-slate-900 via-brand-900 to-brand-800 dark:from-slate-950 dark:via-slate-900 dark:to-brand-950 text-white p-6 sm:p-10 shadow-xl border border-brand-700/30 dark:border-slate-800">
              <div className="relative z-10 max-w-3xl space-y-4">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 text-xs font-bold text-brand-100">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>ניווט זכויות עבודה מתקדם מעודכן לשנת 2026</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  כל מה שמגיע לך בעבודה — בדיוק, באמינות ובפשטות
                </h2>

                <p className="text-brand-100 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  מערכת מבוססת חוקי מגן וכללי בינה מלאכותית מאומתים: חישוב פיצויי פיטורים ובדיקת סעיף 14, ימי חופשה ומחלה, שעות שבת ונוספות, שכר מינימום עדכני (6,443.85 ₪) ודמי הבראה (451.50 ₪).
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="px-5 py-3 bg-white text-brand-950 hover:bg-brand-50 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2 transform active:scale-95"
                  >
                    <HelpCircle className="w-4 h-4 text-brand-600" />
                    <span>שאל את יועץ התרחישים</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('calculators')}
                    className="px-5 py-3 bg-brand-600/80 hover:bg-brand-600 text-white border border-brand-400/50 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-xs"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>פתח מחשבוני זכויות</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('search')}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-sm transition flex items-center gap-2 border border-white/10"
                  >
                    <Search className="w-4 h-4" />
                    <span>חיפוש מהיר</span>
                  </button>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute left-[-60px] bottom-[-60px] w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
              <div className="absolute right-[-30px] top-[-30px] w-80 h-80 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
            </div>

            {/* Quick Stats Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">שכר מינימום (מבוגר)</span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">₪6,443.85</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">דמי הבראה (פרטי 2026)</span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">₪451.50 ליום</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 bg-brand-50 dark:bg-brand-950/60 rounded-xl text-brand-600 dark:text-brand-400 flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">תקרת פטור פיצויים</span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">₪13,750 לשנה</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">שבוע עבודה חוקי</span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">42 שעות</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab View 1: Categories & Topics Catalog */}
        {activeTab === 'categories' && <CategoriesGrid />}

        {/* Tab View 2: Interactive Scenario Chat / Q&A */}
        {activeTab === 'chat' && <InteractiveChat />}

        {/* Tab View 3: Calculators */}
        {activeTab === 'calculators' && <Calculators />}

        {/* Tab View 4: Smart Search */}
        {activeTab === 'search' && <SmartSearch />}

        {/* Tab View 5: Laws & Enforcement Summary */}
        {activeTab === 'laws' && <LawsSummary />}
      </main>

      {/* Footer */}
      <Footer onOpenDisclaimer={() => setIsDisclaimerOpen(true)} />

      {/* Full Israeli Standard Accessibility Widget */}
      <AccessibilityMenu isDark={isDark} onToggleDarkMode={toggleDarkMode} />

      {/* First-Load & On-Demand Legal Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onAcknowledge={handleAcknowledgeDisclaimer}
      />
    </div>
  );
}

export default App;
