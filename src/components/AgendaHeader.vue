<template>
	<header class="agenda-header">
		<div class="row align-items-center mb-3">
			<div class="col-2">
				<img
					src="../assets/images/toastmasters-logo.png"
					alt="Toastmasters International Logo"
					class="img-fluid"
				/>
			</div>
			<div class="col-8 text-center middle">
				<h3 class="mb-1">Hanoi Toastmasters</h3>
				<h3 class="d-inline-block">
					<span>Sinh hoạt định kỳ</span>
					<input
						type="text"
						class="form-control d-inline-block meeting-no"
						v-model="headerData.meetingNumber.value"
						:class="{ 'fw-bold': headerData.meetingNumber.isBold }"
						@focus="$emit('fieldFocus', headerData.meetingNumber)"
					/>
				</h3>
				<h3 class="mb-2">SPEAKATHON</h3>
			</div>
			<div class="col-2">
				<img
					src="../assets/images/hanoi-toastmasters-logo.png"
					alt="Hanoi Toastmasters Logo"
					class="img-fluid"
				/>
			</div>
		</div>

		<table class="table table-bordered">
			<thead>
				<tr>
					<th class="w-25 text-center header-cell">Thông tin chung</th>
					<th class="w-25 text-center header-cell">Từ của ngày</th>
					<th class="w-25 text-center header-cell">Giá trị</th>
					<th class="w-25 text-center header-cell">Sứ mệnh</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>
						<AutoResizingTextarea
							v-model="headerData.generalInfo.value"
							:class="{ 'fw-bold': headerData.generalInfo.isBold }"
							@focus="$emit('fieldFocus', headerData.generalInfo)"
						/>
					</td>
					<td>
						<AutoResizingTextarea
							v-model="headerData.wordOfTheDay.value"
							:class="{ 'fw-bold': headerData.wordOfTheDay.isBold }"
							@focus="$emit('fieldFocus', headerData.wordOfTheDay)"
						/>
					</td>
					<td>Tôn trọng - Chính trực - Phục vụ - Ưu tú</td>
					<td>
						CLB Toastmasters đầu tiên sử dụng 100% tiếng Việt với mục đích rèn luyện kỹ năng giao tiếp và
						lãnh đạo.
					</td>
				</tr>
			</tbody>
		</table>
	</header>
</template>

<script setup>
import AutoResizingTextarea from "./AutoResizingTextarea.vue";

defineProps({
	headerData: Object,
});
defineEmits(["fieldFocus"]);
</script>

<style scoped>
.agenda-header h2 {
	font-weight: bold;
	font-size: 1.8rem;
}
.agenda-header h3 {
	font-size: 1.5rem;
}
.fw-bold {
	font-weight: bold;
}

.middle {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.meeting-no {
	font-size: 1.5rem;
	font-weight: 500;
	width: 4rem; /* 48px / 12px */
	text-align: center;
}

.table thead th {
	background-color: #f8f9fa;
}
</style>
