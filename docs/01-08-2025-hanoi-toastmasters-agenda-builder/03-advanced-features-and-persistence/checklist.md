# Checklist: Giai đoạn 3 - Tính năng nâng cao và Lưu trữ

-   [x] **1. Tái cấu trúc State cho Bôi đậm**
    -   [x] Cập nhật cấu trúc dữ liệu trong `AgendaSheet.vue` để mỗi trường là một object `{ value, isBold }`.
    -   [x] Cập nhật các component con (`AgendaHeader`, `TimelineRow`) để hoạt động với cấu trúc state mới.
-   [x] **2. Triển khai Lưu trữ (Persistence)**
    -   [x] Tạo composable `src/composables/usePersistence.js`.
    -   [x] Tích hợp `usePersistence.js` vào `AgendaSheet.vue` (lưu và tải state).
-   [x] **3. Tích hợp Kéo-thả**
    -   [x] Cài đặt `vuedraggable@next`.
    -   [x] Cập nhật `AgendaTimeline.vue` để sử dụng `<draggable>`.
    -   [x] Thêm "drag handle" vào `TimelineRow.vue`.
-   [x] **4. Hoàn thiện các nút chức năng**
    -   [x] Implement logic cho nút "Bôi đậm" (`ActionToolbar.vue` và `AgendaSheet.vue`).
    -   [x] Implement logic cho nút "Làm mới nội dung".
    -   [x] Implement logic cho nút "In" với CSS media query.
-   [x] **5. Hoàn thành**
    -   [x] Kiểm tra lại toàn bộ chức năng theo FSD và UI_SPEC.
    -   [x] Cập nhật checklist này.
