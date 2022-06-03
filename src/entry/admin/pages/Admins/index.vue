<template>
	<div class="admin">
		<div class="head">
			<div class="head-left">
				<h2>项目成员</h2>
				<span>管理员可添加小程序项目成员,并配置成员的权限，查看/详细说明</span>
			</div>
			<div class="head-right">
				<span>还可添加//个</span>
				<el-button type="success">保存</el-button>
				<el-button>取消</el-button>
			</div>
			<div class="head-foot">
				<i class="el-icon-circle-plus-outline" />
				<el-link
					type="primary"
					:underline="false"
					@click="addVisible=true"
				>
					添加成员
				</el-link>
			</div>
		</div>
		<el-table
			:data="formData"
			style="width: 100%;"
		>
			<el-table-column
				align="center"
				prop="a"
				label="全部成员"
				width="300"
			/>
			<el-table-column
				align="center"
				prop="b"
				label="运营者"
				width="180"
			>
				<el-checkbox
					v-model="checked"
					fill=""
				/>
			</el-table-column>
			<el-table-column
				align="center"
				prop="a"
				label="开发者"
				width="300"
			/>
			<el-table-column
				align="center"
				prop="a"
				label="数据分析者(基础分析)"
				width="300"
			/>
			<el-table-column
				align="center"
				prop="a"
				label="数据分析者(交易分析)"
				width="300"
			/>
		</el-table>
		<!-- 添加用户组件 -->
		<el-dialog
			title="添加成员信息"
			:visible.sync="addVisible"
			width="50%"
		>
			<el-form
				ref="form"
				:model="addForm"
				label-width="80px"
			>
				<el-form-item label="手机号">
					<el-input v-model="addForm.phone" />
				</el-form-item>
			</el-form>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="addVisible = false"
				>
					确 定
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Admin'
    }
  },
  data() {
    return {
      addVisible: false,
      addForm: {
        phone: ''
      }
    }
  },
  mounted() {
    console.log(window.$data, '===')
  },
}
</script>

<style lang="scss" scope>
.admin {
  .head {
    position: relative;
    margin-bottom: 60px;

    .head-left {
      display: inline-block;

      h2 {
        display: inline-block;
        padding-right: 20px;
        color: $blue;
      }

      span {
        color: #778899;
      }
    }

    .head-right {
      position: absolute;
      right: 10px;
      display: inline-block;

      span {
        margin: 0 20px;
      }
    }

    .head-foot {
      position: absolute;
      right: 12px;
      margin: 20px 0;
    }
  }
}
</style>
