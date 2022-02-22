<template>
	<div
		v-if="loaded"
		id="app"
	>
		<router-view />
	</div>
</template>

<script>
import { getCompetitions } from '@/utils/buffer'

export default {
  data() {
    return {
      loaded: false
    }
  },
  async created() {
    /* 初始化比赛信息 */
    await getCompetitions()
    this.loaded = true
  }
}
</script>

<style lang="scss">
#app {
  height: auto;
}
</style>
