import React from 'react';
import { Scale, ExternalLink, ShieldCheck, Heart, Accessibility } from 'lucide-react';
import { OFFICIAL_EXTERNAL_LINKS } from '../data/laborRightsData';

interface FooterProps {
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDisclaimer }) => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8 transition-colors" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>פורטל זכויות עובדי המלונאות — מהדורת אילת</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              פורטל ייעודי ואינטראקטיבי להנגשת דיני העבודה, ההסכם הקיבוצי בענף המלונאות, נספח אילת וחישובי שכר וסוציאליות. מבוסס על הסכם המלונאות 2023-2026, פסיקות בתי הדין לעבודה וצווי ההרחבה העדכניים ל-2026.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDisclaimer}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>הבהרה משפטית מלאה</span>
              </button>
            </div>
          </div>

          {/* Col 2: Useful links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">מאגרים ממשלתיים ומשפטיים</h4>
            <ul className="space-y-2 text-xs">
              {OFFICIAL_EXTERNAL_LINKS.slice(0, 4).map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-300 transition flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Disclaimer & Accessibility Notice */}
          <div className="space-y-3 bg-slate-800/60 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-700/60">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>תזכורת משפטית ונגישות</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              המידע והחישובים באתר מיועדים למטרות מידע והתארגנות אישית בלבד, ואינם מהווים ייעוץ משפטי או תחליף לפנייה לעורך דין מוסמך המתמחה בדיני עבודה.
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Accessibility className="w-3.5 h-3.5 text-brand-400" />
              <span>האתר מונגש ברמת AA על פי תקן ת"י 5568.</span>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} זכויות העובד בישראל | כל הזכויות שמורות
          </div>
          <div className="flex items-center gap-1">
            <span>מוגש כשירות לציבור העובדים בישראל</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
