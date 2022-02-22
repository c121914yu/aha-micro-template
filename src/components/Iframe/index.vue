/* 微页面ifame容器 */
<template>
	<iframe
		class="iframe"
		frameborder=0
		scrolling="auto"
		:src="src"
		@load="$emit('load')"
		@error="$emit('error')"
	/>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    trueSrc() {
      return this.src
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
