<template>
	<div class="projects">
		<header>
			<h2>项目管理</h2>
			<div>
				<!-- 搜索框 -->
				<el-input
					style="width: 500px;"
					placeholder="输入搜索内容"
					size="small"
					v-model="searchText"
				>
					<el-select
						style="width: 110px;"
						slot="prepend"
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
					@click="getProjectsData(1)"
				/>
				<el-button
					class="btn reset-btn"
					icon="el-icon-refresh-left"
					size="small"
					@click="reset"
				/>
				<!-- <el-button
					class="add-btn"
					icon="el-icon-circle-plus-outline"
					type="primary"
				>
					添加项目
				</el-button> -->
			</div>
			<div class="competition">
				<span><strong>参与赛事</strong></span>
				<el-select
					v-model="filterComp"
					filterable
					placeholder="筛选参与相关赛事的项目"
					clearable
					@change="getProjectsData(1)"
				>
					<el-option
						v-for="(item) in arr_competion"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					/>
				</el-select>
			</div>
		</header>
		<div class="table-container">
			<el-table
				ref="table"
				stripe
				:data="projects"
				@sort-change="sortChange"
				@filter-change="fileterChange"
			>
				<el-table-column
					label="ID"
					width="100"
					prop="id"
				/>
				<el-table-column
					label="项目标题"
					prop="name"
				/>
				<el-table-column
					label="参与赛事"
					align="center"
					prop="compName"
				/>
				<el-table-column
					label="获奖等级"
					align="center"
					width="110px"
					sortable
					:sort-method="awardLevelSort"
					:sort-orders="['descending', null]"
					prop="awardLevel.label"
				/>
				<el-table-column
					label="阅读"
					align="center"
					sortable
					:sort-orders="['descending', null]"
					prop="read"
				/>
				<el-table-column
					label="收藏"
					align="center"
					sortable
					prop="collect"
				/>
				<!-- <el-table-column
					label="标签"
					align="center"
					prop="tags"
				/> -->
				<el-table-column
					label="项目状态"
					align="center"
					width="120"
					:filters="[{ text: '已通过', value: true }, { text: '未通过', value: false }]"
					filter-placement="bottom-end"
					:filter-multiple="false"
					:filter-method="(value, project) => project.passed === value"
					column-key="passed"
					prop="passed"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.passed"
							class="success el-icon-success"
						/>
						<i
							v-else
							class="none el-icon-error"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="项目类型"
					align="center"
					width="120"
					:filters="[{ text: '匿名项目', value: true }, { text: '普通项目', value: false }]"
					filter-placement="bottom-end"
					:filter-multiple="false"
					:filter-method="(value, project) => project.isAnonymous === value"
					column-key="isAnonymous"
					prop="isAnonymous"
				>
					<template slot-scope="scope">
						<p
							v-if="scope.row.isAnonymous"
							style="color: var(--red);"
						>
							匿名项目
						</p>
						<p v-else>普通项目</p>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
				>
					<template>
						<el-button
							size="mini"
							type="primary"
						>
							审阅
						</el-button>
						<br>
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
					@current-change="getProjectsData"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { projects as mockProjects } from '@project/constants/mock'
import { getCompetitions } from '@/utils/buffer'
import { PRIZE_LEVELS } from '@/constants/staticData'
export default {
  route: {
    meta: {
      login: true,
      leftNav: true,
      activeLeft: 'CompProject',
    }
  },
  data() {
    return {
      searchTypes: [
        { label: '项目标题', value: 'name' },
        { label: '手机号', value: 'phone' },
        { label: '作者名', value: 'author' },
      ],
      searchText: '',
      searchType: 'name',
      sortBy: null,
      orderBy: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      filterComp: null,
      passed: null,
      is_loadAll: false,
      projects: [],
      arr_competion: [],
      arr_prizeLevels: PRIZE_LEVELS
    }
  },
  async created() {
    this.arr_competion = await getCompetitions()
    this.getProjectsData(1)
  },
  methods: {
    /**
		 * 获取项目数据
		 */
    async getProjectsData(pageNum = this.pageNum) {
      this.$loading()
      const parmas = {
        pageNum,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        compId: this.filterComp || null,
        passed: this.passed
      }

      parmas.phone = this.searchText || null
      const res = mockProjects

      this.projects = res.pageData.map(project => {
        /* 查找参与比赛 */
        const competition = this.arr_competion.find(item => item.id === project.compId)

        project.compName = competition ? competition.name : ''
        /* 查找获奖等级 */
        const level = this.arr_prizeLevels.find(item => project.awardLevel === item.value)

        project.awardLevel = level || { label: '', value: 0 }
        /* 格式化标签 */
        if (project.tags) {
          project.tags = project.tags.replace(/\s+/g, ',')
        }
        return project
      })
      this.pageNum = pageNum
      this.total = res.total

      this.$hideLoading()
      console.log(this.projects)

    },
    /**
		 * 点击重置
		 */
    reset() {
      this.searchText = ''
      this.sortBy = null
      this.orderBy = null
      this.$refs.table.clearSort()
      this.$refs.table.clearFilter()
      this.getProjectsData(true, true)
    },
    /**
		 * 排序方式
		 */
    awardLevelSort(a, b) {
      return a.awardLevel.value - b.awardLevel.value
    },
    /**
		 * 切换排序
		 */
    sortChange(column) {
      /* 判断排序标志是否含. */
      const reg = /\./

      if (reg.test(column.prop)) {
        column.prop = column.prop.split('.')[ 0 ]
      }
      this.sortBy = column.order ? column.prop : null
      if (column.order) {
        this.orderBy = column.order === 'descending' ? 'desc' : 'asc'
      } else {
        this.orderBy = column.order
      }
      this.getProjectsData(true)
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
      this.getProjectsData(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  position: relative;
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

    .add-btn {
      position: absolute;
      top: 0;
      right: 0;
    }

    .competition {
      // display: inline-block;
      margin: 10px 10px 0 0;

      span {
        margin-right: 10px;
      }
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
