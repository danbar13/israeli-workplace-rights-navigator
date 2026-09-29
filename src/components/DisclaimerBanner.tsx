import React from 'react';
import { AlertCircle, ChevronLeft } from 'lucide-react';

interface DisclaimerBannerProps {
  onOpenModal: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onOpenModal }) => {
  return (
    <aside 
      aria-label="הבהרה משפטית"
      className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-300/40 dark:border-amber-500/20 text-amber-950 dark:text-amber-200 px-4 py-2 text-xs sm:text-sm backdrop-blur-xs transition-colors"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>הבהרה משפטית:</strong> כלי מידע חינמי המבוסס על דיני העבודה בישראל. הפלט והחישובים אינם מהווים ייעוץ משפטי מחייב.
          </span>
        </div>
        <button
          onClick={onOpenModal}
          className="inline-flex items-center gap-1 font-bold text-amber-900 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 underline underline-offset-2 hover:bg-amber-500/10 px-2 py-0.5 rounded-lg transition"
        >
          <span>תנאי שימוש והבהרה מלאה</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
