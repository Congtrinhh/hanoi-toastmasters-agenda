# Feature Specification Document (FSD) - Giai đoạn 2: Chức năng cốt lõi của Timeline

## 1. Tổng quan và User Stories

### 1.1. Tổng quan

Giai đoạn này tập trung vào việc triển khai các chức năng tương tác cốt lõi cho bảng timeline. Dựa trên nền tảng giao diện tĩnh đã được xây dựng ở Giai đoạn 1, chúng ta sẽ thêm vào logic để người dùng có thể quản lý các dòng trong timeline (thêm, xóa, sao chép) và tự động hóa việc tính toán thời gian, giúp quá trình soạn kịch bản trở nên nhanh chóng và chính xác.

### 1.2. User Stories

-   **As a user, I want to** add a new blank row below any existing row, so that I can insert new items into my agenda.
-   **As a user, I want to** delete any row from the timeline, so that I can remove unnecessary items.
-   **As a user, I want to** duplicate any existing row, so that I can quickly create new items with similar content.
-   **As a user, I want the** start time of each row to be automatically calculated based on the start time and duration of the previous row, so that I don't have to calculate it manually and can avoid errors.
-   **As a user, I want to** be able to edit the starting time of the very first row, so I can set the beginning of the event.

## 2. Yêu cầu chức năng (Functional Requirements)

-   **FR1: Quản lý dòng (Thêm/Xóa/Sao chép):**
    -   Khi người dùng di chuột (hover) qua một dòng trong bảng timeline, các icon chức năng (Thêm, Xóa, Sao chép) phải xuất hiện.
    -   **Thêm dòng:** Khi nhấn vào icon "Thêm", một dòng mới, trống hoàn toàn phải được chèn ngay bên dưới dòng hiện tại.
    -   **Xóa dòng:** Khi nhấn vào icon "Xóa", dòng hiện tại phải bị xóa khỏi bảng.
    -   **Sao chép dòng:** Khi nhấn vào icon "Sao chép", một dòng mới phải được chèn ngay bên dưới dòng hiện tại, với toàn bộ dữ liệu (Chương trình, Báo hiệu thời gian, Người đảm nhận) được sao chép từ dòng gốc.
-   **FR2: Tự động tính toán thời gian:**
    -   Ô "Thời gian" của dòng đầu tiên phải cho phép người dùng nhập liệu tự do (ví dụ: "19:00").
    -   Đối với các dòng tiếp theo, giá trị trong ô "Thời gian" phải được tự động tính toán và hiển thị (ở dạng chỉ đọc - disabled).
    -   **Công thức tính:** `Thời gian (dòng N) = Thời gian (dòng N-1) + Báo hiệu thời gian (dòng N-1)`.
    -   Khi giá trị "Báo hiệu thời gian" của một dòng thay đổi, "Thời gian" của tất cả các dòng phía dưới phải được tính toán lại ngay lập tức.
    -   Khi một dòng được thêm, xóa, hoặc di chuyển (sẽ thực hiện ở giai đoạn sau), chuỗi thời gian phải được cập nhật lại tương ứng.
-   **FR3: Nhập liệu:**
    -   Người dùng phải có thể nhập liệu vào các ô "Chương trình", "Báo hiệu thời gian", và "Người đảm nhận" trên tất cả các dòng.
    -   Ô "Báo hiệu thời gian" chỉ chấp nhận giá trị số (nguyên, dương).

## 3. Yêu cầu phi chức năng (Non-functional Requirements)

-   **NFR1: Performance:** Các thao tác thêm, xóa, và tính toán lại thời gian phải diễn ra mượt mà, không gây treo hoặc lag giao diện, ngay cả khi có nhiều dòng trong timeline (ví dụ: 30-40 dòng).
-   **NFR2: Usability:** Các icon chức năng phải dễ nhận biết và vị trí xuất hiện phải thuận tiện cho người dùng.
-   **NFR3: Code Maintainability:** Logic tính toán thời gian và quản lý state của timeline phải được đóng gói gọn gàng, dễ hiểu và dễ bảo trì.

## 4. Hạng mục ngoài phạm vi (Out of Scope)

-   Lưu trạng thái vào Local Storage.
-   Chức năng kéo-thả để sắp xếp lại các dòng.
-   Chức năng in ấn và làm mới toàn bộ form.
-   Chức năng bôi đậm văn bản.

## 5. Tiêu chí chấp nhận (Acceptance Criteria)

-   Người dùng có thể thêm, xóa, và sao chép các dòng trong bảng timeline thành công.
-   Thời gian của các dòng được tự động tính toán lại một cách chính xác mỗi khi có sự thay đổi về thời gian bắt đầu, thời lượng, hoặc cấu trúc dòng.
-   Giao diện phản hồi nhanh chóng với các hành động của người dùng.
-   Logic nghiệp vụ được triển khai đúng như mô tả trong yêu cầu chức năng.
