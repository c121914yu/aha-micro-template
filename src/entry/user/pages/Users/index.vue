<template>
	<div 	class="users">
		<!-- 搜索栏 -->
		<header>
			<h2>用户列表</h2>
			<el-input
				style="width: 500px;"
				placeholder="输入搜索内容"
				size="small"
				v-model="searchText"
			>
				<el-select
					style="width: 110px;"
					slot="prepend"
					placeholder="选择搜索类型"
					v-model="searchType"
				>
					<el-option
						v-for="item in searchTypes"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-input>
			<el-button
				class="btn search-btn"
				icon="el-icon-search"
				type="primary"
				size="small"
				@click="getUserData(1)"
			/>
			<el-button
				class="btn reset-btn"
				icon="el-icon-refresh-left"
				size="small"
				@click="reset"
			/>
		</header>
		<!-- 表单 -->
		<div class="table-container">
			<el-table
				ref="table"
				stripe
				:data="users"
				@sort-change="sortChange"
				@filter-change="fileterChange"
			>
				<el-table-column
					label="用户ID"
					width="110px"
					prop="id"
				/>
				<el-table-column
					label="创建时间"
					width="110px"
					sortable
					column-key="date"
					prop="createdTime"
					align="center"
				/>
				<el-table-column
					label="昵称"
					prop="name"
					align="center"
				/>
				<el-table-column
					label="实名认证"
					align="center"
					prop="registration"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.registration"
							class="success el-icon-success"
						/>
						<i
							v-else
							class="none el-icon-error"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="绑定手机号"
					align="center"
					prop="phone"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.phone"
							class="success el-icon-success"
						/>
						<i
							v-else
							class="none el-icon-error"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="签署合同"
					align="center"
					:filters="[{ text: '已签署', value: true }, { text: '未签署', value: false }]"
					:filter-multiple="false"
					filter-placement="bottom-end"
					:filter-method="(value, user) => user.signedContract === value"
					column-key="signedContract"
					prop="signedContract"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.signedContract"
							class="success el-icon-success"
						/>
						<i
							v-else
							class="none el-icon-error"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="虚拟货币"
					align="center"
					sortable
					:sort-orders="['descending', null]"
					column-key="ahaPoint"
				>
					<template slot-scope="scope">
						<div>{{scope.row.ahaCredit}}Aha点</div>
						<div>{{scope.row.ahaPoint}}Aha点</div>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="$pushTo('User', {id: scope.row.id})"
						>
							编辑
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页器 -->
			<div class="pagination">
				<el-pagination
					background
					layout="prev, pager, next"
					:page-size="pageSize"
					:total="total"
					:current-page="pageNum"
					@current-change="getUserData"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { users as mockUsers } from '@user/constants/mock'
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'User'
    },
  },
  data() {
    return {
      searchTypes: [
        { label: '手机号', value: 'phone' },
        { label: '昵称', value: 'nickname' },
        { label: '真实姓名', value: 'trueNameLike' },
      ],
      searchType: 'phone', // 搜索类型
      loading: true,
      searchText: '', // 搜索内容
      sortBy: null, // 排序字段
      orderBy: null, // 排序方式，顺序和逆序
      signedContract: null, // 签署合同情况
      pageNum: 1,
      pageSize: 10,
      total: 100,
      users: mockUsers
    }
  },
  methods: {
    /**
		 * 获取用户信息
		 * @param {Number} pageNum
		 */
    async getUserData(pageNum = this.pageNum) {
      this.$loading()
      const data = {
        pageNum,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        signedContract: this.signedContract
      }

      if (this.searchText) {
        data[ this.searchType ] = this.searchText
      }
      try {
        /* 接口请求 */
        const res = {
          pageNum,
          pageSize: this.pageSize,
          total: 100,
          data: []
        }

        /* 格式化一些内容 */
        res.data.pageData.map(item => {
          item.name = item.nickname
          item.createdTime = moment(item.createdTime).format('YYYY/MM/DD HH:mm:ss')
          return item
        })
        this.pageNum = pageNum
        this.total = res.data.total
        console.log(this.users)
      } catch (err) { err }
      this.$hideLoading()
    },
    /**
		 * 重置所有搜索
		 */
    reset() {
      this.searchText = ''
      this.sortBy = null
      this.orderBy = null
      this.signedContract = null
      this.$refs.table.clearSort()
      this.$refs.table.clearFilter()
      this.getUserData(1)
    },
    /**
		 * 排序发送改变
		 */
    sortChange(column) {
      /* 判断是否有排序，无排序则null */
      this.sortBy = column.order ? column.prop : null
      if (column.order) {
        this.orderBy = column.order === 'descending' ? 'desc' : 'asc'
      } else {
        this.orderBy = column.order
      }
      this.getUserData(1)
    },
    /**
		 * 筛选改变
		 */
    fileterChange(filters) {
      for (const key in filters) {
        const res = filters[ key ]

        if (res.length === 0) {
          this[ key ] = null
        } else {
          this[ key ] = res[ 0 ]
        }
      }
      this.getUserData(1)
    },
  }
}
</script>

<style lang="scss" scoped>
.users {
  padding: 20px;
  font-size: $sSmall;

  header {
    h2 {
      margin-bottom: 10px;
      color: $blue;
    }

    .btn {
      margin-left: 10px;
    }
  }

  .el-table {
    i {
      font-size: $slarge;

      &.success {
        color: $green;
      }

      &.none {
        color: $dark3;
      }
    }
  }

  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
