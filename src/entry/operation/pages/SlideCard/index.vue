<template>
	<div class="slide-card">
		<h2>轮播图管理</h2>
		<el-button
			class="btn-publish"
			type="primary"
			icon="el-icon-circle-plus-outline"
			size="small"
			@click="editType=0;slideInfo={}"
		>
			添加轮播图
		</el-button>
		<div class="table-container">
			<el-table
				ref="table"
				:data="arr_slide"
			>
				<el-table-column
					label="ID"
					width="100"
					prop="id"
					align="center"
				/>
				<el-table-column
					label="创建时间"
					sortable
					width="105px"
					column-key="date"
					prop="uploadTime"
					align="center"
				/>
				<el-table-column
					label="图片"
					align="center"
				>
					<template slot-scope="scope">
						<el-image
							style="width: 100px; border-radius: 8px;"
							:src="scope.row.pictureUrl"
							fit="fill"
							:preview-src-list="[scope.row.pictureUrl]"
						/>
					</template>
				</el-table-column>
				<el-table-column
					label="跳转类型"
					prop="linkType"
					align="center"
				>
					<template slot-scope="scope">
						<div>{{scope.row.linkType === 1 ? "小程序内跳转" : "外部跳转"}}</div>
					</template>
				</el-table-column>
				<el-table-column
					label="跳转地址"
					prop="linkUrl"
					align="center"
				/>
				<el-table-column
					label="是否启用"
					align="center"
					:filters="[{ text: '启用', value: true }, { text: '禁用', value: false }]"
					:filter-multiple="false"
					filter-placement="bottom-end"
					:filter-method="(value, slide) => slide.enabled === value"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.row.enabled"
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
							style="width: 70px;"
							size="mini"
							@click="editType=1;slideInfo=scope.row"
						>
							Edit
						</el-button>
						<el-button
							style="padding: 5px;"
							size="mini"
							type="danger"
							@click="removeSlide(scope.row)"
						>
							Remove
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { slideCard as mockSlide } from '@operation/constants/mock'
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'SlideCard'
    },
  },
  data() {
    return {
      arr_slide: [],
      slideInfo: null,
      editType: 0,
    }
  },
  created() {
    this.getSlideCard()
  },
  methods: {
    /**
		 * 获取轮播图数据
		 */
    async getSlideCard() {
      this.slideInfo = null
      try {
        this.arr_slide = mockSlide.map(item => {
          item.uploadTime = moment(item.upload).format('YYYY/MM/DD HH:mm:ss')
          return item
        })

        console.log(this.arr_slide)
      } catch (err) {
        console.log(err)
      }

    },
    /* 删除轮播图 */
    removeSlide() {
      this.$confirm('确认删除该轮播图?', async() => {
        this.$warn('删除成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-card {
  position: relative;
  padding: 20px;
  font-size: $sSmall;

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
