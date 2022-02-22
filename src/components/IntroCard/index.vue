<template>
	<div
		class="popup intro-card"
		@click="$emit('close')"
	>
		<div
			class="content"
			@click.stop=""
		>
			<h2 class="center">{{title}}</h2>
			<div v-html="html" />
		</div>
	</div>
</template>

<script>
export default {
  props: {
    title: String,
    html: String
  },
}
</script>

<style lang="scss" scoped>
.intro-card {

  .content {
    width: 400px;
    height: 80%;
    overflow-y: auto;
    user-select: none;
  }
}
</style>
