<template>
	<div class="top-bar">
		<!-- 文字提示 -->
		<h1>Aha管理系统</h1>
		<!-- 个人信息 -->
		<el-dropdown
			placement="bottom"
			@command="commandMenu"
		>
			<div class="my-info">
				<div class="text">
					<p class="name">
						{{ myInfo.nickname }}
					</p>
					<p class="role">
						{{role}}
					</p>
				</div>

				<el-avatar
					:size="45"
					:src="myInfo.avatarUrl || LOGO"
				/>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="UserInfo">资料修改</el-dropdown-item>
				<el-dropdown-item command="LoginOut">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
  data() {
    return {
      myInfo: {},
      role: ''
    }
  },
  created() {
    this.myInfo = this.$storesGet('getAdminInfo').userInfo
    this.role = this.$storesGet('getAdminInfo').role.name
  },
  methods: {
    /* 选择菜单 */
    commandMenu(e) {
      switch (e) {
        case 'UserInfo':
          this.$pushTo('User', { id: this.myInfo.userId })
          break
        case 'LoginOut':
          this.logOut()
          break
      }
    },
    /* 退出登录 */
    logOut() {
      this.$confirm('确认退出登录?', () => {
        this.$storesCommit('loginOut', '已退出登录')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.top-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: $topbarHeight;
  padding: 0 20px;
  background-color: rgb(84, 92, 100);

  h1 {
    flex: 1;
    color: #ffffff;
  }

  .el-dropdown {
    .my-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      cursor: pointer;

      .text {
        margin-right: 15px;
        text-align: center;
      }
    }
  }
}
</style>
