# Feature Specification Document (FSD) - Giai đoạn 3: Tính năng nâng cao và Lưu trữ

## 1. Tổng quan và User Stories

### 1.1. Tổng quan

Đây là giai đoạn cuối cùng, tập trung vào việc hoàn thiện ứng dụng với các tính năng nâng cao giúp tăng cường trải nghiệm người dùng và đảm bảo tính bền vững của dữ liệu. Chúng ta sẽ triển khai chức năng kéo-thả để sắp xếp timeline, bôi đậm văn bản, và quan trọng nhất là lưu trữ toàn bộ trạng thái của kịch bản vào Local Storage. Cuối cùng, chúng ta sẽ hoàn thiện logic cho các nút hành động chính.

### 1.2. User Stories

-   **As a user, I want to** drag and drop rows in the timeline to easily reorder my agenda items.
-   **As a user, I want all my data** to be saved automatically, so that when I refresh the page or come back later, my work is not lost.
-   **As a user, I want to** click a "Print" button to open the browser's print dialog and print my agenda in a clean, A4-formatted layout.
-   **As a user, I want to** click a "Reset" button to clear all the input fields and start over with a blank slate.
-   **As a user, I want to** select text in an input field and click a "Bold" button to make that text bold, so I can emphasize important information.

## 2. Yêu cầu chức năng (Functional Requirements)

-   **FR1: Kéo-thả (Drag-and-Drop):**
    -   Người dùng phải có thể nhấn giữ vào một icon kéo-thả trên một dòng và di chuyển nó đến một vị trí mới trong bảng timeline.
    -   Khi một dòng được thả ra ở vị trí mới, thứ tự của các dòng trong bảng phải được cập nhật.
    -   Hệ thống phải tính toán lại thời gian cho tất cả các dòng bị ảnh hưởng bởi sự thay đổi vị trí.
-   **FR2: Lưu trữ vào Local Storage:**
    -   Toàn bộ trạng thái của form (bao gồm tất cả các ô input trong header và tất cả các dòng trong timeline) phải được tự động lưu vào Local Storage của trình duyệt.
    -   Việc lưu trữ phải diễn ra ngay lập tức mỗi khi có bất kỳ sự thay đổi nào về dữ liệu.
    -   Khi người dùng tải lại trang, ứng dụng phải đọc dữ liệu từ Local Storage và khôi phục lại trạng thái của form đúng như lần cuối cùng người dùng thao tác.
-   **FR3: Chức năng In ấn:**
    -   Khi nhấn nút "In", hệ thống phải kích hoạt cửa sổ in của trình duyệt.
    -   Nội dung được in phải có định dạng chính xác của một tờ giấy A4 (portrait).
    -   Các yếu tố của giao diện người dùng không cần thiết cho việc in (như các nút bấm, thanh công cụ, icon kéo-thả) phải được ẩn đi trong bản in.
-   **FR4: Chức năng Làm mới:**
    -   Khi nhấn nút "Làm mới nội dung", một hộp thoại xác nhận phải hiện ra (ví dụ: "Bạn có chắc chắn muốn xóa toàn bộ nội dung?").
    -   Nếu người dùng xác nhận, tất cả các ô input trên trang phải được xóa sạch.
    -   Dữ liệu tương ứng trong Local Storage cũng phải được xóa.
-   **FR5: Chức năng Bôi đậm:**
    -   Khi người dùng đang focus vào một ô input, nhấn nút "Bôi đậm" trên thanh công cụ sẽ làm cho ô input đó có style `font-weight: bold`.
    -   Nhấn nút "Bôi đậm" một lần nữa sẽ loại bỏ style in đậm.
    -   Trạng thái in đậm của mỗi ô cũng phải được lưu vào Local Storage.

## 3. Yêu cầu phi chức năng (Non-functional Requirements)

-   **NFR1: Performance:** Chức năng kéo-thả phải mượt mà. Việc lưu vào Local Storage không được gây ảnh hưởng đến hiệu năng của ứng dụng.
-   **NFR2: Data Integrity:** Dữ liệu lưu trong Local Storage phải nhất quán với những gì hiển thị trên giao diện.
-   **NFR3: Cross-browser Compatibility:** Chức năng in ấn phải hoạt động tốt trên các trình duyệt phổ biến.

## 4. Hạng mục ngoài phạm vi (Out of Scope)

-   Không có. Giai đoạn này hoàn thiện tất cả các yêu cầu đã đề ra.

## 5. Tiêu chí chấp nhận (Acceptance Criteria)

-   Người dùng có thể kéo-thả các dòng để sắp xếp lại timeline, và thời gian được cập nhật chính xác.
-   Dữ liệu được tự động lưu vào Local Storage và được khôi phục thành công khi tải lại trang.
-   Nút "In" mở ra cửa sổ in với bản xem trước được định dạng đúng.
-   Nút "Làm mới" xóa tất cả dữ liệu sau khi người dùng xác nhận.
-   Nút "Bôi đậm" hoạt động đúng chức năng cho các ô input.
