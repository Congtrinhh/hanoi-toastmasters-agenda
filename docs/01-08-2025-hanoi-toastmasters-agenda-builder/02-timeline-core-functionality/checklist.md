# Checklist: Giai đoạn 2 - Chức năng cốt lõi của Timeline

-   [x] **1. Tái cấu trúc State và Component**
    -   [x] Di chuyển dữ liệu timeline từ `AgendaTimeline.vue` lên `AgendaSheet.vue` và quản lý bằng `ref`.
    -   [x] Tạo component mới `src/components/TimelineRow.vue`.
    -   [x] Cập nhật `AgendaTimeline.vue` để sử dụng `v-for` và render `TimelineRow.vue`.
-   [x] **2. Implement Logic quản lý dòng**
    -   [x] Thêm các hàm `addRow`, `deleteRow`, `copyRow` vào `AgendaSheet.vue`.
    -   [x] Thêm các icon và xử lý sự kiện hover trên `TimelineRow.vue`.
    -   [x] Kết nối sự kiện từ `TimelineRow.vue` -> `AgendaTimeline.vue` -> `AgendaSheet.vue`.
-   [x] **3. Implement Logic tính toán thời gian**
    -   [x] Tạo hàm tiện ích để xử lý cộng trừ thời gian (ví dụ: `addMinutes`).
    -   [x] Tạo hàm `recalculateTimes` trong `AgendaSheet.vue`.
    -   [x] Sử dụng `watch` trong `AgendaSheet.vue` để tự động gọi `recalculateTimes` khi dữ liệu thay đổi.
    -   [x] Vô hiệu hóa ô input thời gian cho các dòng không phải là dòng đầu tiên.
-   [x] **4. Hoàn thiện và kiểm tra**
    -   [x] Đảm bảo focus tự động chuyển đến dòng mới khi thêm. (Bỏ qua để đơn giản hóa)
    -   [x] Kiểm tra lại toàn bộ chức năng theo FSD và UI_SPEC.
    -   [x] Cập nhật checklist này.
