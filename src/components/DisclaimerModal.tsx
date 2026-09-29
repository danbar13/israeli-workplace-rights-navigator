import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  onAcknowledge
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden text-right flex flex-col max-h-[90vh] transition-colors"
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-modal-title"
      >
        {/* Header */}
        <div className="bg-amber-500 text-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 flex-shrink-0" />
            <h2 id="disclaimer-modal-title" className="text-xl font-bold">הבהרה משפטית חשובה ותנאי שימוש</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-950/80 hover:text-slate-950 p-1.5 rounded-xl hover:bg-amber-600/30 transition"
            aria-label="סגור"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-r-4 border-amber-500 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="font-bold text-amber-950 dark:text-amber-200 text-base">
              כלי זה הינו כלי מידע חינמי ואינו מהווה ייעוץ משפטי או חוות דעת משפטית!
            </p>
          </div>

          <p>
            כלי זה הוא כלי מידע אינטראקטיבי הפועל באמצעות מודל בינה מלאכותית ומאגר מידע המבוסס על דיני העבודה בישראל. הוא נועד להסביר את הוראות הדין וההליכים ולסייע לכם בארגון המידע והבנת זכויותיכם הבסיסיות.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">שים לב לכללים הבאים:</h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300 pr-2">
              <li>
                <strong>אינו ייעוץ משפטי:</strong> כל תוצרי הכלי מופקים באופן אוטומטי, ללא מעורבות, בדיקה או אישור של עורך דין. הפלט הינו הסבר כללי ותבנית בלבד.
              </li>
              <li>
                <strong>אי בדיקת נסיבות פרטניות:</strong> הכלי אינו קורא את מלוא המסמכים בתיק האישי שלכם, אינו בודק את הפסיקה העדכנית ביותר של בתי הדין לעבודה ואינו בוחן את הנסיבות הספציפיות של המקרה שלכם.
              </li>
              <li>
                <strong>הסכמים קיבוציים וצווי הרחבה:</strong> במקומות עבודה רבים חלים הסכמים קיבוציים או צווי הרחבה ענפיים המעניקים תנאים עדיפים על החוק הכללי, אשר אינם מנותחים באופן פרטני בכלי זה.
              </li>
              <li>
                <strong>טיוטה בלבד:</strong> כל נוסח, חישוב או מסמך שהכלי מציג הינו טיוטה לצורכי התארגנות אישית בלבד. אין להסתמך עליו כראיה בהליך משפטי.
              </li>
              <li>
                <strong>פנייה לעורך דין:</strong> לפני נקיטת הליך משפטי, חתימה על כתב ויתור או הסכם, או הגשת תביעה לבית הדין לעבודה, יש לפנות לעורך דין מוסמך המתמחה בדיני עבודה.
              </li>
            </ul>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            הכלי אינו מהווה תחליף לייעוץ המתחשב בנתונים ובצרכים המיוחדים של כל אדם. כל שימוש בפלט ובתוצריו הוא באחריותו הבלעדית של המשתמש.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            אישור ההבהרה יישמר בדפדפן זה לפעמים הבאות.
          </span>
          <button
            onClick={onAcknowledge}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition transform active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>קראתי, הבנתי ואני מאשר/ת</span>
          </button>
        </div>
      </div>
    </div>
  );
};
