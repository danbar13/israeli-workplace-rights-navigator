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
  Filter,
  X
} from 'lucide-react';
import { CATEGORIES, TOPICS_DATA, RightTopic, UserZone, RightScope } from '../data/laborRightsData';
import { TopicDetailModal } from './TopicDetailModal';

interface CategoriesGridProps {
  zone: UserZone;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ zone }) => {
  // In Employee Zone, default selected category is 'eilat-special', in HR Zone it shows all by default
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

  // Smooth scroll helper to topics section
  const scrollToResults = () => {
    setTimeout(() => {
      const section = document.getElementById('topics-results-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Category click toggle handler
  const handleCategoryClick = (catId: string) => {
    setSelectedCategory((prev) => (prev === catId ? null : catId));
    // Reset selected scope to 'all' so no scope clash causes empty results
    setSelectedScope('all');
    scrollToResults();
  };

  // Scope click handler
  const handleScopeClick = (scope: RightScope | 'all') => {
    if (selectedScope === scope) {
      setSelectedScope('all');
    } else {
      setSelectedScope(scope);
      // If currently selected category has 0 topics in the new scope, reset category to show all matching the scope
      if (selectedCategory && scope !== 'all') {
        const hasMatchingTopic = TOPICS_DATA.some(
          (t) => t.categoryId === selectedCategory && t.scope === scope
        );
        if (!hasMatchingTopic) {
          setSelectedCategory(null);
        }
      }
    }
    scrollToResults();
  };

  // Reset all filters handler
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedScope('all');
    scrollToResults();
  };

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

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

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
                onClick={() => handleCategoryClick('eilat-special')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'eilat-special'
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-white/50'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                🌴 {selectedCategory === 'eilat-special' ? '✓ מציג זכויות אילת' : 'הצג זכויות אילת'}
              </button>

              <button
                onClick={() => handleCategoryClick('split-shifts')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'split-shifts'
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-white/50'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                ⏱️ {selectedCategory === 'split-shifts' ? '✓ מציג פיצול משמרות' : 'פיצול משמרות (7=8 שעות)'}
              </button>

              <button
                onClick={() => handleCategoryClick('weekend-holidays')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedCategory === 'weekend-holidays'
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-white/50'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                🌙 {selectedCategory === 'weekend-holidays' ? '✓ מציג שבתות וחגים' : 'שבתות וחגים במלון'}
              </button>

              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-black/30 hover:bg-black/40 text-white transition cursor-pointer"
              >
                כל הנושאים והחוקים ({TOPICS_DATA.length})
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
              onClick={() => handleScopeClick('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              הכל ({TOPICS_DATA.length})
            </button>

            <button
              onClick={() => handleScopeClick('eilat')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedScope === 'eilat'
                  ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5" />
              <span>אילת והסכמים מקומיים</span>
            </button>

            <button
              onClick={() => handleScopeClick('nationwide')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'nationwide'
                  ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-400'
                  : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 hover:bg-sky-100'
              }`}
            >
              <span>ענף המלונאות ארצי</span>
            </button>

            <button
              onClick={() => handleScopeClick('general')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedScope === 'general'
                  ? 'bg-brand-600 text-white shadow-xs ring-2 ring-brand-400'
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
              ({filteredTopics.length} נושאים מוצגים כעת)
            </span>
          </h3>
          {(selectedCategory || selectedScope !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-bold cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>איפוס סינונים</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {/* All categories button */}
          <button
            onClick={handleResetFilters}
            className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
              selectedCategory === null
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20 ring-2 ring-brand-400/50'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className={`p-2 rounded-xl transition ${
              selectedCategory === null 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">כל הקטגוריות</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              selectedCategory === null 
                ? 'bg-brand-700 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              {TOPICS_DATA.length} נושאים
            </span>
          </button>

          {/* Individual Category buttons */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const topicCount = TOPICS_DATA.filter((t) => t.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 relative group cursor-pointer ${
                  isSelected
                    ? cat.id === 'eilat-special'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/30 ring-2 ring-amber-400 font-black'
                      : 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/30 ring-2 ring-brand-400/50 font-bold'
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
                
                <div className="flex items-center gap-1 flex-wrap justify-center">
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
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-black/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {topicCount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics Results Section with Anchor for Smooth Scroll */}
      <div id="topics-results-section" className="scroll-mt-6 space-y-4">
        {/* Active Filter Announcement & Quick Clear Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800/60 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">
              מציג {filteredTopics.length} נושאים
            </span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-brand-100 dark:bg-brand-950/80 text-brand-900 dark:text-brand-200 px-2.5 py-1 rounded-lg font-bold border border-brand-200 dark:border-brand-800">
                <span>קטגוריה: {activeCategoryObj?.title || selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="hover:bg-brand-200 dark:hover:bg-brand-800 p-0.5 rounded cursor-pointer transition"
                  title="בטל סינון קטגוריה"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedScope !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded-lg font-bold border border-amber-200 dark:border-amber-800">
                <span>תחום: {selectedScope === 'eilat' ? 'אילת והסכמים מקומיים' : selectedScope === 'nationwide' ? 'ענף המלונאות ארצי' : 'דיני עבודה כלליים'}</span>
                <button
                  onClick={() => setSelectedScope('all')}
                  className="hover:bg-amber-200 dark:hover:bg-amber-800 p-0.5 rounded cursor-pointer transition"
                  title="בטל סינון תחום"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>

          {(selectedCategory || selectedScope !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 hover:underline cursor-pointer"
            >
              הצג את כל {TOPICS_DATA.length} הנושאים
            </button>
          )}
        </div>

        {/* Empty state if 0 results */}
        {filteredTopics.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Filter className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                לא נמצאו נושאים התואמים את שילוב הסינון שנבחר
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                נסה לשנות את תחום התחולה או לאפס את הסינון כדי לראות את כל הזכויות וההסכמים במאגר.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md transition cursor-pointer"
            >
              הצג את כל {TOPICS_DATA.length} הנושאים
            </button>
          </div>
        ) : (
          /* Topics Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
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
        )}
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
