<template>
	<div
		v-if="$getState('initStore','initFinish')"
		id="app"
	>
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
  height: auto;
}
</style>
