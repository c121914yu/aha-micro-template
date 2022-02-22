<template>
	<div
		v-if="receiver"
		class="send-inform"
	>
		<el-form
			class="content"
			ref="informForm"
			label-width="80px"
			:rules="rules"
			:model="informInfo"
		>
			<h3 class="center">{{header}}</h3>
			<el-form-item
				v-if="receiver.id"
				label="收件人ID"
				size="mini"
			>
				{{receiver.id}}
			</el-form-item>
			<el-form-item
				label="收件人"
				size="mini"
			>
				{{receiver.name}}
			</el-form-item>
			<el-form-item
				label="发件人"
				size="mini"
			>
				管理员
			</el-form-item>
			<el-form-item
				label="通知主题"
				prop="title"
			>
				<el-input
					v-model="informInfo.title"
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
					v-model="informInfo.content"
				/>
			</el-form-item>
			<div class="btns">
				<el-button
					class="send"
					type="primary"
					plain
					@click="send"
				>
					发送
				</el-button>
				<el-button
					class="cancel"
					type="info"
					@click="$emit('close')"
				>
					取消
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: '消息通知'
    },
    receiver: {
      type: Object,
      default: () => {}
    },
    inform: {
      type: Object,
      default: () => {
        return {
          title: '',
          content: ''
        }
      }
    }
  },
  data() {
    return {
      informInfo: {
        title: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入通知主题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入通知内容', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.informInfo = this.inform
  },
  methods: {
    /* 发送信息 */
    send() {
      this.$refs.informForm.validate((valid) => {
        if (valid) {
          this.$confirm(`您即将发送通知给 ${ this.receiver.name },请确认！`, () => {
            this.$emit('success')
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
.send-inform {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);

  .content {
    width: 400px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: $radiusSmall;

    .btns {
      .el-button {
        width: 40%;
      }

      .cancel {
        float: right;
      }
    }
  }
}
</style>
