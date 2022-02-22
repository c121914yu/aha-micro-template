<template>
	<div class="send-notice popup">
		<el-form
			class="content"
			ref="noticeForm"
			label-width="100px"
			:rules="rules"
			:model="notice"
		>
			<h2 class="center">发布系统公告</h2>
			<el-form-item
				label="收件人"
				size="mini"
			>
				全体成员
			</el-form-item>
			<el-form-item
				label="发件人"
				size="mini"
			>
				Aha口袋
			</el-form-item>
			<el-form-item label="公告时间">
				<el-date-picker
					v-model="time"
					type="datetimerange"
					range-separator="-"
					:clearable="false"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy/MM/dd HH:mm"
				/>
			</el-form-item>
			<el-form-item
				label="通知主题"
				prop="title"
			>
				<el-input
					v-model="notice.title"
					placeholder="请输入通知主题"
				/>
			</el-form-item>
			<el-form-item
				label="通知内容"
				prop="content"
			>
				<el-input
					type="textarea"
					:autosize="{ minRows: 2, maxRows: 6}"
					placeholder="请输入通知内容"
					resize="none"
					v-model="notice.content"
				/>
			</el-form-item>
			<el-form-item label="是否启用">
				<el-radio-group v-model="notice.enable">
					<el-radio :label="true">启用</el-radio>
					<el-radio
						:label="false"
						fill="#F56C6C"
					>
						禁用
					</el-radio>
				</el-radio-group>
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
    noticeInfo: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      time: [],
      notice: {
        title: '',
        content: '',
        puttingStartTime: '',
        puttingEndTime: '',
        enable: true
      },
      rules: {
        title: [
          { required: true, message: '请输入公告主题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(this.noticeInfo, 'id')) {
      this.notice = { ...this.noticeInfo }
      this.time = [this.notice.puttingStartTime, this.notice.puttingEndTime]
    }
  },
  methods: {
    /* 确认发布 */
    sure() {
      this.$refs.noticeForm.validate((valid) => {
        if (valid) {
          this.$emit('success', {
            ...this.notice,
            puttingStartTime: this.time[ 0 ],
            puttingEndTime: this.time[ 1 ]
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.send-notice {

  .content {
    width: 500px;
  }

  .el-date-editor {
    width: 100%;
  }
}
</style>
