<template>
	<div>
		<div class="d-flex justify-content-between mb-3 mt-3">
			<div class="search ">
				<img src='../assets/searchIcon.svg' class="svg-bg">
				<input type="text" class="form-control" aria-label="search-input" aria-describedby="input-search" @input="search()" v-model="searchText" placeholder="Search">
			</div>
			<div type="button" class="txt-sm me-1 mt-1 light-blue">+ Add Employee</div>
		</div>
		<div class="d-flex justify-content-between">
			<div class="d-flex">
				<input class="form-check-input me-1 m-auto" type="checkbox" v-model="selectAllCheckboxEnable" onclick="return false" /><span :class="['ms-1 mx-4 m-auto txt-sm', checkedItems.length ? 'fw-bold': '']">{{checkedItems.length}} Selected</span>
				<div type="button" class="txt-sm mx-4 m-auto" @click="selectAll()">Select All</div>
				<div v-for="(option, index) in options" :key="index" class="d-flex mx-4">
					<img :src="option.icon" class="svg-bg image-small">
					<div type="button" class="txt-sm ms-1 m-auto">{{option.name}}</div>
				</div>
			</div>
			<div class="d-flex">
				<div class="d-flex me-3">
					<img src='../assets/filter.svg' class="svg-bg image-small">
					<div type="button" class="txt-sm ms-1 m-auto" @click="filter()" data-bs-toggle="modal" data-bs-target="#filter-madal">Filter</div>
					<!-- Note: Filter not clear to me -->
				</div>
				<div class="d-flex me-4">
					<img src='../assets/sortDown.svg' class="svg-bg image-small">
					<div type="button" class="txt-sm ms-1 m-auto" @click="sort()">Sort by</div>
				</div>
				<select class="form-select form-select-sm me-1" aria-label="select-column" @change="onChange($event)" v-model="selectedColumn">
					<option v-for="(column, index) in $constant.COLUMNS" :key="index" :value="column">{{index}}</option>
				</select>
			</div>
		</div>
		<div>
			<div class="modal fade" id="filter-madal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Filter</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<input class="form-check-input m-2" type="checkbox" value="a" v-model="filterData"/><span>A</span>
						<input class="form-check-input m-2" type="checkbox" value="b" v-model="filterData"/><span>B</span>
						<input class="form-check-input m-2" type="checkbox" value="c" v-model="filterData"/><span>C</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" @click="filterList">Go</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "EmployeeHeader",
	props: {
		checkedItems: {
			Type: Array,
			require: true
		}
	},
	data() {
		return {
			selectedColumn: "createdAt",
			selectAllFlag: false,
			sortAscFlag: true,
			selectAllCheckboxEnable: false,
			searchText: "",
			filterData: [],
			options: [
				{
					name: "Share",
					icon: "/src/assets/shareIcon.svg"
				},
				{
					name: "Edit",
					icon: "/src/assets/editIcon.svg"
				},
				{
					name: "Delete",
					icon: "/src/assets/deleteIcon.svg"
				}
			]
		}
	},
	watch: {
		checkedItems(newValue) {
			this.selectAllCheckboxEnable = newValue.length ? true : false
		}
	},
	methods: {
		selectAll() {
			this.selectAllFlag = ! this.selectAllFlag
			this.$emit('selectAll', this.selectAllFlag)
		},
		filter() {
			this.$emit('openFilterModal')
		},
		filterList() {
			let filterColumn = "department"
			this.$emit('openFilterModal', filterColumn, this.filterData)
		},
		sort() {
			if(this.selectedColumn == "") {
				alert("Please select culumn")
				return;
			}
			const order = this.sortAscFlag ? "asc" : "desc"
			this.sortAscFlag = ! this.sortAscFlag
			this.$emit('sortList', this.selectedColumn, order)
		},
		onChange() {
			this.sortAscFlag = true
		},
		search() {
			this.$emit('searchList', this.searchText)
		}
	},
}
</script>

<style lang="scss" scoped>
.input-group-sm {
	.input-group-text {
		padding: 0 !important;
	}
}
.image-small {
	width: 15px;
}
.form-select {
	width: auto;
}
.txt-sm {
	font-size: 0.875rem;
}
.search {
    position: relative;
	width: 30vw;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1);
	.form-control {
		height: 45px;
		text-indent: 25px;
		border: 2px solid #d6d4d4;
		& :focus {
			box-shadow: none;
   	 		border: none
		}
	}
	img {
		position: absolute;
		top: 8px;
		left: 5px
	}
}

// .search input {
//     height: 60px;
//     text-indent: 25px;
//     border: 2px solid #d6d4d4
// }

// .search input:focus {
//     box-shadow: none;
//     border: 2px solid blue
// }
// .search .fa-search {
//     position: absolute;
//     top: 20px;
//     left: 16px
// }

</style>