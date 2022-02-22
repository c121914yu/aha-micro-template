<template>
	<div class="competitions">
		<h2>比赛信息管理</h2>
		<el-button
			class="add-btn"
			icon="el-icon-circle-plus-outline"
			type="primary"
			size="small"
			@click="competition={}"
		>
			添加比赛
		</el-button>
		<div class="table-container">
			<el-table
				ref="table"
				stripe
				:data="competitions.filter(item => !searchText || item.name.indexOf(searchText)>-1)"
			>
				<el-table-column
					label="ID"
					width="100"
					prop="id"
					align="center"
				/>
				<el-table-column
					align="center"
					prop="name"
				>
					<template slot="header">
						<el-input
							size="mini"
							placeholder="输入比赛名进行搜索"
							v-model="searchText"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="比赛分类"
					align="center"
					:filters="compFilter"
					filter-placement="bottom-end"
					:filter-multiple="false"
					:filter-method="(value, comp) => comp.competitionType.id === value"
					column-key="comp"
					prop="competitionType.name"
				/>
				<el-table-column
					label="比赛介绍"
					align="center"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="getCompetition(scope)"
						>
							点击查看比赛介绍
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					align="center"
				>
					<template slot-scope="">
						<el-button
							size="mini"
						>
							Edit
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<IntroCard
			v-if="introMsg"
			title="比赛介绍"
			:html="introMsg"
			@close="introMsg=''"
		/>
	</div>
</template>

<script>
import { getCompetitions } from '@/utils/buffer'
import { COMP_TYPE } from '@/constants/staticData'
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Competition'
    },
  },
  data() {
    return {
      competitions: [],
      searchText: '',
      EditType: 0,
      competition: null,
      introMsg: ''
    }
  },
  computed: {
    compFilter() {
      return COMP_TYPE.map(item => {
        return {
          text: item.label,
          value: item.value
        }
      })
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    /**
     * 获取比赛信息
     */
    async getDataList() {
      this.EditType = 0
      this.competition = null
      this.competitions = await getCompetitions()
    },
    /* 点击查看介绍，获取比赛详细信息 */
    getCompetition(scope) {
      this.introMsg = this.competitions[ scope.$index ].intro
    },
  }
}
</script>

<style lang="scss" scoped>
.competitions {
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
}
</style>
