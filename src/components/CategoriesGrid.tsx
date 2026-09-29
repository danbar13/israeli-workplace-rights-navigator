import React, { useState } from 'react';
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
  ChevronLeft,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { CATEGORIES, TOPICS_DATA, RightTopic } from '../data/laborRightsData';
import { TopicDetailModal } from './TopicDetailModal';

export const CategoriesGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<RightTopic | null>(null);

  // Icon mapping with modern gradient backgrounds
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-brand-600 dark:text-brand-400" };
    switch (iconName) {
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Palmtree': return <Palmtree {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'PiggyBank': return <PiggyBank {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Baby': return <Baby {...props} />;
      case 'Car': return <Car {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Scale': return <Scale {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const filteredTopics = selectedCategory 
    ? TOPICS_DATA.filter(t => t.categoryId === selectedCategory)
    : TOPICS_DATA;

  return (
    <div className="space-y-8" dir="rtl">
      {/* Category selector pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>סינון לפי קטגוריית זכות:</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({filteredTopics.length} נושאים מוצגים)</span>
          </h3>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-bold"
            >
              הצג את כל הקטגוריות
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
              selectedCategory === null
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="text-xs font-bold">כל הנושאים</span>
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
                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 relative group ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
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
                      ? 'bg-white text-brand-700' 
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
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  {topic.lawName}
                </span>
                {topic.updates2026 && (
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    2026
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition leading-snug">
                  {topic.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {topic.subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {topic.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-brand-600 dark:text-brand-400 font-bold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                <span>צפה בפרטים המלאים</span>
                <ChevronLeft className="w-4 h-4" />
              </span>

              <a
                href={topic.kolZchutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="פתח ישירות באתר כל זכות"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
};
