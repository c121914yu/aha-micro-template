<template>
	<div class="data-show">
		数据中心
	</div>
</template>

<script>
export default {
  route: {
    path: '/',
    meta: {
      leftNav: true,
      activeLeft: 'DataShow',
    }
  },
  created() {
    console.log(window.$data)
  }
}
</script>

<style lang="scss" scoped>
.data-show {
  height: 100vh;
}
</style>
