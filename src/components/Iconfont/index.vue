<template>
	<i
		:class="`${type} ${name}`"
		:style="{
			'font-size': `${size}px`,
			'font-weight': weight,
		}"
		@click="$emit('click',$event)"
	/>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: { // iconfont: 阿里图标, 空: element图标
      type: String,
      default: 'iconfont'
    },
    size: {
      type: Number,
      default: 16
    },
    weight: {
      type: Number,
      default: 500
    }
  },
}
</script>
