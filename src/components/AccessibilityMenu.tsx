import React, { useState, useEffect } from 'react';
import { 
  Accessibility, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sun, 
  Eye, 
  Type, 
  Link2, 
  Heading, 
  MousePointer, 
  FileText, 
  Check, 
  Sparkles,
  Contrast,
  Volume2,
  ShieldCheck
} from 'lucide-react';

interface AccessibilitySettings {
  fontSizeLevel: number; // 0 = 100%, 1 = 110%, 2 = 120%, 3 = 130%
  grayscale: boolean;
  highContrast: boolean;
  invertColors: boolean;
  readableFont: boolean;
  highlightLinks: boolean;
  highlightHeaders: boolean;
  stopAnimations: boolean;
  bigCursor: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSizeLevel: 0,
  grayscale: false,
  highContrast: false,
  invertColors: false,
  readableFont: false,
  highlightLinks: false,
  highlightHeaders: false,
  stopAnimations: false,
  bigCursor: false
};

export const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('labor_rights_accessibility_settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    const sizes = ['100%', '110%', '120%', '130%'];
    root.style.fontSize = sizes[settings.fontSizeLevel] || '100%';

    // Toggle classes
    root.classList.toggle('acc-grayscale', settings.grayscale);
    root.classList.toggle('acc-high-contrast', settings.highContrast);
    root.classList.toggle('acc-invert', settings.invertColors);
    root.classList.toggle('acc-readable-font', settings.readableFont);
    root.classList.toggle('acc-highlight-links', settings.highlightLinks);
    root.classList.toggle('acc-highlight-headers', settings.highlightHeaders);
    root.classList.toggle('acc-stop-animations', settings.stopAnimations);
    root.classList.toggle('acc-big-cursor', settings.bigCursor);

    try {
      localStorage.setItem('labor_rights_accessibility_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  const toggleSetting = (key: keyof Omit<AccessibilitySettings, 'fontSizeLevel'>) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const changeFontSize = (delta: number) => {
    setSettings(prev => ({
      ...prev,
      fontSizeLevel: Math.min(3, Math.max(0, prev.fontSizeLevel + delta))
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const hasActiveSettings = 
    settings.fontSizeLevel > 0 ||
    settings.grayscale ||
    settings.highContrast ||
    settings.invertColors ||
    settings.readableFont ||
    settings.highlightLinks ||
    settings.highlightHeaders ||
    settings.stopAnimations ||
    settings.bigCursor;

  return (
    <>
      {/* Floating Accessibility Trigger Button (Sticky at screen edge) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95 group border ${
            hasActiveSettings 
              ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/30' 
              : 'bg-brand-600 hover:bg-brand-700 text-white border-brand-500 hover:shadow-brand-500/25'
          }`}
          aria-label="פתח תפריט נגישות (תקן ישראלי 5568 ברמה AA)"
          title="תפריט נגישות (תקן ת''י 5568)"
        >
          <Accessibility className="w-6 h-6 transition-transform group-hover:rotate-12" />
          <span className="hidden sm:inline-block font-bold text-xs">
            {hasActiveSettings ? 'נגישות פעילה' : 'התאמות נגישות'}
          </span>
          {hasActiveSettings && (
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-pulse" />
          )}
        </button>
      </div>

      {/* Accessibility Drawer / Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" 
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="acc-title"
        >
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-right flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-gradient-to-l from-brand-700 to-brand-800 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Accessibility className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 id="acc-title" className="text-lg font-bold">
                    תפריט נגישות
                  </h2>
                  <p className="text-[11px] text-brand-100">
                    תקן ישראלי 5568 ברמה AA / תקנות שוויון זכויות לאנשים עם מוגבלות
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition"
                aria-label="סגור תפריט נגישות"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-sm">
              
              {/* Text Size Control */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>גודל גופן (טקסט)</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {['100%', '110%', '120%', '130%'][settings.fontSizeLevel]}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => changeFontSize(1)}
                    disabled={settings.fontSizeLevel >= 3}
                    className="p-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-40"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>הגדל (+)</span>
                  </button>
                  <button
                    onClick={() => changeFontSize(-1)}
                    disabled={settings.fontSizeLevel <= 0}
                    className="p-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-40"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>הקטן (-)</span>
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, fontSizeLevel: 0 }))}
                    className="p-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>איפוס</span>
                  </button>
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => toggleSetting('highContrast')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.highContrast
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Contrast className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">ניגודיות גבוהה</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">הבלטת רכיבים וטקסט</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('grayscale')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.grayscale
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Eye className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">גווני אפור</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">הסרת צבעוניות</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('readableFont')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.readableFont
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Type className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">גופן קריא</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">אותיות דפוס פשוטות</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('highlightLinks')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.highlightLinks
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Link2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">הדגשת קישורים</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">קו תחתון ומסגרת</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('highlightHeaders')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.highlightHeaders
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heading className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">הדגשת כותרות</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">סימון כותרות באתר</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('bigCursor')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 ${
                    settings.bigCursor
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <MousePointer className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">סמן עכבר מוגדל</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">סמן שחור ברור</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('stopAnimations')}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-24 col-span-2 ${
                    settings.stopAnimations
                      ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-500 text-brand-800 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <div>
                    <span className="font-bold text-xs block">עצירת תנועה והבהובים</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">השבתת כל האנימציות והמעברים להקלה על תפיסה חזותית</span>
                  </div>
                </button>
              </div>

              {/* Keyboard Navigation Helper */}
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold block text-slate-900 dark:text-slate-100">ניווט מהיר במקלדת:</span>
                <p>• מקש <strong>Tab</strong> למעבר קדימה | מקש <strong>Shift + Tab</strong> למעבר אחורה.</p>
                <p>• מקש <strong>Enter</strong> להפעלת כפתורים וקישורים | מקש <strong>Esc</strong> לסגירת חלונות.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsStatementOpen(true)}
                className="text-xs text-brand-700 dark:text-brand-400 hover:underline font-semibold flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                <span>הצהרת נגישות כחוק</span>
              </button>

              <button
                onClick={resetSettings}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>איפוס הכל</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Israeli Accessibility Statement Modal */}
      {isStatementOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn" 
          dir="rtl"
        >
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-right flex flex-col max-h-[90vh]">
            
            <div className="bg-brand-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold text-lg">הצהרת נגישות (תקן ישראלי 5568 ברמה AA)</h3>
              </div>
              <button
                onClick={() => setIsStatementOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                אתר <strong>"זכויות העובד בישראל" (Israeli Workplace Rights Navigator)</strong> מחויב להענקת חוויית שימוש נגישה, שוויונית ומכבדת לכלל אזרחי ישראל, לרבות אנשים עם מוגבלויות, בהתאם ל<strong>חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998</strong> ולתקנות שהותקנו מכוחו.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">רמת הנגישות באתר:</h4>
                <ul className="list-disc list-inside space-y-1 pr-2">
                  <li>האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013.</li>
                  <li>ההתאמות בוצעו בהתאם לתקן הישראלי ת"י 5568 ברמת נגישות AA, המבוסס על הנחיות W3C הבינלאומיות (WCAG 2.1).</li>
                  <li>האתר מותאם לתצוגה ושימוש במגוון דפדפנים מודרניים ובמכשירים ניידים.</li>
                  <li>קיימת תמיכה מלאה בכיווניות מימין לשמאל (RTL) ותמיכה בתוכנות קוראות מסך באמצעות תגיות ARIA ומבנה סמנטי תקין.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">אמצעי הנגישות המוטמעים באתר:</h4>
                <ul className="list-disc list-inside space-y-1 pr-2">
                  <li>תפריט נגישות ייעודי המאפשר הגדלת טקסט, גופן קריא, ניגודיות גבוהה, גווני אפור ועצירת הבהובים.</li>
                  <li>תמיכה במצב לילה / דארק מוד (Dark Mode) המקל על צפייה ממושכת ורגישות לאור.</li>
                  <li>ניווט מלא במקלדת (Keyboard Navigation) והדגשת פוקוס ברורה.</li>
                  <li>טקסטים חלופיים לתמונות וכפתורים (Alt / Aria labels).</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-1.5 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white">פניות בנושא נגישות ורכז נגישות:</h4>
                <p>אם נתקלתם בקושי בגלישה באתר או שיש לכם הצעה לשיפור הנגישות, נשמח לעמוד לרשותכם:</p>
                <p>• <strong>רכז נגישות:</strong> דני ברקאי</p>
                <p>• <strong>דוא"ל לפניות נגישות:</strong> accessibility@danbar.ai</p>
                <p>• <strong>מועד עדכון ההצהרה:</strong> אפריל 2026</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-800 text-left">
              <button
                onClick={() => setIsStatementOpen(false)}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
