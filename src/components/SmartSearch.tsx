import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ExternalLink, Sparkles, ChevronLeft } from 'lucide-react';
import { TOPICS_DATA, RightTopic } from '../data/laborRightsData';
import { TopicDetailModal } from './TopicDetailModal';

export const SmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<RightTopic | null>(null);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return TOPICS_DATA.filter((topic) => {
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchSubtitle = topic.subtitle.toLowerCase().includes(q);
      const matchLaw = topic.lawName.toLowerCase().includes(q);
      const matchSummary = topic.summary.toLowerCase().includes(q);
      const matchTags = topic.tags.some(t => t.toLowerCase().includes(q));
      const matchPoints = topic.keyPoints.some(p => p.toLowerCase().includes(q));
      const matchPitfalls = topic.pitfalls.some(pit => pit.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchLaw || matchSummary || matchTags || matchPoints || matchPitfalls;
    });
  }, [query]);

  const quickSearchTags = ['פיצויים', 'סעיף 14', 'שימוע', 'שעות נוספות', 'שבת', 'שכר מינימום', 'מחלת ילד', 'הבראה 2026', 'הריון', 'נסיעות'];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש חכם במאגר הזכויות (לדוגמה: שימוע, שעות שבת, סעיף 14, שכר מינימום, מחלת ילד)..."
            className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
          />
          <div className="absolute right-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              aria-label="נקה חיפוש"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick query chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 justify-center">
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold ml-1">חיפושים פופולריים:</span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[11px] px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 text-slate-600 dark:text-slate-300 rounded-lg transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {query && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span>תוצאות חיפוש עבור "{query}":</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{searchResults.length} נושאים נמצאו</span>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded-md font-bold inline-block border border-brand-200 dark:border-brand-800/60">
                      {topic.lawName}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{topic.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{topic.summary}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-bold">
                    <span>צפה בפרטי הזכות</span>
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback to Kol Zchut */
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-xl mx-auto shadow-xs">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  לא נמצאו תוצאות ישירות במאגר המקומי עבור "{query}"
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  כדי לשמור על דיוק ללא הזיות, תוכל לחפש את הנושא ישירות באתר "כל זכות" (Kol Zchut) - המאגר המקיף ביותר בישראל.
                </p>
              </div>

              <a
                href={`https://www.kolzchut.org.il/he/מיוחד:חיפוש?search=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>חפש "{query}" באתר "כל זכות"</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
};
