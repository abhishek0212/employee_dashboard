<template>
	<div class="accordion empl-list" id="accordionExample">
		<table class="table table-hover">
			<thead>
				<tr>
					<th></th>
					<th>ID : <img v-show="sortBy == 'id'" src='../assets/upArrow.svg' class="svg-bg image-small"></th>
					<th>Name : <img v-show="sortBy == 'name'" src='../assets/upArrow.svg' class="svg-bg image-small"></th>
					<th>Position :</th>
					<th>Department : <img v-show="sortBy == 'department'" src='../assets/upArrow.svg' class="svg-bg image-small"></th>
					<th>Email : <img v-show="sortBy == 'email'" src='../assets/upArrow.svg' class="svg-bg image-small"></th>
					<th>Experience : <img v-show="sortBy == 'createdAt'" src='../assets/upArrow.svg' class="svg-bg image-small"></th>
					<th>Status :</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="employees === null">No record!</tr>
				<template else v-for="(employee,i) in employees" :key="i">
					<tr class="accordion-item" data-bs-toggle="collapse" :data-bs-target="'#collapse_'+i" aria-expanded="true" :aria-controls="'collapse_'+i" @click="getEmployee(employee.id)">
						<td><input class="form-check-input" type="checkbox" :value="i" :id="'check_'+i" v-model="checked"></td>
						<td >
							<span type="button" class="light-blue me-1" >&#8964;</span>
							<span class="ms-1 light-grey">{{employee.id}}</span>
						</td>
						<td class="d-flex">
							<profile-picture :imageUrl="employee.avatar" :showStatus="false"/>
							<span class="p-1 light-grey">{{employee.name}}</span>
						</td>
						<td>-</td> <!-- node not found -->
						<td>{{getDepartment(employee.department)}}</td>
						<td>{{employee.email}}</td>
						<td>{{getExperience(employee.createdAt)}}</td>
						<td>-</td>
						<td>&#8942;</td>
					</tr>
					<tr :id="'collapse_'+i" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
						<td class="accordion-body" colspan="9">
							<dir class="d-flex justify-content-around">
								<div class="text-left">
									<div>Office</div>
									<!-- node not found -->
									<div class="light-grey">{{employee.country}}</div>
								</div>
								<div class="text-left">
									<div>Subordinates</div>
									<!-- node not found -->
									<div class="light-grey">-</div>
								</div>
								<div class="text-left">
									<div>Birthday</div>
									<div class="light-grey">{{getBirthday(employee.birthday)}}</div>
								</div>
								<div class="text-left">
									<div>Contact</div>
									<div class="light-grey">{{employee.phone}}</div>
								</div>
							</dir>
							<a v-show="! showCheckin[employee.id]" type="button" class="mt-2 m-auto" @click="showCheckins(employee.id)">Show checkin</a>
							<a  v-show="showCheckin[employee.id]" type="button" class="mt-2 m-auto" @click="hideCheckins(employee.id)">Hide checkin</a>
							<checkin-list v-if="showCheckin[employee.id]" :checkins="checkins[employee.id] ? checkins[employee.id] : []" @getChekin="getChekin"/>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script>
import CheckinList from './CheckinList.vue';
import ProfilePicture from './ProfilePicture.vue';
export default {
  components: { ProfilePicture , CheckinList},
	name: "EmployeeList",
	props: {
		employees: {
			Type: Array,
			require: true
		},
		checkedItems: {
			Type: Array,
			require: true
		},
		checkins: {
			Type: Array,
			require: true
		},
		sortBy: {
			Type: String,
			default: ""
		}
	},
	data() {
		return {
			checked: [],
			showCheckin: [],
			checkinsData: []
		}
	},
	watch: {
		checkedItems(newValue) {
			this.checked = newValue
		},
		checked(newValue) {
			this.$emit('updateCheckedItem', newValue)
		}
	},
	methods: {
		getExperience(date) {
			const year = new Date().getYear() - new Date(date).getYear();
			return year > 1 ? year + " years" :  year + " year"
		},
		getBirthday(date) {
			return new Date(date).getDate() +" "+ this.$constant.MONTHS[new Date(date).getMonth()]
		},
		getEmployee(id) {
			this.$emit("getEmployee", id)
		},
		showCheckins(id) {
			this.showCheckin[id] = true
			this.$emit("getChekins", id)
		},
		getDepartment(department) {
			const departments = []
			for(let dep of department) {
				departments.push(dep)
			}
			return departments.join(', ');
		},
		hideCheckins(id) {
			this.showCheckin[id] = false
		},
		getCheckins(id) {
			return this.checkinsData[id]
		},
		getChekin(employeeId, id) {
			this.$emit("getChekin", employeeId, id)
		}
	}
}
</script>

<style lang="scss" scoped>
.empl-list {
	table {
		td {
			color: rgb(98 98 98);
			&:hover {
				color: rgb(98 98 98);
			}
		}
		th {
			text-align: left;
		}
	}
	.image-small {
		width: 15px;
	}
	.text-left {
		text-align: left;
		div {
			font-size: 14px;
		}
	}
	.light-grey {
		color: rgb(98 98 98);
	}
}

</style>