# 🚀 Hướng Dẫn Deploy Lên GitHub Pages (3 Cách Dễ Dàng)

Toàn bộ mã nguồn định dạng thuần **HTML, CSS, JS (Không cần cài đặt Node.js hay Build Tools)** đã được chuẩn bị sẵn trong thư mục `/docs/`.

---

## 🌟 Cách 1: Bật GitHub Pages Trực Tiếp Từ Thư Mục `/docs` (Khuyên dùng - Nhanh nhất)

Nếu bạn đẩy toàn bộ repository này lên GitHub:
1. Đẩy code lên GitHub repository của bạn (`git push origin main`).
2. Trên trang GitHub của bạn, vào mục: **Settings** (Cài đặt) -> tab **Pages** ở thanh menu bên trái.
3. Tại phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn nhánh `main` (hoặc `master`)
   - **Thư mục (Folder)**: Chọn `/docs` *(thay vì `/ (root)`)*
   - Bấm **Save** (Lưu).
4. Sau 1 phút, GitHub sẽ cung cấp link web trực tiếp của bạn:  
   👉 `https://<tên-tài-khoản>.github.io/<tên-repo>/`

---

## 🌟 Cách 2: Sử Dụng 3 File Thuần `index.html`, `style.css`, `script.js`

Nếu bạn tạo một Repository mới trên GitHub chỉ chứa website tĩnh:
1. Sao chép 3 file nằm trong thư mục `/docs/`:
   - `index.html`
   - `style.css`
   - `script.js`
2. Kéo thả 3 file này trực tiếp vào thư mục gốc của repository GitHub mới.
3. Vào **Settings** -> **Pages** -> Chọn nhánh `main` và thư mục `/ (root)` -> Bấm **Save**.
4. Website sẽ chạy ngay lập tức mà không cần bất kỳ lệnh cài đặt nào!

---

## 🌟 Cách 3: Build Bản Vite React Đầy Đủ
Nếu bạn muốn dùng bản React hiện tại với Tailwind:
1. Chạy lệnh:
   ```bash
   npm run build
   ```
2. Thư mục `dist/` được tạo ra chứa các file HTML/CSS/JS đã tối ưu với đường dẫn tương đối `./` sẵn sàng cho GitHub Pages.
3. Đẩy nội dung trong `dist/` lên nhánh `gh-pages` hoặc dùng GitHub Actions `actions/deploy-pages`.

---

### ✨ Tính năng đã tích hợp trong file tĩnh:
- ✅ 10 câu hỏi mỗi bên, hiển thị 2 bảng câu hỏi song song (Đội Xanh & Đội Đỏ).
- ✅ Đúng được kéo dây (+100 điểm), sai bị trừ điểm (-50 điểm) và lùi lại.
- ✅ Có nút **"Qua câu (Tính sai & lùi lại)"** kèm lời giải đáp án đúng chi tiết.
- ✅ Tự động đếm ngược 3s qua câu tiếp theo hoặc bấm nút thủ công.
- ✅ Âm thanh hiệu ứng Web Audio API trung thực (kéo dây, trượt chân, đúng, sai, chiến thắng) không phụ thuộc file ngoài.
- ✅ Đồ họa sân vận động SVG chân thực, mượt mà trên cả máy tính và điện thoại.
