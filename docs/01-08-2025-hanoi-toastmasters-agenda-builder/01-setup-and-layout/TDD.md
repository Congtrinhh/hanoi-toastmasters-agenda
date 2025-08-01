# Technical Design Document (TDD) - Giai đoạn 1: Setup và Layout

## 1. Tổng quan về kiến trúc

Kiến trúc của ứng dụng trong giai đoạn này sẽ rất đơn giản, tập trung vào việc thiết lập một cấu trúc component cơ bản trong Vue.js 3. Chúng ta sẽ sử dụng kiến trúc component-based, chia giao diện người dùng thành các thành phần nhỏ, có thể tái sử dụng.

-   **Framework:** Vue.js 3 (sử dụng Composition API để quản lý logic).
-   **Styling:** Bootstrap 5 sẽ được tích hợp để xử lý layout và các thành phần UI cơ bản. CSS tùy chỉnh sẽ được sử dụng để tinh chỉnh giao diện cho giống với định dạng A4 và mockup.
-   **Cấu trúc thư mục:** Tuân thủ cấu trúc tiêu chuẩn của một dự án Vue CLI hoặc Vite.
    -   `src/`
        -   `components/`: Chứa các component tái sử dụng.
        -   `assets/`: Chứa các tài nguyên tĩnh như hình ảnh (logo, QR code) và file CSS.
        -   `App.vue`: Component gốc của ứng dụng.
        -   `main.js`: Điểm khởi đầu của ứng dụng.

## 2. Đặc tả API Endpoints

-   Trong giai đoạn này, không có bất kỳ tương tác nào với backend. Do đó, không có API endpoints nào được định nghĩa.

## 3. Thay đổi Schema cơ sở dữ liệu

-   Không áp dụng. Ứng dụng hoàn toàn hoạt động ở phía client và không có cơ sở dữ liệu.

## 4. Cấu trúc Component

Giao diện sẽ được chia thành các component chính sau:

-   **`App.vue`**:

    -   **Trách nhiệm:** Là component chính, chứa toàn bộ layout của ứng dụng.
    -   **Thành phần con:** `AgendaSheet.vue`.

-   **`AgendaSheet.vue`**:

    -   **Trách nhiệm:** Đại diện cho một tờ giấy A4. Component này sẽ chứa toàn bộ nội dung của kịch bản. Nó sẽ quản lý việc hiển thị các phần header, timeline, và footer.
    -   **Props:** Không có.
    -   **State:** Không có state động trong giai đoạn này.
    -   **Thành phần con:** `AgendaHeader.vue`, `AgendaTimeline.vue`, `AgendaFooter.vue`, `ActionToolbar.vue`.
    -   **Styling:** Sẽ có class CSS để định nghĩa chiều rộng là 210mm và các thuộc tính khác để trông giống một tờ giấy.

-   **`ActionToolbar.vue`**:

    -   **Trách nhiệm:** Hiển thị thanh công cụ với các nút chức năng chính.
    -   **Props:** Không có.
    -   **Events:** Không có.
    -   **Nội dung:** Chứa các nút "In", "Làm mới nội dung" và "Bôi đậm". Các nút này là các phần tử HTML tĩnh.

-   **`AgendaHeader.vue`**:

    -   **Trách nhiệm:** Hiển thị phần đầu của kịch bản.
    -   **Props:** Không có.
    -   **Nội dung:** Chứa logo (dạng `<img>` với `src` trỏ đến file trong `assets`), các tiêu đề, và bảng thông tin chung. Các ô input sẽ là các thẻ `<input>` và `<textarea>` tĩnh, không có `v-model`.

-   **`AgendaTimeline.vue`**:

    -   **Trách nhiệm:** Hiển thị bảng timeline của chương trình.
    -   **Props:** Không có.
    -   **Nội dung:** Chứa một bảng HTML (`<table>`) với các cột đã định nghĩa. Bảng sẽ có một vài dòng (`<tr>`) dữ liệu mẫu được hard-code để minh họa cấu trúc.

-   **`AgendaFooter.vue`**:
    -   **Trách nhiệm:** Hiển thị phần chân của kịch bản.
    -   **Props:** Không có.
    -   **Nội dung:** Chứa hình ảnh mã QR (dạng `<img>` với `src` trỏ đến file trong `assets`).

## 5. Điểm tích hợp với hệ thống hiện có

-   Không áp dụng, vì đây là một dự án hoàn toàn mới.

## 6. Kế hoạch triển khai kỹ thuật

1.  **Khởi tạo dự án:**
    -   Sử dụng Vite để tạo một dự án Vue.js 3 mới: `npm create vite@latest hanoi-toastmasters-agenda -- --template vue`.
    -   Cài đặt Bootstrap: `npm install bootstrap`.
    -   Import Bootstrap vào file `src/main.js`.
2.  **Tạo cấu trúc file:**
    -   Tạo các file component `.vue` như đã mô tả trong phần 4 trong thư mục `src/components/`.
    -   Tạo thư mục `src/assets/images/` và đặt các ảnh giữ chỗ cho logo và mã QR vào đó.
3.  **Xây dựng Components:**
    -   Bắt đầu từ `App.vue`, import và sử dụng `AgendaSheet.vue`.
    -   Trong `AgendaSheet.vue`, xây dựng layout chính và import các component con (`AgendaHeader`, `AgendaTimeline`, `AgendaFooter`, `ActionToolbar`).
    -   Triển khai nội dung tĩnh cho từng component con theo mockup.
4.  **Styling:**
    -   Tạo một file `src/assets/main.css` để viết các CSS tùy chỉnh.
    -   Định nghĩa class `.a4-sheet` với `width: 210mm;` và các style cần thiết khác (padding, margin, box-shadow).
    -   Tinh chỉnh font chữ, kích thước chữ, và khoảng cách giữa các phần tử để khớp với mockup.
    -   Tạo class `.page-break` với `border-top: 1px dashed #ccc;` để mô phỏng đường ngắt trang.
