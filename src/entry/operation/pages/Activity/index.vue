<template>
	<div class="activities">
		<h2>活动管理</h2>
		<el-button
			class="add-btn"
			icon="el-icon-circle-plus-outline"
			type="primary"
			size="small"
			@click="editActivity = {}"
		>
			发布新活动
		</el-button>
		<div class="table-container">
			<el-table
				ref="table"
				style="width: 100%;"
				stripe
				:data="arr_activities"
			>
				<el-table-column
					label="ID"
					width="100px"
					prop="id"
				/>
				<el-table-column
					label="创建时间"
					sortable
					width="105px"
					column-key="date"
					prop="createTime"
					align="center"
				/>
				<el-table-column
					label="有效时间"
					width="170px"
					align="center"
				>
					<template slot-scope="scope">
						<div>{{scope.row.startTime}}</div>
						|
						<div>{{scope.row.endTime}}</div>
					</template>
				</el-table-column>
				<el-table-column
					label="活动名"
					prop="title"
					align="center"
				/>
				<el-table-column
					label="活动介绍"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="introMsg=scope.row.intro"
						>
							查看活动介绍
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="可生成兑换码数量"
					align="center"
				>
					<template slot-scope="scope">
						{{scope.row.codeSum - scope.row.unUse}}
					</template>
				</el-table-column>
				<el-table-column
					label="价值"
					align="center"
				>
					<template slot-scope="scope">
						<div>{{scope.row.exchangeAhaCredit}}Aha币</div>
						<div>{{scope.row.exchangeAhaPoint}}Aha点</div>
					</template>
				</el-table-column>
				<el-table-column
					class="btns"
					label="操作"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="getCode(scope.row)"
						>
							生成兑换码
						</el-button>
						<el-button
							size="mini"
							type="danger"
							@click="removeActivity(scope.row)"
						>
							Delete
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<IntroCard
			v-if="introMsg"
			title="活动介绍"
			:html="introMsg"
			@close="introMsg=''"
		/>
		<EditActivity
			v-if="editActivity"
			:activityInfo="editActivity"
			@close="editActivity=null"
			@finish="getActivitiesInfo(1)"
		/>
		<!-- 分页器 -->
		<div class="pagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="pageSize"
				:total="total"
				:current-page="pageNum"
				@current-change="getActivitiesInfo"
			/>
		</div>
	</div>
</template>

<script>
import { activities as mockActivity } from '@operation/constants/mock'
import EditActivity from './components/EditActivity.vue'
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Activity'
    },
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      total: 0,
      is_showAll: false,
      arr_activities: [],
      introMsg: '',
      editActivity: null
    }
  },
  components: {
    EditActivity
  },
  created() {
    this.getActivitiesInfo(1)
  },
  methods: {
    /* 获取活动信息 */
    async getActivitiesInfo(pageNum = this.pageNum) {
      this.editActivity = null
      const res = { data: mockActivity }

      this.arr_activities = res.data.pageData.map(item => {
        item.createTime = moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        item.startTime = moment(item.startTime).format('YYYY/MM/DD HH:mm:ss')
        item.endTime = moment(item.endTime).format('YYYY/MM/DD HH:mm:ss')
        item.unUse = 0
        return item

      })
      this.pageNum = pageNum
      this.total = res.data.total
      console.log(res.data.pageData)

    },
    /* 删除活动 */
    removeActivity() {
      this.$confirm('确认删除该活动?', () => {
        this.$warn('删除成功')
        this.getActivitiesInfo(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activities {
  position: relative;
  padding: 20px;
  font-size: $sSmall;

  h2 {
    margin-bottom: 10px;
    color: $blue;
  }

  .add-btn {
    position: absolute;
    top: 20px;
    right: 10px;
  }

  .el-table {
    .el-button {
      display: block;
      margin: 5px auto;
    }

    .show-remind {
      margin-top: 10px;
      color: $dark3;
    }
  }

  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
