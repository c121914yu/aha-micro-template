<template>
	<div class="left-nav">
		<!-- 导航列表 -->
		<el-menu
			class="menu"
			:default-active="activeRoute"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<div
				v-for="(item, i) in leftNavs"
				:key="item.name"
			>
				<!-- 多导航 -->
				<el-submenu
					v-if="item.child"
					:index="i"
				>
					<template slot="title">
						<i :class="item.icon" />
						<span>{{ item.label }}</span>
					</template>
					<!-- 遍历子menu -->
					<el-menu-item
						v-for="child in item.child"
						:key="child.name"
						:index="child.activeName"
						@click="onclickNav(child)"
					>
						<i :class="child.icon" />
						<span>{{ child.label }}</span>
					</el-menu-item>
				</el-submenu>
				<!-- 单导航 -->
				<el-menu-item
					v-else
					:index="item.activeName"
					@click="onclickNav(item)"
				>
					<i :class="item.icon" />
					<span>{{ item.label }}</span>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script>
import leftNavs from '@root/constants/navs'

export default {
  data() {
    return {
      leftNavs
    }
  },
  computed: {
    activeRoute() {
      const src = this.$getState('navStore', 'selectApp').path
      const app = leftNavs.find(item => item.path === src)

      return app ? app.activeName : ''
    }
  },
  methods: {
    /**
		 * 路由切换，改变路由参数
     * @param {Object} nav 选中的路由
		 */
    pushTo(nav) {
      console.log(nav)
    }
  }
}
</script>

<style lang="scss" >
.left-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: $leftNavWidth;
  height: calc(100vh - #{$topbarHeight});
  margin-top: $topbarHeight;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(84, 92, 100);

  &::-webkit-scrollbar {
    width: 5px;
  }

  .menu {
    font-size: 14px;
    border: none;

    .el-submenu__icon-arrow {
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
