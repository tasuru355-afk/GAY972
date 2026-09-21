# 🚀 Hướng Dẫn Deploy Lên GitHub Pages (CHỈ SỬ DỤNG HTML & CSS)

Trò chơi **Kéo Co Xanh Đỏ** hiện tại hoạt động **100% bằng HTML & CSS thuần túy**, hoàn toàn **KHÔNG CẦN JAVASCRIPT, KHÔNG CẦN NODE.JS, KHÔNG CẦN BUILD TOOLS**.

Toàn bộ ứng dụng chỉ gồm 2 file tĩnh duy nhất:
- `index.html`
- `style.css`

---

## 🌟 Cách 1: Bật GitHub Pages Trực Tiếp Từ Nhánh `main` (Cực Kỳ Đơn Giản)

1. Đẩy mã nguồn lên GitHub của bạn:
   ```bash
   git push origin main
   ```
2. Trên trang GitHub repository, vào mục: **Settings** (Cài đặt) -> chọn tab **Pages** ở danh mục bên trái.
3. Tại phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn nhánh `main` (hoặc `master`)
   - **Folder**: Chọn `/ (root)` hoặc `/docs`
   - Bấm **Save** (Lưu).
4. Sau 1 phút, trang web sẽ online tại:  
   👉 `https://<tên-tài-khoản>.github.io/<tên-repo>/`

---

## 🌟 Cách 2: Kéo Thả 2 File Vào Repo Mới

1. Tạo một repository mới trên GitHub (không cần chọn file nào).
2. Kéo thả 2 file `index.html` và `style.css` trực tiếp vào repo trên trình duyệt.
3. Vào **Settings** -> **Pages** -> Chọn nhánh `main` và thư mục `/ (root)` -> Bấm **Save**.
4. Xong! Bạn có ngay một website trắc nghiệm kéo co hoạt động trực tuyến.

---

## 💻 Chạy Trực Tiếp Offline Trên Máy Tính
Vì dự án chỉ dùng **HTML và CSS**, bạn có thể:
1. Tải 2 file `index.html` và `style.css` về máy tính để chung một thư mục.
2. Nhấp đúp chuột (Double click) vào `index.html` để mở bằng bất kỳ trình duyệt nào (Chrome, Cốc Cốc, Edge, Firefox, Safari).
3. Chơi ngay lập tức mà không cần kết nối mạng hay cài đặt bất cứ phần mềm lập trình nào!

---

### ✨ Những Điểm Nổi Bật Của Bản Thuần HTML & CSS:
- 💯 **Zero JavaScript**: Không dùng một dòng code JS nào.
- 🏟️ **Bố cục bảng câu hỏi đặt sau lưng các đội**: Bảng câu hỏi của Đội Xanh đặt ngay sau lưng Đội Xanh (bên trái), sân đấu kéo co nằm ở trung tâm với bảng chỉ dẫn trên sân, và bảng câu hỏi Đội Đỏ đặt ngay sau lưng Đội Đỏ (bên phải), tạo cảm giác tiếp sức thi đấu trực quan và đối kháng cao.
- ⏱️ **Đồng hồ đếm ngược 15s/câu**: Sử dụng CSS `@keyframes` và `steps(15, end)` để hiển thị đếm ngược 15s trực quan cùng thanh tiến trình. Khi người chơi chọn đáp án, đồng hồ tự động dừng lại.
- 🧮 **CSS Counters**: Tự động tính điểm real-time (+100 điểm khi đúng, -50 điểm khi sai/bỏ qua).
- 🎯 **Hiệu ứng vật lý dây kéo**: Dây thừng và 2 đội kéo dịch chuyển sống động theo kết quả câu hỏi bằng toán học CSS `:has()` và `calc()`.
- 🔍 **Phản hồi câu hỏi tức thì**: Khi chọn đáp án, hệ thống ngay lập tức đổi màu xanh/đỏ, khóa câu hỏi chống đổi ý, và hiển thị lời giải thích chi tiết.
- 🔄 **Nút Chơi Lại**: Sử dụng tính năng `<button type="reset">` nguyên bản của HTML để đặt lại toàn bộ điểm và vị trí sân đấu trong 1 click.
- 📱 **Đồ họa SVG sắc nét & Responsive**: Tương thích hoàn hảo trên máy tính, máy tính bảng và điện thoại.
