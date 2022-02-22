<template>
	<div class="left-nav">
		<!-- 导航列表 -->
		<el-menu
			class="menu"
			:default-active="$getState('navStore', 'activeNav')"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<div
				v-for="(item, i) in navs"
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
						@click="pushTo(child.name)"
					>
						<i :class="child.icon" />
						<span>{{ child.label }}</span>
					</el-menu-item>
				</el-submenu>
				<!-- 单导航 -->
				<el-menu-item
					v-else
					:index="item.activeName"
					@click="pushTo(item.name)"
				>
					<i :class="item.icon" />
					<span>{{ item.label }}</span>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script>
import { leftNavs, devPaths, prodPaths } from '@basic/constants/navs'
import { pubEvent } from '@/utils/eventBus'

export default {
  data() {
    return {
      navs: leftNavs,
    }
  },
  mounted() {
    const name = this.$route.query.route || 'DataShow'

    this.pushTo(name)
    /* 初次加载，确认高亮的路由 */
    this.$storesCommit('setNavParam', {
      activeNav: name,
    })
  },
  methods: {
    /**
		 * 路由切换，改变路由参数
		 */
    pushTo(name) {
      let path = prodPaths[ name ]

      /* 开发环境 */
      if (process.env.NODE_ENV === 'development') {
        if (devPaths[ name ]) { // 如果填写了devPaths 则覆盖 线上访问路径
          path = devPaths[ name ]
        } else {
          path = process.env.VUE_APP_ORIGIN + path
        }
      }
      pubEvent('iframeChange', path)
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
