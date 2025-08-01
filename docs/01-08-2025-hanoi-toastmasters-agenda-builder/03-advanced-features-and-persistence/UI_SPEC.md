# User Interface Specification - Giai đoạn 3: Tính năng nâng cao và Lưu trữ

## 1. Cấu trúc Layout chi tiết

-   **Icon Kéo-thả:** Một icon (ví dụ: icon 6 chấm) sẽ được thêm vào đầu mỗi dòng trong `TimelineRow.vue`, bên trái cột "Thời gian". Icon này sẽ đóng vai trò là "handle" cho việc kéo-thả.

## 2. Đặc tả Component

### 2.1. TimelineRow.vue

-   **Trạng thái Kéo (Dragging State):**
    -   Khi một dòng đang được kéo, nó có thể có một style trực quan để phân biệt (ví dụ: hơi trong suốt, có bóng đổ).
    -   Một ảnh giữ chỗ (placeholder) sẽ xuất hiện ở vị trí mà dòng sẽ được thả vào.
-   **Trạng thái In đậm:**
    -   Các ô input sẽ được áp dụng class `font-weight: bold` một cách động dựa trên giá trị `isBold` trong state.

### 2.2. ActionToolbar.vue & Các nút chính

-   **Nút "In":**
    -   Không có thay đổi về giao diện.
-   **Nút "Làm mới nội dung":**
    -   Không có thay đổi về giao diện.
-   **Nút "Bôi đậm":**
    -   Nút có thể có trạng thái "active" (ví dụ: nền sẫm hơn) khi ô input đang được focus là một ô đã được in đậm.

## 3. Các yếu tố tương tác (Interactive Elements)

### 3.1. Kéo-thả dòng

-   **Hành động:** Người dùng nhấn giữ chuột vào icon kéo-thả của một dòng, di chuyển chuột lên hoặc xuống, và thả chuột ở vị trí mới.
-   **Phản hồi hệ thống:**
    -   Ngay khi bắt đầu kéo, dòng đó sẽ "nổi" lên và di chuyển theo con trỏ chuột.
    -   Khi dòng được thả, nó sẽ được đặt vào vị trí mới một cách mượt mà.
    -   Thứ tự các dòng trong bảng được cập nhật.
    -   Thời gian của các dòng bị ảnh hưởng được tính toán lại.

### 3.2. Lưu và Tải dữ liệu

-   **Hành động (Lưu):** Người dùng thay đổi bất kỳ dữ liệu nào trên form.
-   **Phản hồi hệ thống (Lưu):** Không có phản hồi trực quan nào cho người dùng. Việc lưu diễn ra ngầm.
-   **Hành động (Tải):** Người dùng mở hoặc tải lại trang.
-   **Phản hồi hệ thống (Tải):** Form được điền sẵn với dữ liệu từ lần làm việc cuối cùng. Quá trình này phải diễn ra đủ nhanh để người dùng không thấy trang trống rồi dữ liệu mới xuất hiện.

### 3.3. In ấn

-   **Hành động:** Người dùng nhấn nút "In".
-   **Phản hồi hệ thống:**
    -   Cửa sổ xem trước khi in của trình duyệt mở ra.
    -   Trong bản xem trước, chỉ có nội dung của `AgendaSheet.vue` được hiển thị.
    -   Tất cả các nút, thanh công cụ, icon kéo-thả, và các đường viền của ô input đều bị ẩn.
    -   Nội dung được phân trang một cách chính xác theo khổ A4.

### 3.4. Làm mới

-   **Hành động:** Người dùng nhấn nút "Làm mới nội dung".
-   **Phản hồi hệ thống:**
    -   Một hộp thoại xác nhận của trình duyệt (`window.confirm`) xuất hiện với thông báo "Bạn có chắc chắn muốn xóa toàn bộ nội dung?".
    -   Nếu người dùng nhấn "Cancel", không có gì xảy ra.
    -   Nếu người dùng nhấn "OK", tất cả các trường input trên trang được xóa và form trở về trạng thái ban đầu.

### 3.5. Bôi đậm

-   **Hành động:** Người dùng đặt con trỏ vào một ô input và nhấn nút "Bôi đậm" trên thanh công cụ.
-   **Phản hồi hệ thống:**
    -   Toàn bộ văn bản trong ô input đó trở nên in đậm.
    -   Nút "Bôi đậm" có thể thay đổi giao diện để cho biết trạng thái "active".
    -   Nhấn nút một lần nữa sẽ bỏ in đậm.

## 4. Yêu cầu về Responsive Design

-   Không thay đổi.

## 5. Luồng trải nghiệm người dùng (User Experience Flow)

1.  Người dùng chỉnh sửa kịch bản. Sau khi hoàn tất, họ đóng trình duyệt.
2.  Ngày hôm sau, người dùng mở lại trang web và thấy toàn bộ công việc của mình vẫn còn nguyên vẹn.
3.  Người dùng nhận ra cần thay đổi thứ tự một vài mục. Họ kéo-thả các dòng đến vị trí mong muốn một cách dễ dàng. Timeline tự động cập nhật.
4.  Người dùng muốn nhấn mạnh một vài thông tin, họ click vào ô input và nhấn nút "Bôi đậm".
5.  Khi đã hài lòng, người dùng nhấn "In". Một bản xem trước sạch sẽ, sẵn sàng để in hiện ra.
6.  Sau buổi sinh hoạt, người dùng muốn tạo kịch bản cho tuần tiếp theo. Họ nhấn "Làm mới", xác nhận, và có một trang trống để bắt đầu.
