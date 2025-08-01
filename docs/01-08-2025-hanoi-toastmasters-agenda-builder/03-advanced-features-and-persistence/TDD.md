# Technical Design Document (TDD) - Giai đoạn 3: Tính năng nâng cao và Lưu trữ

## 1. Tổng quan về kiến trúc

Kiến trúc chung vẫn giữ nguyên, nhưng chúng ta sẽ tích hợp thêm các thư viện và kỹ thuật mới để hỗ trợ các tính năng nâng cao.

-   **Kéo-thả:** Sử dụng một thư viện Vue chuyên dụng cho kéo-thả, ví dụ như `Vue.Draggable` (một wrapper cho thư viện `SortableJS`). Thư viện này sẽ giúp đơn giản hóa việc triển khai và đảm bảo tính ổn định.
-   **Lưu trữ:** Tận dụng `localStorage` API của trình duyệt. Logic lưu và đọc dữ liệu sẽ được đóng gói trong một Composable function, ví dụ `usePersistence.js`.
-   **Styling cho In ấn:** Sử dụng CSS media queries (`@media print`) để định nghĩa các style riêng biệt khi in, giúp ẩn các thành phần không cần thiết và tối ưu hóa layout cho giấy.

## 2. Đặc tả API Endpoints

-   Không áp dụng.

## 3. Thay đổi Schema cơ sở dữ liệu

-   Không áp dụng.

## 4. Cấu trúc Component và Dữ liệu

### 4.1. Cấu trúc dữ liệu

Cấu trúc dữ liệu cần được mở rộng để lưu thêm trạng thái in đậm.

```javascript
// Cập nhật state trong AgendaSheet.vue
const appState = ref({
	headerData: {
		meetingNumber: { value: "123", isBold: false },
		generalInfo: { value: "...", isBold: false },
		wordOfTheDay: { value: "...", isBold: false },
		// ... các trường khác trong header
	},
	timelineRows: [
		{
			id: 1,
			startTime: "19:00",
			program: { value: "Chào mừng", isBold: true },
			duration: { value: 10, isBold: false }, // Giữ isBold cho nhất quán, dù không dùng
			assignee: { value: "Chủ tịch", isBold: false },
		},
	],
});
```

-   Mỗi trường dữ liệu có thể nhập liệu sẽ là một object chứa `value` và `isBold`.
-   Toàn bộ object `appState` này sẽ được serialize thành JSON và lưu vào Local Storage.

### 4.2. Cập nhật Component

-   **`AgendaSheet.vue`**:
    -   **Trách nhiệm:** Quản lý `appState` tổng. Tích hợp logic từ `usePersistence.js`.
    -   **Logic:**
        -   Sử dụng `watch` với `{ deep: true }` trên `appState` để tự động gọi hàm `saveState` mỗi khi có thay đổi.
        -   Khi component được mounted (`onMounted`), gọi hàm `loadState` để khôi phục dữ liệu.
        -   Triển khai các hàm `handlePrint()`, `handleReset()`.
-   **`AgendaTimeline.vue`**:
    -   **Trách nhiệm:** Tích hợp thư viện kéo-thả.
    -   **Logic:**
        -   Sử dụng component `<draggable>` (từ `Vue.Draggable`) để bọc quanh các `TimelineRow`.
        -   Liên kết `v-model` của `<draggable>` với mảng `timelineRows` trong `appState`.
        -   Khi sự kiện kéo-thả kết thúc, mảng `timelineRows` sẽ tự động được cập nhật thứ tự, kích hoạt `watch` để tính toán lại thời gian và lưu vào Local Storage.
-   **`TimelineRow.vue` & các ô input khác**:
    -   **Trách nhiệm:** Hiển thị icon kéo-thả. Áp dụng style in đậm.
    -   **Logic:**
        -   Thêm một icon "drag handle" vào mỗi dòng.
        -   Sử dụng binding động cho class (`:class="{ 'font-bold': field.isBold }"`) và `v-model` sẽ trỏ đến `field.value`.
-   **`ActionToolbar.vue`**:
    -   **Trách nhiệm:** Xử lý logic cho nút "Bôi đậm".
    -   **Logic:**
        -   Cần một cơ chế để biết ô input nào đang được focus. Có thể dùng một state toàn cục đơn giản hoặc event bus.
        -   Khi nút "Bôi đậm" được nhấn, nó sẽ thay đổi giá trị `isBold` của trường đang được focus trong `appState`.

## 5. Kế hoạch triển khai kỹ thuật

1.  **Tích hợp Kéo-thả:**
    -   Cài đặt thư viện: `npm install vuedraggable@next`.
    -   Import `draggable` component trong `AgendaTimeline.vue`.
    -   Bọc `v-for` của `TimelineRow` trong component `<draggable>`.
    -   Cấu hình các props cần thiết cho draggable, như `handle` để chỉ định icon nào dùng để kéo.
2.  **Triển khai Lưu trữ (Persistence):**
    -   Tạo file `src/composables/usePersistence.js`.
    -   Trong `usePersistence.js`, tạo hàm `saveState(state)` để `JSON.stringify` và lưu vào `localStorage.setItem('agendaState', ...)`.
    -   Tạo hàm `loadState()` để `localStorage.getItem('agendaState')`, `JSON.parse`, và trả về dữ liệu. Xử lý trường hợp không có dữ liệu.
    -   Trong `AgendaSheet.vue`, import và sử dụng composable này.
3.  **Triển khai In ấn:**
    -   Tạo một file CSS riêng, ví dụ `src/assets/print.css`.
    -   Trong `print.css`, sử dụng `@media print` để định nghĩa các style.
        -   `body * { visibility: hidden; }`
        -   `.a4-sheet, .a4-sheet * { visibility: visible; }`
        -   `.no-print { display: none !important; }` (Thêm class này vào các nút, icon, toolbar).
    -   Trong `AgendaSheet.vue`, hàm `handlePrint()` sẽ gọi `window.print()`.
4.  **Triển khai Làm mới và Bôi đậm:**
    -   **Làm mới:** Hàm `handleReset()` trong `AgendaSheet.vue` sẽ hiển thị `window.confirm()`, nếu OK thì reset `appState` về giá trị mặc định ban đầu và xóa item trong Local Storage.
    -   **Bôi đậm:**
        -   Trong `AgendaSheet.vue`, tạo một `ref` `activeField = ref(null)`.
        -   Trên mỗi ô input, thêm sự kiện `@focus="activeField = appState.path.to.field"`.
        -   Trong `ActionToolbar.vue`, khi nút "Bôi đậm" được nhấn, nó sẽ phát một event.
        -   `AgendaSheet.vue` lắng nghe event này và thay đổi `activeField.value.isBold = !activeField.value.isBold`.
