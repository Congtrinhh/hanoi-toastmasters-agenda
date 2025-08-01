# Technical Design Document (TDD) - Giai đoạn 2: Chức năng cốt lõi của Timeline

## 1. Tổng quan về kiến trúc

Trong giai đoạn này, chúng ta sẽ chuyển từ giao diện tĩnh sang một ứng dụng có trạng thái (stateful). Trọng tâm của kiến trúc sẽ là quản lý trạng thái của bảng timeline một cách hiệu quả bằng hệ thống reactivity của Vue 3.

-   **State Management:** Trạng thái của toàn bộ kịch bản, đặc biệt là mảng dữ liệu của các dòng timeline, sẽ được quản lý tập trung tại component cha (`AgendaSheet.vue`) bằng `ref` hoặc `reactive`.
-   **Logic Encapsulation:** Logic nghiệp vụ phức tạp như tính toán thời gian và xử lý các hành động trên dòng sẽ được đóng gói. Chúng ta có thể cân nhắc sử dụng một Composable function (ví dụ: `useTimeline.js`) để tách biệt logic này khỏi component, giúp mã nguồn sạch sẽ và dễ bảo trì hơn.
-   **Component Communication:** Giao tiếp giữa các component sẽ tuân theo nguyên tắc "props down, events up".
    -   `AgendaSheet.vue` truyền dữ liệu timeline xuống `AgendaTimeline.vue` qua props.
    -   `AgendaTimeline.vue` và `TimelineRow.vue` thông báo các hành động của người dùng lên component cha thông qua events.

## 2. Đặc tả API Endpoints

-   Không áp dụng.

## 3. Thay đổi Schema cơ sở dữ liệu

-   Không áp dụng.

## 4. Cấu trúc Component và Dữ liệu

### 4.1. Cấu trúc dữ liệu

Trạng thái của timeline sẽ là một mảng các object, mỗi object đại diện cho một dòng.

```javascript
// Ví dụ về state trong AgendaSheet.vue
const timelineRows = ref([
	{
		id: 1, // Unique ID cho key của v-for
		startTime: "19:00", // Chỉ có dòng đầu tiên là có thể sửa
		program: "Chào mừng và giới thiệu",
		duration: 10, // Số phút
		assignee: "Chủ tịch CLB",
	},
	// ... các dòng khác
]);
```

### 4.2. Cập nhật Component

-   **`AgendaSheet.vue`**:

    -   **Trách nhiệm:** Trở thành "source of truth", quản lý state `timelineRows`. Chứa các phương thức để xử lý việc thêm (`addRow`), xóa (`deleteRow`), và sao chép (`copyRow`) dòng.
    -   **Logic:** Sẽ chứa một `watch` hoặc `computed` property để tự động tính toán lại `startTime` cho các dòng mỗi khi `timelineRows` hoặc `duration` của một dòng thay đổi.
    -   **Props (to `AgendaTimeline.vue`):** Sẽ truyền `timelineRows` xuống.
    -   **Events (from `AgendaTimeline.vue`):** Sẽ lắng nghe các event `@add-row`, `@delete-row`, `@copy-row`.

-   **`AgendaTimeline.vue`**:

    -   **Trách nhiệm:** Hiển thị danh sách các dòng timeline. Nó không còn chứa dữ liệu tĩnh mà sẽ render các dòng dựa trên prop nhận được.
    -   **Props:** `rows` (mảng `timelineRows` từ `AgendaSheet.vue`).
    -   **Logic:** Sử dụng `v-for` để lặp qua prop `rows` và render một component `TimelineRow.vue` cho mỗi phần tử.
    -   **Events:** Bắt các event từ `TimelineRow.vue` và "chuyển tiếp" (emit) chúng lên `AgendaSheet.vue` cùng với index của dòng.

-   **`TimelineRow.vue` (Component mới)**:
    -   **Trách nhiệm:** Đại diện cho một dòng duy nhất trong bảng.
    -   **Props:** `rowData` (object chứa dữ liệu của một dòng), `index` (vị trí trong mảng), `isFirst` (boolean để xác định có phải dòng đầu tiên không).
    -   **State:** Quản lý trạng thái `isHovered` để hiển thị/ẩn các icon chức năng.
    -   **Logic:**
        -   Hiển thị dữ liệu từ `rowData`.
        -   Ô "Thời gian" sẽ bị vô hiệu hóa (`disabled`) nếu `!isFirst`.
        -   Các ô input khác sẽ được liên kết hai chiều với `rowData` bằng `v-model`.
    -   **Events:** Phát ra các event `@delete`, `@add`, `@copy` khi người dùng nhấn vào các icon tương ứng.

## 5. Kế hoạch triển khai kỹ thuật

1.  **Tái cấu trúc State:**
    -   Di chuyển dữ liệu mẫu của timeline từ `AgendaTimeline.vue` lên `AgendaSheet.vue` và đặt nó trong một `ref`.
    -   Định nghĩa cấu trúc object cho một dòng, bao gồm một `id` duy nhất.
2.  **Tạo `TimelineRow.vue`:**
    -   Tạo file `src/components/TimelineRow.vue`.
    -   Xây dựng layout HTML cho một dòng (`<tr>`) với các ô (`<td>`) và các thẻ `<input>` bên trong.
    -   Thêm các icon (Thêm, Xóa, Sao chép) và dùng `v-show` hoặc `v-if` kết hợp với state `isHovered` để điều khiển việc hiển thị.
3.  **Cập nhật `AgendaTimeline.vue`:**
    -   Xóa các dòng `<tr>` tĩnh.
    -   Thêm `v-for` trên thẻ `<tbody>` hoặc một thẻ `<template>` để render `TimelineRow.vue`, truyền props và lắng nghe events.
4.  **Triển khai Logic tính toán thời gian:**
    -   Trong `AgendaSheet.vue`, tạo một hàm `recalculateTimes()`.
    -   Sử dụng `watch` để theo dõi sự thay đổi của `timelineRows` (sử dụng `{ deep: true }`). Khi có thay đổi, gọi `recalculateTimes()`.
    -   Hàm `recalculateTimes` sẽ lặp qua mảng `timelineRows` từ phần tử thứ hai, lấy `startTime` và `duration` của dòng trước đó để tính toán `startTime` cho dòng hiện tại.
    -   Cần một hàm tiện ích để xử lý chuỗi thời gian (ví dụ: `addMinutes('19:00', 10)` trả về `'19:10'`).
5.  **Triển khai Logic Thêm/Xóa/Sao chép:**
    -   Trong `AgendaSheet.vue`, tạo các hàm `addRow(index)`, `deleteRow(index)`, `copyRow(index)`.
    -   Các hàm này sẽ thực hiện các thao tác trên mảng `timelineRows` bằng các phương thức như `splice()` và `slice()`.
    -   Kết nối các hàm này với các event được phát ra từ `AgendaTimeline.vue`.
