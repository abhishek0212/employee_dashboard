<template>
	<header class="d-flex justify-content-between m-1 p-1">
		<h4 class="ms-4 mb-0">Employees</h4>
		<div class="d-flex">
			<img src='../assets/messageIcon.svg' class="px-1 me-1 svg-bg">
			<img src='../assets/alarm.svg' class="px-1 me-2 svg-bg">
			<ProfilePicture imageUrl="http://placeimg.com/640/480" classes="d-flex" :showStatus="false"/>
			<div type="button" class="light-blue" >&#8964;</div>
		</div>
	</header>
</template>

<script>
import ProfilePicture from "./ProfilePicture.vue"
export default {
	name: 'Navbar',
	components: {
		ProfilePicture
	}
}
</script>

<style scoped lang="scss">
header {
	.svg-bg {
		background-color:rgb(255, 255, 255);
		height: 30px;
		width: 30px;
	}
	button {
		padding: 0.1rem 0.5rem;
	}
	.light-blue {
		color: #6499dc;
	}
}
</style>
