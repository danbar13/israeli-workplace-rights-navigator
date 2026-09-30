import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Sparkles, 
  BookOpen, 
  Palmtree, 
  Briefcase, 
  FileText,
  FileCheck
} from 'lucide-react';
import { RightTopic, UserZone } from '../data/laborRightsData';

interface TopicDetailModalProps {
  topic: RightTopic | null;
  onClose: () => void;
  zone: UserZone;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onClose, zone: initialZone }) => {
  const [modalZone, setModalZone] = useState<UserZone>(initialZone);

  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-right flex flex-col max-h-[92vh] transition-colors">
        
        {/* Header */}
        <div className={`p-4 sm:p-6 relative text-white transition-colors duration-300 ${
          modalZone === 'employee'
            ? 'bg-gradient-to-l from-amber-700 via-amber-800 to-slate-900'
            : 'bg-gradient-to-l from-brand-800 via-slate-900 to-brand-950'
        }`}>
          <button
            onClick={onClose}
            className="absolute left-3.5 top-3.5 sm:left-5 sm:top-5 p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="סגור"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            {topic.scope === 'eilat' && (
              <span className="px-3 py-1 bg-amber-500/90 text-slate-950 rounded-full text-xs font-black flex items-center gap-1 shadow-xs">
                <Palmtree className="w-3.5 h-3.5" />
                נספח אילת
              </span>
            )}
            {topic.scope === 'nationwide' && (
              <span className="px-3 py-1 bg-sky-500/90 text-white rounded-full text-xs font-bold shadow-xs">
                ענף המלונאות ארצי
              </span>
            )}
            {topic.scope === 'general' && (
              <span className="px-3 py-1 bg-slate-600/80 text-white rounded-full text-xs font-bold shadow-xs">
                דיני עבודה כלליים
              </span>
            )}
            <span className="px-3 py-1 bg-white/15 border border-white/20 text-white rounded-full text-xs font-semibold">
              {topic.lawName} ({topic.lawYear})
            </span>
            {topic.updates2026 && (
              <span className="px-3 py-1 bg-emerald-500/90 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                מעודכן 2026
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-tight">{topic.title}</h2>
          <p className="text-white/90 text-xs sm:text-sm mt-1">{topic.subtitle}</p>

          {/* In-Modal Mode Switcher Tabs */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2">
            <span className="text-xs text-white/70 font-bold ml-1">מצב תצוגה:</span>
            <div className="bg-black/25 p-1 rounded-xl flex items-center gap-1 border border-white/15">
              <button
                type="button"
                onClick={() => setModalZone('employee')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  modalZone === 'employee'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Palmtree className="w-3.5 h-3.5" />
                <span>הסבר פשוט לעובד</span>
              </button>

              <button
                type="button"
                onClick={() => setModalZone('hr')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  modalZone === 'hr'
                    ? 'bg-brand-500 text-white font-black shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>משאבי אנוש וחשבות (ציטוטים וסעיפים)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          
          {/* View 1: Employee Zone Content */}
          {modalZone === 'employee' ? (
            <>
              {/* Simplified Employee Summary */}
              <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200/80 dark:border-amber-800/50 text-slate-800 dark:text-amber-100 font-medium space-y-2">
                <div className="text-xs font-black text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Palmtree className="w-4 h-4" />
                  <span>מה המשמעות של הזכות הזאת עבורך בתכל'ס:</span>
                </div>
                <p className="text-sm leading-relaxed">{topic.employeeSummary}</p>
              </div>

              {/* Practical Everyday Bullets */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>נקודות חשובות שחובה להכיר:</span>
                </h3>
                <ul className="space-y-2 pr-2">
                  {topic.employeeKeyPoints.map((point, idx) => (
                    <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            /* View 2: HR & Payroll Zone Content */
            <>
              {/* Deep-Dive HR Summary */}
              <div className="p-4 bg-brand-50/70 dark:bg-slate-800/80 rounded-2xl border border-brand-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium space-y-2">
                <div className="text-xs font-black text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" />
                  <span>ניתוח משפטי, ענפי וחשבותי:</span>
                </div>
                <p className="text-sm leading-relaxed">{topic.hrSummary}</p>
              </div>

              {/* Exact Legal & Collective Agreement Citations */}
              {topic.hrCitations && topic.hrCitations.length > 0 && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>אסמכתאות וסעיפי הסכם קיבוצי:</span>
                  </h4>
                  <ul className="space-y-1 pr-2">
                    {topic.hrCitations.map((cite, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 font-mono">
                        <span className="text-brand-500 font-bold font-sans">§</span>
                        <span>{cite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deep Details & Calculation Rules for HR */}
              {topic.hrLegalDetails && topic.hrLegalDetails.length > 0 && (
                <div className="space-y-3">
                  {topic.hrLegalDetails.map((sec, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span>{sec.title}</span>
                      </h4>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 pr-2">
                        {sec.details.map((item, dIdx) => (
                          <li key={dIdx} className="text-xs sm:text-sm flex items-start gap-2">
                            <span className="text-brand-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Shared 2026 Updates */}
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

          {/* Specific Rules */}
          {topic.rules.length > 0 && (
            <div className="space-y-3">
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
            </div>
          )}

          {/* Pitfalls & Warnings */}
          {topic.pitfalls.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800/60 space-y-2.5">
              <div className="font-bold text-red-900 dark:text-red-300 flex items-center gap-2 text-base">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span>מלכודות ואזהרות מיוחדות מהשטח והפסיקה</span>
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
              <span key={idx} className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100/80 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <a
              href={topic.kolZchutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <span>קרא בהרחבה באתר "כל זכות"</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
};
