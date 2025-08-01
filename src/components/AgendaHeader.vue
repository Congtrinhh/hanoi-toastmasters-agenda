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
			<div class="col-8 text-center">
				<h2 class="mb-1">HANOI TOASTMASTERS</h2>
				<h3 class="mb-2">SPEAKATHON</h3>
				<div class="d-inline-block">
					<span>Meeting No.</span>
					<input type="text" class="form-control d-inline-block" style="width: 80px" />
				</div>
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
			<tbody>
				<tr>
					<td class="w-50">
						<strong>General Information / Theme of the day:</strong>
						<textarea class="form-control" rows="3"></textarea>
					</td>
					<td class="w-50">
						<div class="mb-2">
							<strong>Word of the Day:</strong>
							<input type="text" class="form-control" />
						</div>
						<div>
							<strong>Our Mission:</strong> We provide a supportive and positive learning experience in
							which members are empowered to develop communication and leadership skills, resulting in
							greater self-confidence and personal growth.
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</header>
</template>

<script setup></script>

<style scoped>
.agenda-header h2 {
	font-weight: bold;
	font-size: 1.8rem;
}
.agenda-header h3 {
	font-size: 1.5rem;
	color: #555;
}
.table {
	font-size: 0.9rem;
}
</style>
