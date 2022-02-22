/* 选择文件组件，显示插槽内容，插槽不能是button */
<template>
	<label class="choose-file-btn">
		<input
			type="file"
			:multiple="multiple"
			@change="$emit('change',Array.from($event.target.files))"
		>
		<slot />
	</label>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-file-btn {
  display: inline-block;

  input {
    position: absolute;
    left: 0;
    width: 0;
  }
}
</style>
