import React, { useState } from 'react';
import { X, Sparkles, Sliders, Check } from 'lucide-react';
import { QUESTION_CATEGORIES } from '../data/questions';
import { GameSettings } from '../types';

interface CustomQuestionsModalProps {
  settings: GameSettings;
  blueName: string;
  redName: string;
  onSave: (newSettings: GameSettings, newBlueName: string, newRedName: string) => void;
  onClose: () => void;
}

export const CustomQuestionsModal: React.FC<CustomQuestionsModalProps> = ({
  settings,
  blueName,
  redName,
  onSave,
  onClose,
}) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>({ ...settings });
  const [localBlueName, setLocalBlueName] = useState(blueName);
  const [localRedName, setLocalRedName] = useState(redName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings, localBlueName.trim() || 'Đội Xanh', localRedName.trim() || 'Đội Đỏ');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold">
            <Sliders className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Cài Đặt Trận Đấu & Chủ Đề
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-blue-800 mb-1">
                Tên Đội Xanh
              </label>
              <input
                type="text"
                value={localBlueName}
                onChange={(e) => setLocalBlueName(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 text-sm border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Đội Xanh"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-red-800 mb-1">
                Tên Đội Đỏ
              </label>
              <input
                type="text"
                value={localRedName}
                onChange={(e) => setLocalRedName(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 text-sm border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Đội Đỏ"
              />
            </div>
          </div>

          {/* Question Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Chủ đề câu hỏi
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {QUESTION_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setLocalSettings({ ...localSettings, category: cat.id })}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    localSettings.category === cat.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  {localSettings.category === cat.id && (
                    <Check className="h-4 w-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time per question */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Thời gian mỗi câu hỏi
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: 15, label: '15 giây' },
                { val: 20, label: '20 giây' },
                { val: 30, label: '30 giây' },
                { val: 0, label: 'Không giới hạn' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.val}
                  onClick={() => setLocalSettings({ ...localSettings, timePerQuestion: t.val })}
                  className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                    localSettings.timePerQuestion === t.val
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question distribution for both teams */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Bộ câu hỏi cho hai đội
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLocalSettings({ ...localSettings, sameQuestions: false })}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  !localSettings.sameQuestions
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <span>🔀 Đề thi riêng biệt</span>
                  {!localSettings.sameQuestions && <Check className="h-3.5 w-3.5 text-indigo-600 ml-auto" />}
                </div>
                <p className="text-[11px] text-slate-500">Mỗi đội nhận 10 câu hỏi khác nhau ngẫu nhiên</p>
              </button>

              <button
                type="button"
                onClick={() => setLocalSettings({ ...localSettings, sameQuestions: true })}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  localSettings.sameQuestions
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <span>🎯 Cùng 1 câu hỏi</span>
                  {localSettings.sameQuestions && <Check className="h-3.5 w-3.5 text-indigo-600 ml-auto" />}
                </div>
                <p className="text-[11px] text-slate-500">Cả 2 đội cùng giải 1 câu giống nhau so tốc độ</p>
              </button>
            </div>
          </div>

          {/* Points config info */}
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-200">
            <div className="flex justify-between py-1">
              <span>Điểm khi trả lời đúng:</span>
              <strong className="text-emerald-600">+{localSettings.pointsCorrect}đ (Kéo dây về phía mình)</strong>
            </div>
            <div className="flex justify-between py-1 border-t border-slate-200/60">
              <span>Điểm khi trả lời sai:</span>
              <strong className="text-rose-600">-{localSettings.pointsWrong}đ (Bị lùi & dây bị kéo)</strong>
            </div>
            <div className="flex justify-between py-1 border-t border-slate-200/60">
              <span>Số câu hỏi mỗi đội:</span>
              <strong className="text-slate-900">{localSettings.questionsPerTeam} câu hỏi</strong>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
            >
              Áp dụng & Bắt đầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
