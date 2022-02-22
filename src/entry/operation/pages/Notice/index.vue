<template>
	<div class="notice">
		<h2>系统公告</h2>
		<el-button
			class="btn-publish"
			type="primary"
			icon="el-icon-edit"
			size="small"
			@click="is_editNotice=true"
		>
			发布系统公告
		</el-button>
		<div class="table-container">
			<el-table
				ref="table"
				stripe
				:data="arr_notice"
				:default-sort= "{prop: 'createTime', order: 'descending'}"
			>
				<el-table-column
					label="ID"
					width="100"
					prop="id"
					align="center"
				/>
				<el-table-column
					label="创建时间"
					prop="createTime"
					align="center"
				>
					<template slot-scope="scope">
						<div
							class="time"
							v-html="scope.row.createTime"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="开始时间"
					prop="puttingStartTime"
					align="center"
				>
					<template slot-scope="scope">
						<div
							class="time"
							v-html="scope.row.puttingStartTime"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="结束时间"
					prop="puttingEndTime"
					align="center"
				>
					<template slot-scope="scope">
						<div
							class="time"
							v-html="scope.row.puttingEndTime"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="主题"
					prop="title"
					align="center"
				/>
				<el-table-column
					label="内容"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="showIntro=scope.row.content"
						>
							查看通知内容
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="是否启用"
					prop="enable"
					align="center"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.enable"
							class="icon success el-icon-success"
						/>
						<i
							v-else
							class="icon none el-icon-error"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							type="primary"
							size="mini"
							@click="inEdit(scope.row)"
						>
							Edit
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<IntroCard
			v-if="showIntro"
			title="公告内容"
			:html="showIntro"
			@close="showIntro=''"
		/>
		<EditNotice
			v-if="is_editNotice"
			:noticeInfo="noticeInfo"
			@close="is_editNotice=false"
			@success="editNotice"
		/>
	</div>
</template>

<script>
import { notices as mockNotices } from '@operation/constants/mock'
import EditNotice from './components/EditNotice'
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Notice'
    },
  },
  components: {
    EditNotice
  },
  data() {
    return {
      searchText: '',
      sortBy: null,
      orderBy: null,
      arr_notice: [],
      showIntro: '',
      noticeInfo: {},
      is_editNotice: false,
    }
  },
  created() {
    this.getNoticesInfo()
  },
  methods: {
    /* 获取 */
    getNoticesInfo() {
      this.arr_notice = mockNotices.map(item => {
        item.createTime = moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        item.puttingStartTime = moment(item.puttingStartTime).format('YYYY/MM/DD HH:mm:ss')
        item.puttingEndTime = moment(item.puttingEndTime).format('YYYY/MM/DD HH:mm:ss')
        return item
      })
      console.log(this.arr_notice)
    },
    /* 进入编辑 */
    inEdit(notice) {
      this.noticeInfo = notice
      this.is_editNotice = true
    },
    /* 发布系统公告 */
    editNotice(e) {
      if (this.noticeInfo.id) {
        this.$confirm(`您将修改系统公告,请确认！`, () => {
          this.$success('修改公告成功')
          this.is_editNotice = false
          this.noticeInfo = {}
          this.getNoticesInfo()
        })
      } else {
        this.$confirm(`您将发布系统公告,请确认！`, () => {
          this.$success('发布公告成功')
          this.is_editNotice = false

          this.getNoticesInfo()
        })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.notice {
  position: relative;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
    color: $blue;
  }

  .btn-publish {
    position: absolute;
    top: 20px;
    right: 10px;
  }

  .time {
    white-space: pre-line;
  }

  .icon {
    font-size: 20px;

    &.success {
      color: $green;
    }

    &.none {
      color: $dark3;
    }
  }
}
</style>
