import React from 'react';
import { 
  X, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Scale, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { RightTopic } from '../data/laborRightsData';

interface TopicDetailModalProps {
  topic: RightTopic | null;
  onClose: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-right flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-l from-brand-700 via-brand-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute left-5 top-5 p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition"
            aria-label="סגור"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 bg-brand-600/80 border border-brand-400 text-brand-100 rounded-full text-xs font-semibold">
              {topic.lawName} ({topic.lawYear})
            </span>
            {topic.updates2026 && (
              <span className="px-3 py-1 bg-emerald-500/90 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                עדכון 2026
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold leading-tight">{topic.title}</h2>
          <p className="text-brand-100 text-sm mt-1">{topic.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          {/* Summary */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium">
            {topic.summary}
          </div>

          {/* 2026 Updates */}
          {topic.updates2026 && topic.updates2026.length > 0 && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>עדכונים והוראות שעה לשנת 2026</span>
              </div>
              <ul className="space-y-1.5 pr-2">
                {topic.updates2026.map((update, idx) => (
                  <li key={idx} className="text-emerald-800 dark:text-emerald-200 flex items-start gap-2 text-xs sm:text-sm">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Points */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>עקרונות וזכויות יסוד</span>
            </h3>
            <ul className="space-y-2 pr-2">
              {topic.keyPoints.map((point, idx) => (
                <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-brand-600 dark:text-brand-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specific Rules */}
          {topic.rules.map((rule, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>{rule.title}</span>
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 pr-2">
                {rule.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Pitfalls & Warnings */}
          {topic.pitfalls.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800/60 space-y-2.5">
              <div className="font-bold text-red-900 dark:text-red-300 flex items-center gap-2 text-base">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span>מלכודות ואזהרות מיוחדות מהשטח</span>
              </div>
              <ul className="space-y-1.5 pr-2">
                {topic.pitfalls.map((pitfall, idx) => (
                  <li key={idx} className="text-red-950 dark:text-red-200 text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {topic.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={topic.kolZchutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>עיון מורחב בנושא זה באתר "כל זכות"</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {topic.lawRefUrl && (
            <a
              href={topic.lawRefUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-2 flex items-center gap-1 font-medium"
            >
              <span>נוסח החוק המלא (נבו)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
