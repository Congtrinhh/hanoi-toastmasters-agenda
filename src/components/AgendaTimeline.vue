<template>
	<div class="agenda-timeline">
		<table class="table table-bordered">
			<thead class="table-light">
				<tr>
					<th style="width: 15%">Thời gian</th>
					<th style="width: 45%">Chương trình</th>
					<th style="width: 15%">Báo hiệu thời gian</th>
					<th style="width: 25%">Người đảm nhận</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" class="form-control" value="6:30 PM" /></td>
					<td>
						<input type="text" class="form-control" value="Sergeant-at-Arms prepares for the meeting" />
					</td>
					<td>
						<div class="input-group">
							<input type="number" class="form-control" value="5" />
							<span class="input-group-text">phút</span>
						</div>
					</td>
					<td><input type="text" class="form-control" value="SAA" /></td>
				</tr>
				<tr>
					<td><input type="text" class="form-control" value="6:35 PM" /></td>
					<td><input type="text" class="form-control" value="President's Opening" /></td>
					<td>
						<div class="input-group">
							<input type="number" class="form-control" value="5" />
							<span class="input-group-text">phút</span>
						</div>
					</td>
					<td><input type="text" class="form-control" value="President" /></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup></script>

<style scoped>
.table {
	font-size: 0.9rem;
}
.form-control {
	border: none;
	background-color: transparent;
	width: 100%;
	padding: 0.25rem;
}
.input-group .form-control {
	border-radius: 0;
}
</style>
