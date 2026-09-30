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
  Briefcase,
  Palmtree,
  Split,
  Moon,
  PiggyBank,
  CheckCircle2
} from 'lucide-react';
import { UserZone } from './data/laborRightsData';

export function App() {
  const [activeTab, setActiveTab] = useState<'categories' | 'chat' | 'calculators' | 'search' | 'laws'>('categories');
  const [zone, setZone] = useState<UserZone>(() => {
    try {
      const savedZone = localStorage.getItem('labor_portal_zone');
      if (savedZone === 'employee' || savedZone === 'hr') {
        return savedZone;
      }
      return 'employee'; // default is employee mode
    } catch {
      return 'employee';
    }
  });

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

  // Persist Zone changes
  const handleSetZone = (newZone: UserZone) => {
    setZone(newZone);
    try {
      localStorage.setItem('labor_portal_zone', newZone);
    } catch {}
  };

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

      {/* Main Header with Global UI Mode Toggle & Dark Mode Toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        zone={zone}
        setZone={handleSetZone}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Modern Hospitality Hero Banner (visible on Overview / Categories tab) */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            
            {/* Dynamic Hero Banner by Active Zone */}
            <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-colors duration-300 ${
              zone === 'employee'
                ? 'bg-gradient-to-l from-amber-700 via-amber-600 to-sky-700 border-amber-500/30 dark:border-amber-900/60'
                : 'bg-gradient-to-l from-slate-950 via-brand-900 to-brand-800 border-brand-700/40 dark:border-slate-800'
            }`}>
              <div className="relative z-10 max-w-3xl space-y-4">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                  <Palmtree className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>
                    {zone === 'employee' 
                      ? 'פורטל זכויות עובדי המלונאות — מהדורת אילת 2026' 
                      : 'מערכת משאבי אנוש וחשבות שכר — הסכם קיבוצי ענפי ונספח אילת'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  {zone === 'employee' ? (
                    <>כל הזכויות של עובדי המלונות ואילת — פשוט, ישיר ובלי התחמקויות</>
                  ) : (
                    <>פורטל מקיף למשאבי אנוש, חשבות שכר ודיני עבודה במלונאות</>
                  )}
                </h2>

                <p className="text-white/90 dark:text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                  {zone === 'employee' ? (
                    <>
                      בדיקה קלה ומהירה: תוספת אילת (383.09 ₪ לחודש ללא תלות בתעודת זהות!), זיכוי מס 10% לתושבי העיר, 8 שעות שכר על 7 שעות בפיצול משמרות, שבתות וחגים (עד 200%), ותקרות ניכוי חוקיות על דיור ואוכל.
                    </>
                  ) : (
                    <>
                      גישה מלאה ומעמיקה לכלל דיני העבודה, הסכם קיבוצי כללי בענף המלונאות 2023-2026, נספח אילת, חוזרי שכר מעודכנים, מחשבוני שעות מפוצלות, גמולי שבת לפי הלכת כהן, ותקרות ניכוי דיור וכלכלה.
                    </>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-brand-600" />
                    <span>שאל את יועץ התרחישים</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('calculators')}
                    className={`px-5 py-3 text-white border rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-xs cursor-pointer ${
                      zone === 'employee'
                        ? 'bg-amber-800/80 hover:bg-amber-800 border-amber-300/40'
                        : 'bg-brand-600/80 hover:bg-brand-600 border-brand-400/50'
                    }`}
                  >
                    <Calculator className="w-4 h-4" />
                    <span>מחשבוני פיצול משמרות ושכר</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('search')}
                    className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-semibold text-sm transition flex items-center gap-2 border border-white/20 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>חיפוש מהיר</span>
                  </button>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute left-[-60px] bottom-[-60px] w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
              <div className="absolute right-[-30px] top-[-30px] w-80 h-80 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />
            </div>

            {/* Quick Stats Badges Bar - Zone Aware */}
            {zone === 'employee' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Palmtree className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">תוספת אילת (ענפי)</span>
                    <span className="text-base font-black text-amber-950 dark:text-amber-300 font-mono">₪383.09 לחודש</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-sky-50 dark:bg-sky-950/60 rounded-xl text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">זיכוי מס אילת (סעיף 11)</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">עד 10% (₪2,235/חודש)</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Split className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">פיצול משמרת במלון</span>
                    <span className="text-base font-black text-indigo-950 dark:text-indigo-300 font-mono">7 שעות = 8 שכר</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-purple-50 dark:bg-purple-950/60 rounded-xl text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">שבת וחג במלונאות</span>
                    <span className="text-base font-black text-purple-950 dark:text-purple-300 font-mono">150% עד 200%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">שכר מינימום מבוגר (2026)</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">₪6,443.85 (₪35.40/שעה)</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-brand-50 dark:bg-brand-950/60 rounded-xl text-brand-600 dark:text-brand-400 flex-shrink-0">
                    <Palmtree className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">תוספת אילת (פעימת 08/25)</span>
                    <span className="text-base font-black text-brand-950 dark:text-brand-300 font-mono">₪383.09 (36 חודשי ותק)</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">בסיס משרה ענפי מקוצר</span>
                    <span className="text-base font-black text-indigo-950 dark:text-indigo-300 font-mono">176 שעות חודשיות</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">הפרשות סוציאליות מלונות</span>
                    <span className="text-base font-black text-amber-950 dark:text-amber-300 font-mono">6.5% + 8.33% + 7.5%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab View 1: Categories & Topics Catalog */}
        {activeTab === 'categories' && <CategoriesGrid zone={zone} />}

        {/* Tab View 2: Interactive Scenario Chat / Q&A */}
        {activeTab === 'chat' && <InteractiveChat zone={zone} onNavigateTab={(tab) => setActiveTab(tab)} />}

        {/* Tab View 3: Calculators */}
        {activeTab === 'calculators' && <Calculators zone={zone} />}

        {/* Tab View 4: Smart Search */}
        {activeTab === 'search' && <SmartSearch zone={zone} />}

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
