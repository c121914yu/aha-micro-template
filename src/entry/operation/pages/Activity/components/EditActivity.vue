<template>
	<div class="edit-activity popup">
		<el-form
			class="content"
			ref="informForm"
			label-width="100px"
			:rules="rules"
			:model="activity"
		>
			<h2 class="center">添加新活动</h2>
			<el-form-item
				label="活动主题"
				prop="title"
			>
				<el-input
					v-model="activity.title"
					placeholder="请输入活动主题"
				/>
			</el-form-item>
			<el-form-item
				label="活动时间"
				required
			>
				<el-date-picker
					v-model="time"
					type="datetimerange"
					range-separator="-"
					:clearable="false"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					format="yyyy/MM/dd HH:mm"
				/>
			</el-form-item>
			<el-form-item
				label="兑换码数量"
				prop="codeSum"
			>
				<el-input
					placeholder="兑换码数量"
					v-model="activity.codeSum"
				/>
			</el-form-item>
			<el-form-item
				label="Aha币数量"
				prop="codeSum"
			>
				<el-input
					placeholder="每张可兑换Aha币的数量"
					v-model="activity.exchangeAhaCredit"
				/>
			</el-form-item>
			<el-form-item
				label="Aha点数量"
				prop="codeSum"
			>
				<el-input
					placeholder="每张可兑换Aha点的数量"
					v-model="activity.exchangeAhaPoint"
				/>
			</el-form-item>
			<el-form-item
				label="活动介绍"
				prop="intro"
			>
				<el-input
					type="textarea"
					:autosize="{ minRows: 2, maxRows: 6}"
					placeholder="请输入活动介绍"
					resize="none"
					v-model="activity.intro"
				/>
			</el-form-item>
			<el-form-item class="btns">
				<el-button
					class="sure"
					type="primary"
					plain
					@click="sure"
				>
					确认
				</el-button>
				<el-button
					class="cancel"
					type="info"
					@click="$emit('close')"
				>
					取消
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  props: {
    activityInfo: {
      type: Object,
      default: () => null
    },
  },
  data() {
    return {
      time: [],
      activity: {
        title: '',
        intro: '',
        codeSum: '',
        exchangeAhaPoint: '',
        exchangeAhaCredit: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        title: [{ required: true, message: '请输入活动主题', trigger: 'blur' }],
        codeSum: [{ required: true, message: '请输入兑换码数量', trigger: 'blur' }],
        exchangeAhaPoint: [{ required: true, message: '请输入可兑换Aha币数量', trigger: 'blur' }],
        exchangeAhaCredit: [{ required: true, message: '请输入可兑换Aha点数量', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入活动内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.activity = { ...this.activityInfo }
    this.time = [this.activity.startTime, this.activity.endTime]
  },
  methods: {
    /* 确认发布 */
    sure() {
      this.$refs.informForm.validate(valid => {
        if (valid) {
          this.activity.startTime = this.time[ 0 ]
          this.activity.endTime = this.time[ 1 ]
          this.$success('添加活动成功')
          this.$emit('finish')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-activity {
  .content {
    width: 600px;

    h2 {
      margin-bottom: 10px;
      color: $blue;
    }
  }

  .el-date-editor {
    width: 100%;
  }
}
</style>
