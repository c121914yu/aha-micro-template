<!-- 用户反馈 -->
<template>
	<div class="feedback">
		<h2>用户反馈</h2>
		<div class="table-container">
			<el-table
				style="width: 100%;"
				stripe
				highlight-current-row
				:data="arr_feedBack"
				@filter-change="fileterChange"
			>
				<el-table-column
					width="100px"
					label="ID"
					prop="id"
					align="center"
				/>
				<el-table-column
					label="反馈时间"
					prop="time"
					align="center"
					width="105px"
				/>
				<el-table-column
					label="反馈用户"
					prop="user.nickname"
					align="center"
				/>
				<el-table-column
					label="反馈类型"
					:filters="arr_feedbackTypes"
					filter-placement="bottom-end"
					:filter-multiple="false"
					column-key="filter_type"
					prop="type"
					align="center"
				/>
				<el-table-column
					label="反馈内容"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="showIntro=scope.row.content"
						>
							查看反馈内容
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="反馈状态"
					align="center"
					:filters="[{ text: '未处理', value: 0 },{ text: '处理中', value: 1 },{ text: '已解决', value: 2 }]"
					filter-placement="bottom-end"
					:filter-multiple="false"
					column-key="filter_status"
					prop="status"
				>
					<template slot-scope="scope">
						<div v-if="scope.row.status === 0">
							<i class="status el-icon-question" />
						</div>
						<div v-else-if="scope.row.status === 1">
							<i
								style="color: #409eff;"
								class="status el-icon-time"
							/>
							<p class="deal-time"><small>{{scope.row.dealTime}}</small></p>
						</div>
						<div v-else>
							<i
								style="color: #67c23a;"
								class="status el-icon-success"
							/>
							<p class="deal-time"><small>{{scope.row.dealTime}}</small></p>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
					width="170"
				>
					<template slot-scope="scope">
						<!-- 未处理状态 -->
						<div v-if="scope.row.status === 0">
							<el-button
								type="primary"
								size="mini"
								@click="deal(scope.row)"
							>
								受理
							</el-button>
						</div>
						<!-- 处理中状态 -->
						<div v-else-if="scope.row.status === 1">
							<el-select
								class="feedback-result"
								size="mini"
								placeholder="反馈结果类型"
								v-model="scope.row.feedbackResult"
							>
								<el-option
									v-for="item in arr_feedbackResult"
									:key="item.value"
									:label="item.text"
									:value="item.value"
								/>
							</el-select>
							<el-button
								type="success"
								size="mini"
								@click="solve(scope.row)"
							>
								已解决
							</el-button>
						</div>
						<!-- 已解决状态 -->
						<div
							v-else
							style="color: $dark3;"
						>
							{{scope.row.feedbackResult}}
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="prev, pager, next"
					:page-size="pageSize"
					:total="total"
					:current-page="pageNum"
					@current-change="getFeedbackInfo"
				/>
			</div>
		</div>
		<IntroCard
			v-if="showIntro"
			title="反馈内容"
			:html="showIntro"
			@close="showIntro=''"
		/>
	</div>
</template>

<script>
import { feedbacks as mockFeedbacks } from '@user/constants/mock'

export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Feedback'
    },
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0,
      filter_type: null,
      filter_status: null,
      arr_feedBack: [],
      showIntro: '',
      arr_feedbackTypes: [
        { text: '平台BUG', value: 0 },
        { text: '平台体验修改建议', value: 1 },
        { text: '劣质项目', value: 2 },
        { text: '订单缺失/购买错误', value: 3 },
      ],
      arr_feedbackResult: [
        { text: '无效反馈', value: 0 },
        { text: '轻微问题', value: 1 },
        { text: '中等问题', value: 2 },
        { text: '严重问题', value: 3 }
      ],
    }
  },
  created() {
    this.getFeedbackInfo(1)
  },
  methods: {
    /* 获取反馈 */
    async getFeedbackInfo(pageNum = this.pageNum) {
      try {
        this.$loading()
        const res = { data: mockFeedbacks }

        this.arr_feedBack = res.data.pageData.map(feedback => {
          const type = this.arr_feedbackTypes.find(item => item.value === feedback.type)
          const feedbackResult = this.arr_feedbackResult.find(item => item.value === feedback.level)

          return {
            ...feedback,
            time: moment(feedback.time).format('YYYY/MM/DD HH:mm:ss'),
            type: type.text,
            feedbackResult: feedbackResult ? feedbackResult.text : null
          }
        })
        console.log(this.arr_feedBack)

        this.pageNum = pageNum
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
      this.$hideLoading()
    },
    /* 受理反馈，修改status为1，reply为您的问题正在处理，感谢您的反馈。 */
    deal(feedback) {
      this.$confirm('确认受理该反馈？', () => {
        this.$success('受理成功')
        this.arr_feedBack[ this.arr_feedBack.indexOf(feedback) ].status = 1
      })
    },
    /* 解决反馈问题，需要填写反馈类型，后台根据问题类型发放贡献点 */
    solve(feedback) {
      if (feedback.feedbackResult === null) {
        this.$warn('反馈结果不能为空')
        return
      }
      this.$confirm('确认解决该反馈？', () => {
        this.$success('处理成功')
        this.arr_feedBack[ this.arr_feedBack.indexOf(feedback) ].status = 2
        this.arr_feedBack[ this.arr_feedBack.indexOf(feedback) ].feedbackResult = this.arr_feedbackResult[ feedback.feedbackResult ].text
      })
    },
    /* 筛选改变 */
    fileterChange(filters) {
      for (const key in filters) {
        const res = filters[ key ]

        if (res.length === 0) { this[ key ] = null } else { this[ key ] = res[ 0 ] }
      }
      this.getFeedbackInfo(1)
    },
  }
}
</script>

<style lang="scss" >
.feedback {
  position: relative;
  padding: 20px;
  font-size: $sSmall;

  h2 {
    margin-bottom: 10px;
    color: $blue;
  }

  .feedback-time {
    white-space: pre-line;
  }

  .status {
    font-size: 20px;
  }

  .feedback-result {
    width: 130px;
    margin-bottom: 5px;
  }

  .remark {
    margin-top: 10px;
    color: $dark3;
  }

  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
