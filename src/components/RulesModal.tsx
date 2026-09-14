import React from 'react';
import { X, Trophy, CheckCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-black">
            📜
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Luật Chơi Kéo Co Xanh - Đỏ
          </h2>
        </div>

        <div className="space-y-3.5 text-sm text-slate-700">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 block font-bold">1. Hai Đội Đối Kháng</strong>
              Mỗi bên gồm Đội Xanh và Đội Đỏ, mỗi đội sẽ trả lời đúng 10 câu hỏi trắc nghiệm.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-900 block font-bold">2. Trả lời đúng: Được kéo dây!</strong>
              Cộng ngay <strong className="text-emerald-700">+100 điểm</strong> và cả đội cùng dùng sức kéo sợi dây về phía mình! Trả lời đúng liên tiếp sẽ kích hoạt điểm Combo siêu lực kéo!
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
            <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-900 block font-bold">3. Trả lời sai / Hết giờ: Bị trừ điểm & Lùi lại!</strong>
              Bị trừ <strong className="text-rose-700">-50 điểm</strong>, cầu thủ bị hụt chân chao đảo và sợi dây bị trượt lùi về phía đối phương!
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-100">
            <Trophy className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 block font-bold">4. Điều kiện chiến thắng</strong>
              <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                <li><span className="font-semibold text-slate-800">Thắng Knockout ngay lập tức:</span> Nếu một đội kéo nút thắt dây vượt qua vạch chiến thắng của mình!</li>
                <li><span className="font-semibold text-slate-800">Thắng chung cuộc 10 câu:</span> Đội nào kéo dây về phần sân mình nhiều hơn (hoặc có tổng điểm cao hơn) sau 10 lượt sẽ giành cúp vô địch!</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          Đã hiểu, vào trận ngay!
        </button>
      </div>
    </div>
  );
};
