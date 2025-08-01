# User Interface Specification - Giai đoạn 1: Setup và Layout

## 1. Cấu trúc Layout chi tiết

Giao diện người dùng sẽ được chứa trong một `div` chính có class là `a4-sheet`, được căn giữa màn hình.

```
+------------------------------------------------------+
| Màn hình trình duyệt                                  |
|                                                      |
|       +----------------------------------------+     |
|       |           ActionToolbar.vue            |     |
|       +----------------------------------------+     |
|       |                                        |     |
|       |             AgendaSheet.vue            |     |
|       |    +-------------------------------+   |     |
|       |    |       AgendaHeader.vue        |   |     |
|       |    +-------------------------------+   |     |
|       |    |      AgendaTimeline.vue       |   |     |
|       |    | (dữ liệu tĩnh)                 |   |     |
|       |    +-------------------------------+   |     |
|       |    |       AgendaFooter.vue        |   |     |
|       |    +-------------------------------+   |     |
|       |                                        |     |
|       |    <---- Đường ngắt trang ---->      |     |
|       |                                        |     |
|       +----------------------------------------+     |
|                                                      |
+------------------------------------------------------+
```

-   **`ActionToolbar.vue`**: Nằm cố định ở phía trên cùng của trang, bên ngoài `AgendaSheet.vue`.
-   **`AgendaSheet.vue`**: Là một `div` có `width: 210mm`, `min-height: 297mm`, `padding`, `margin`, và `box-shadow` để tạo hiệu ứng như một tờ giấy thật.
-   **Đường ngắt trang**: Sẽ là một `div` trống với class `.page-break` có `border-top` dạng nét đứt, được đặt bên trong `AgendaSheet.vue` tại vị trí tương ứng với cuối trang A4 đầu tiên.

## 2. Đặc tả Component

### 2.1. ActionToolbar.vue

-   **Mô tả:** Một thanh ngang chứa các nút hành động chính.
-   **Thành phần:**
    -   **Nút "Bôi đậm":** Một thẻ `<button>` với icon in đậm.
    -   **Nút "In":** Một thẻ `<button>` với text "In".
    -   **Nút "Làm mới nội dung":** Một thẻ `<button>` với text "Làm mới nội dung".
-   **Trạng thái:** Tất cả các nút đều ở trạng thái tĩnh (không có `hover` effect đặc biệt ngoài mặc định của Bootstrap, không có logic `onClick`).

### 2.2. AgendaHeader.vue

-   **Mô tả:** Phần đầu của kịch bản, chứa thông tin chung.
-   **Layout:** Sử dụng hệ thống grid của Bootstrap (`row`, `col`) để sắp xếp các phần tử.
    -   **Hàng 1:**
        -   Cột trái: Logo Toastmasters International (`<img>`).
        -   Cột giữa: Text "Hanoi Toastmasters", "SPEAKATHON", và một ô `<input type="text">` tĩnh cho số buổi sinh hoạt.
        -   Cột phải: Logo Hanoi Toastmasters (`<img>`).
    -   **Hàng 2:**
        -   Một bảng (`<table>`) với 4 cột.
        -   **Cột "Thông tin chung":** Chứa một `<textarea>` tĩnh.
        -   **Cột "Từ của ngày":** Chứa một `<input type="text">` tĩnh.
        -   **Cột "Giá trị" & "Sứ mệnh":** Chứa văn bản tĩnh.
-   **Styling:** Font chữ, kích thước, và khoảng cách sẽ được điều chỉnh bằng CSS để khớp với mockup.

### 2.3. AgendaTimeline.vue

-   **Mô tả:** Bảng hiển thị timeline chi tiết của chương trình.
-   **Layout:** Một bảng HTML (`<table>`) với class `table` của Bootstrap.
-   **Cấu trúc bảng:**
    -   **Header (`<thead>`):** Chứa các tiêu đề cột: "Thời gian", "Chương trình", "Báo hiệu thời gian", "Người đảm nhận".
    -   **Body (`<tbody>`):** Chứa một vài dòng (`<tr>`) dữ liệu mẫu.
        -   Mỗi ô (`<td>`) trong các cột "Thời gian", "Chương trình", "Người đảm nhận" sẽ chứa một `<input type="text">` tĩnh.
        -   Ô trong cột "Báo hiệu thời gian" sẽ chứa một `<input type="number">` tĩnh, bên cạnh là text "phút".
-   **Styling:** Kẻ viền cho bảng, căn chỉnh text trong các ô.

### 2.4. AgendaFooter.vue

-   **Mô tả:** Phần chân trang, chứa mã QR.
-   **Layout:** Một `div` đơn giản.
-   **Nội dung:** Một thẻ `<img>` với `src` trỏ đến file `qr-payment-code.jpg` trong `assets`. Ảnh sẽ được căn giữa.

## 3. Các yếu tố tương tác (Interactive Elements)

-   Trong giai đoạn này, không có yếu tố tương tác nào được triển khai. Các ô input và nút bấm chỉ là các phần tử HTML tĩnh để hiển thị.

## 4. Yêu cầu về Responsive Design

-   Dự án không yêu cầu responsive cho thiết bị di động. Giao diện sẽ được tối ưu hóa cho màn hình máy tính với chiều rộng cố định.

## 5. Luồng trải nghiệm người dùng (User Experience Flow)

1.  Người dùng mở trang web.
2.  Hệ thống hiển thị một trang duy nhất có giao diện giống một tờ giấy A4.
3.  Người dùng thấy toàn bộ cấu trúc tĩnh của kịch bản, bao gồm header, bảng timeline mẫu, và footer.
4.  Người dùng thấy các nút hành động và thanh công cụ nhưng không thể tương tác với chúng.
5.  Người dùng có thể cuộn trang để xem toàn bộ nội dung nếu nó dài hơn chiều cao màn hình.
6.  Người dùng thấy một đường kẻ đứt ngang, cho biết nội dung sẽ bị ngắt sang trang mới tại điểm đó khi in.
