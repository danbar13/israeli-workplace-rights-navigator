import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ExternalLink, Palmtree, ChevronLeft, Filter } from 'lucide-react';
import { TOPICS_DATA, RightTopic, UserZone, RightScope } from '../data/laborRightsData';
import { TopicDetailModal } from './TopicDetailModal';

interface SmartSearchProps {
  zone: UserZone;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ zone }) => {
  const [query, setQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<RightScope | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<RightTopic | null>(null);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return TOPICS_DATA.filter((topic) => {
      // Scope filter
      if (scopeFilter !== 'all' && topic.scope !== scopeFilter) {
        return false;
      }

      if (!q) {
        return scopeFilter !== 'all'; // if user picked scope but no text query, show all in that scope
      }

      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchSubtitle = topic.subtitle.toLowerCase().includes(q);
      const matchLaw = topic.lawName.toLowerCase().includes(q);
      const matchSummary = topic.summary.toLowerCase().includes(q);
      const matchEmpSummary = topic.employeeSummary?.toLowerCase().includes(q);
      const matchHrSummary = topic.hrSummary?.toLowerCase().includes(q);
      const matchTags = topic.tags.some(t => t.toLowerCase().includes(q));
      const matchPoints = topic.keyPoints.some(p => p.toLowerCase().includes(q));
      const matchPitfalls = topic.pitfalls.some(pit => pit.toLowerCase().includes(q));
      const matchCitations = topic.hrCitations?.some(c => c.toLowerCase().includes(q));

      return (
        matchTitle || 
        matchSubtitle || 
        matchLaw || 
        matchSummary || 
        matchEmpSummary || 
        matchHrSummary || 
        matchTags || 
        matchPoints || 
        matchPitfalls || 
        matchCitations
      );
    });
  }, [query, scopeFilter]);

  const quickSearchTags = [
    'תוספת אילת',
    'פיצול משמרות',
    'זיכוי מס 10%',
    'שבת במלון',
    'מגורי עובדים',
    'אוכל במלון',
    'קרן השתלמות',
    '176 שעות',
    'סעיף 14',
    'שכר מינימום 2026',
    'שימוע',
    'הבראה 451'
  ];

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto space-y-3">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              zone === 'employee'
                ? "חיפוש פשוט (לדוגמה: תוספת אילת, פיצול משמרות, שבת במלון, מגורים, שכר מינימום)..."
                : "חיפוש סעיפים והסכמים (לדוגמה: נספח אילת, פיצול משמרות סעיף 20, סעיף 11 לפקודה, 8.33% פיצויים)..."
            }
            className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
          />
          <div className="absolute right-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
              aria-label="נקה חיפוש"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scope Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>סנן לפי היקף:</span>
          </span>

          <button
            onClick={() => setScopeFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              scopeFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            הכל
          </button>

          <button
            onClick={() => setScopeFilter('eilat')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
              scopeFilter === 'eilat'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            <Palmtree className="w-3 h-3 text-amber-600" />
            <span>אילת בלבד</span>
          </button>

          <button
            onClick={() => setScopeFilter('nationwide')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              scopeFilter === 'nationwide'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
            }`}
          >
            ענף המלונאות ארצי
          </button>

          <button
            onClick={() => setScopeFilter('general')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              scopeFilter === 'general'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            דיני עבודה כלליים
          </button>
        </div>

        {/* Quick query chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 justify-center">
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold ml-1">חיפושים נפוצים:</span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[11px] px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400 text-slate-600 dark:text-slate-300 rounded-lg transition cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {(query || scopeFilter !== 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span>
              תוצאות חיפוש {query ? `עבור "${query}"` : ''} {scopeFilter !== 'all' ? `[סינון: ${scopeFilter}]` : ''}:
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{searchResults.length} נושאים נמצאו</span>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                    topic.isEilatSpecial
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 hover:border-amber-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800/60">
                        {topic.lawName}
                      </span>
                      {topic.scope === 'eilat' && (
                        <span className="text-[10px] font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                          🌴 אילת
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{topic.title}</h4>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {zone === 'employee' ? topic.employeeSummary : topic.hrSummary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-bold">
                    <span>{zone === 'employee' ? 'קרא הסבר לעובד' : 'לצפייה בציטוטים ובסעיפים'}</span>
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
                  לא נמצאו תוצאות ישירות במאגר עבור "{query}"
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  כדי לשמור על דיוק ללא הזיות, תוכל לחפש את המונח ישירות באתר "כל זכות" – המאגר המקיף ביותר בישראל.
                </p>
              </div>

              <a
                href={`https://www.kolzchut.org.il/he/מיוחד:חיפוש?search=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
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
        zone={zone}
      />
    </div>
  );
};
