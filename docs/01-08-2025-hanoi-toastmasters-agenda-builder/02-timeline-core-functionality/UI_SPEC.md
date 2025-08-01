# User Interface Specification - Giai đoạn 2: Chức năng cốt lõi của Timeline

## 1. Cấu trúc Layout chi tiết

Cấu trúc layout tổng thể không thay đổi so với Giai đoạn 1. Các thay đổi chủ yếu tập trung vào việc làm cho bảng timeline trở nên động và tương tác được. Component `AgendaTimeline.vue` sẽ được render động bằng component `TimelineRow.vue`.

## 2. Đặc tả Component

### 2.1. TimelineRow.vue

Đây là component trung tâm của giai đoạn này.

-   **Mô tả:** Một dòng (`<tr>`) trong bảng timeline.
-   **Trạng thái Hover:**
    -   Khi người dùng di chuột vào khu vực của dòng, một thanh công cụ nhỏ chứa 3 icon sẽ xuất hiện ở ngay dưới chân dòng đó.
    -   **Icon "Thêm":** Icon dấu cộng (+).
    -   **Icon "Xóa":** Icon thùng rác.
    -   **Icon "Sao chép":** Icon hai tờ giấy chồng lên nhau.
    -   Khi chuột rời khỏi, thanh công cụ này sẽ biến mất.
-   **Trạng thái Input:**
    -   **Ô "Thời gian":**
        -   Đối với dòng đầu tiên (`isFirst` là true), đây là một ô `<input type="text">` cho phép chỉnh sửa.
        -   Đối với các dòng còn lại, đây là một ô `<input type="text">` ở trạng thái `disabled`, hiển thị thời gian đã được tính toán.
    -   **Các ô khác ("Chương trình", "Báo hiệu thời gian", "Người đảm nhận"):** Là các ô `<input>` cho phép người dùng nhập liệu.

## 3. Các yếu tố tương tác (Interactive Elements)

### 3.1. Thêm dòng

-   **Hành động:** Người dùng di chuột vào một dòng và nhấp vào icon "Thêm".
-   **Phản hồi hệ thống:**
    -   Một dòng mới, trống hoàn toàn, ngay lập tức xuất hiện bên dưới dòng vừa được tương tác.
    -   Hệ thống tính toán lại thời gian cho tất cả các dòng từ dòng mới được chèn trở đi.
    -   Focus của người dùng nên được tự động chuyển đến ô "Chương trình" của dòng mới được tạo.

### 3.2. Xóa dòng

-   **Hành động:** Người dùng di chuột vào một dòng và nhấp vào icon "Xóa".
-   **Phản hồi hệ thống:**
    -   Dòng đó ngay lập tức bị xóa khỏi bảng.
    -   Hệ thống tính toán lại thời gian cho tất cả các dòng bên dưới dòng vừa bị xóa.

### 3.3. Sao chép dòng

-   **Hành động:** Người dùng di chuột vào một dòng và nhấp vào icon "Sao chép".
-   **Phản hồi hệ thống:**
    -   Một dòng mới ngay lập tức xuất hiện bên dưới dòng vừa được tương tác.
    -   Dữ liệu từ các ô "Chương trình", "Báo hiệu thời gian", "Người đảm nhận" của dòng gốc được sao chép vào dòng mới.
    -   Hệ thống tính toán lại thời gian cho tất cả các dòng từ dòng mới được chèn trở đi.

### 3.4. Cập nhật thời gian

-   **Hành động 1:** Người dùng thay đổi giá trị trong ô "Thời gian" của dòng đầu tiên.
-   **Phản hồi hệ thống 1:** Thời gian của tất cả các dòng bên dưới được cập nhật lại ngay lập tức.
-   **Hành động 2:** Người dùng thay đổi giá trị trong ô "Báo hiệu thời gian" của bất kỳ dòng nào.
-   **Phản hồi hệ thống 2:** Thời gian của tất cả các dòng bên dưới dòng đó được cập nhật lại ngay lập tức.

## 4. Yêu cầu về Responsive Design

-   Không thay đổi so với Giai đoạn 1.

## 5. Luồng trải nghiệm người dùng (User Experience Flow)

1.  Người dùng mở trang web, thấy bảng timeline với dữ liệu ban đầu.
2.  Người dùng chỉnh sửa thời gian bắt đầu ở dòng đầu tiên. Toàn bộ timeline được cập nhật theo.
3.  Người dùng di chuột qua một dòng, thấy các nút Thêm/Xóa/Sao chép xuất hiện.
4.  Người dùng nhấn "Thêm", một dòng mới xuất hiện, timeline được cập nhật. Người dùng bắt đầu nhập liệu vào dòng mới.
5.  Người dùng nhập thời lượng cho một mục, thời gian của các mục sau đó tự động điều chỉnh.
6.  Người dùng nhấn "Xóa" trên một dòng không cần thiết, dòng đó biến mất và timeline được cập nhật.
7.  Người dùng nhấn "Sao chép" trên một dòng, một dòng tương tự được tạo ra, giúp tiết kiệm thời gian nhập liệu.
