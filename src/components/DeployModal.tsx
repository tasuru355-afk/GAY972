import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Download, FileCode, Sparkles } from 'lucide-react';

interface DeployModalProps {
  onClose: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-xl shadow-sm">
            🚀
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Deploy Lên GitHub Pages (HTML, JS, CSS)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Các file dạng thuần HTML, CSS, JS đã được tạo sẵn trong thư mục <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600 font-bold">/docs/</code>
            </p>
          </div>
        </div>

        {/* 3 Deployment Methods */}
        <div className="space-y-4 text-xs text-slate-700">
          {/* Method 1 */}
          <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white font-black text-[10px]">
                1
              </span>
              <h3 className="font-extrabold text-sm text-indigo-950">
                Cách 1: Bật GitHub Pages từ thư mục /docs (Khuyên dùng - Nhanh nhất)
              </h3>
            </div>
            <p className="text-slate-600 mb-2 leading-relaxed">
              Mã nguồn tĩnh thuần HTML/JS/CSS đã nằm sẵn trong thư mục <strong>/docs/</strong>. Bạn chỉ cần:
            </p>
            <ol className="list-decimal list-inside space-y-1 bg-white p-3 rounded-lg border border-indigo-100 font-medium text-slate-800">
              <li>Đẩy toàn bộ dự án lên GitHub repository của bạn.</li>
              <li>Trên GitHub, vào <strong>Settings</strong> ➔ chọn tab <strong>Pages</strong> bên trái.</li>
              <li>Tại mục <strong>Build and deployment</strong>:
                <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-indigo-900 font-bold">
                  <li>Source: <code>Deploy from a branch</code></li>
                  <li>Branch: chọn <code>main</code> (hoặc <code>master</code>)</li>
                  <li>Folder: chọn <strong><code>/docs</code></strong> (thay vì <code>/ (root)</code>)</li>
                </ul>
              </li>
              <li>Bấm <strong>Save</strong>. Sau 1 phút trang web sẽ online tại: <code className="text-emerald-700">https://&lt;username&gt;.github.io/&lt;repo&gt;/</code></li>
            </ol>
          </div>

          {/* Method 2 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white font-black text-[10px]">
                2
              </span>
              <h3 className="font-extrabold text-sm text-slate-900">
                Cách 2: Kéo thả 3 file (index.html, style.css, script.js) vào repo mới
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nếu bạn muốn tạo một repo GitHub hoàn toàn trống chỉ có 3 file web:
              Copy 3 file bên trong thư mục <code className="font-bold text-slate-800">/docs/</code> (gồm <code>index.html</code>, <code>style.css</code>, <code>script.js</code>) rồi tải trực tiếp lên thư mục gốc của repo mới. Sau đó bật GitHub Pages tại <strong>/ (root)</strong>.
            </p>
          </div>

          {/* Features list */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <h4 className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Đặc điểm bản tĩnh HTML, CSS, JS vừa tạo:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-emerald-800">
              <li>✓ Hoạt động không cần cài Node.js</li>
              <li>✓ Sân đấu kéo co đồ họa SVG mượt mà</li>
              <li>✓ 10 câu hỏi mỗi bên, bảng câu hỏi song song 2 đội</li>
              <li>✓ Đúng được kéo, sai lùi lại & trừ điểm</li>
              <li>✓ Nút "Qua câu" xem đáp án đúng tức thì</li>
              <li>✓ Âm thanh Web Audio trung thực tích hợp sẵn</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
