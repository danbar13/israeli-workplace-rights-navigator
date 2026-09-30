import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Palmtree, 
  Stethoscope, 
  Clock, 
  PiggyBank, 
  FileText, 
  Sun, 
  Baby, 
  Car, 
  ShieldCheck, 
  Scale,
  GraduationCap,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Coffee,
  Split,
  Moon,
  Home,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { CATEGORIES, TOPICS_DATA, RightTopic, UserZone, RightScope } from '../data/laborRightsData';
import { TopicDetailModal } from './TopicDetailModal';

interface CategoriesGridProps {
  zone: UserZone;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ zone }) => {
  // In Employee Zone, default selected category can be 'eilat-special' or null with Eilat topics top
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return zone === 'employee' ? 'eilat-special' : null;
  });
  const [selectedScope, setSelectedScope] = useState<RightScope | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<RightTopic | null>(null);

  // Sync category if zone changes
  useEffect(() => {
    if (zone === 'employee' && selectedCategory === null) {
      setSelectedCategory('eilat-special');
    }
  }, [zone]);

  // Icon mapping
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-brand-600 dark:text-brand-400" };
    switch (iconName) {
      case 'Palmtree': return <Palmtree className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Split': return <Split className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'PiggyBank': return <PiggyBank {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-700 dark:text-amber-300" />;
      case 'FileText': return <FileText {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Baby': return <Baby {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Scale': return <Scale {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  // Filter topics
  const filteredTopics = TOPICS_DATA.filter((topic) => {
    if (selectedCategory && topic.categoryId !== selectedCategory) {
      return false;
    }
    if (selectedScope !== 'all' && topic.scope !== selectedScope) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8" dir="rtl">
      
      {/* Employee Zone Prominent Spotlight: Eilat Hotel Rights */}
      {zone === 'employee' && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-amber-600 via-amber-500 to-sky-600 text-white p-6 sm:p-8 shadow-lg border border-amber-400/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-xs font-black text-amber-100">
              <Palmtree className="w-4 h-4 text-amber-300" />
              <span>עובד או עובדת במלון באילת? הנה מה שהכי חשוב שתדע:</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black">
              זכויות עובדי אילת וענף המלונאות — ישירות וברורות
            </h3>

            <p className="text-amber-50 text-xs sm:text-sm leading-relaxed max-w-2xl">
              מגיע לך <strong className="text-white underline">383.09 ₪ בחודש</strong> תוספת אילת (ללא תלות בתעודת זהות!), זיכוי מס של עד <strong className="text-white underline">10%</strong> לתושבי העיר, שכר של 8 שעות על 7 שעות ביום מפוצל, ותעריף של 150%-200% בשבתות ובחגים!
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => {
                  setSelectedCategory('eilat-special');
                  setSelectedScope('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'eilat-special'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                🌴 הצג זכויות אילת בלבד
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('split-shifts');
                  setSelectedScope('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'split-shifts'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                ⏱️ פיצול משמרות (7=8 שעות)
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('weekend-holidays');
                  setSelectedScope('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'weekend-holidays'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                🌙 שבתות וחגים במלון
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedScope('all');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-black/30 hover:bg-black/40 text-white transition cursor-pointer"
              >
                כל הנושאים והחוקים
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scope Filter Pills (Eilat vs Nationwide vs General) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              סינון לפי היקף ותחום תחולה:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedScope('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              הכל ({TOPICS_DATA.length})
            </button>

            <button
              onClick={() => setSelectedScope('eilat')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedScope === 'eilat'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5" />
              <span>אילת והסכמים מקומיים</span>
            </button>

            <button
              onClick={() => setSelectedScope('nationwide')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'nationwide'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 hover:bg-sky-100'
              }`}
            >
              <span>ענף המלונאות ארצי</span>
            </button>

            <button
              onClick={() => setSelectedScope('general')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'general'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>דיני עבודה כלליים</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category selector pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>קטגוריות זכויות ({CATEGORIES.length}):</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              ({filteredTopics.length} נושאים מתאימים)
            </span>
          </h3>
          {(selectedCategory || selectedScope !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedScope('all');
              }}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-bold cursor-pointer"
            >
              איפוס סינונים
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
              selectedCategory === null
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="text-xs font-bold">כל הקטגוריות</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              selectedCategory === null 
                ? 'bg-brand-700 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              {TOPICS_DATA.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 relative group cursor-pointer ${
                  isSelected
                    ? cat.id === 'eilat-special'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className={`p-2 rounded-xl transition ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:scale-110'
                }`}>
                  {renderCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">{cat.title}</span>
                {cat.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-white text-slate-900' 
                      : cat.id === 'eilat-special'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className={`rounded-3xl border p-6 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
              topic.isEilatSpecial
                ? 'bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-slate-900 border-amber-300 dark:border-amber-800/70 hover:border-amber-500'
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500/50'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {topic.scope === 'eilat' && (
                    <span className="text-[10px] font-black text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/60 flex items-center gap-1">
                      <Palmtree className="w-3 h-3 text-amber-600" />
                      אילת
                    </span>
                  )}
                  {topic.scope === 'nationwide' && (
                    <span className="text-[10px] font-bold text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/60 px-2 py-0.5 rounded-md border border-sky-300 dark:border-sky-700/60">
                      מלונאות ארצי
                    </span>
                  )}
                  {topic.scope === 'general' && (
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                      חוק כללי
                    </span>
                  )}
                </div>

                {topic.updates2026 && (
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    2026
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition leading-snug">
                  {topic.title}
                </h4>
                
                {/* Zone adapted summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {zone === 'employee' ? topic.employeeSummary : topic.hrSummary}
                </p>
              </div>

              {/* Preview Bullets based on Zone */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">
                  {zone === 'employee' ? 'דגשים מעשיים:' : 'אסמכתאות וכללים:'}
                </span>
                {(zone === 'employee' ? topic.employeeKeyPoints : (topic.hrCitations || topic.keyPoints)).slice(0, 2).map((item, idx) => (
                  <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 line-clamp-1">
                    <span className="text-brand-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 transition">
              <span>{zone === 'employee' ? 'קרא הסבר מלא לעובד' : 'לעיון בסעיפי החוק והנוסחאות'}</span>
              <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        zone={zone}
      />
    </div>
  );
};
