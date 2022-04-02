<template>
	<div class="sidebar d-flex flex-column justify-content-between">
		<div class="d-flex flex-column center">
			<router-link v-for="(route, index) in sideBarRoutes" :key="index" :to="route.path" :class="['py-2 ps-3 pointer', this.$route.path == route.path ? 'active' : '']">
				<img :src="route.svg" class="svg-bg">
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	data() {
		return {
			sideBarRoutes: [
				{
					path: "/",
					svg: "/src/assets/homeicon.svg"
				},
				{
					path: "/message",
					svg: "/src/assets/inbox.svg"
				},
				{
					path: "/application",
					svg: "/src/assets/appsIcon.svg"
				},
				{
					path: "/employee",
					svg: "/src/assets/user-group-solid.svg"
				},
				{
					path: "/calendar",
					svg: "/src/assets/calendarIcon.svg"
				},
				{
					path: "/file",
					svg: "/src/assets/fileicon.svg"
				},
				{
					path: "/settings",
					svg: "/src/assets/settingsIcon.svg"
				}
			]
		}
	},
}
</script>

<style scoped lang="scss">
.sidebar {
	background-color:rgb(12, 36, 58);
	color: white;
	height:100vh;
	padding: 7px;
}
.svg-bg {
	background-color: inherit;
	width: 50%;
}
.active {
	background-color: #6499dc !important;
	border-radius: 10px;
}
</style>