<template>
	<div class="page">
		<div class="login">
			<h1>Aha口袋后台管理系统</h1>
			<el-form
				ref="form"
				label-width="60px"
				:rules="RULE_LOGIN"
				:model="loginFrom"
				hide-required-asterisk
			>
				<el-form-item
					label="手机号"
					prop="phone"
				>
					<el-input
						type="phone"
						v-model="loginFrom.phone"
						autocomplete="off"
					/>
				</el-form-item>
				<el-form-item
					label="验证码"
					prop="code"
					class="code-body"
				>
					<el-input
						v-model="loginFrom.code"
						autocomplete="off"
					/>
					<el-button
						type="primary"
						@click="onclickSendCode"
						:disabled="!$getState('sendCode', 'canSend')"
						:loading="sendLoading"
					>
						{{$storesGet('getCodeText')}}
					</el-button>
				</el-form-item>
				<el-button
					class="login-btn"
					type="primary"
					:loading="submitLoading"
					@click="onclickLogin"
				>
					登录
				</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
import { userInfo as mockUserInfo } from '@root/constants/mock'
import { RULE_LOGIN } from '@root/constants/rules'

export default {
  data() {
    return {
      RULE_LOGIN,
      loginFrom: {
        phone: '',
        code: '',
      },
      sendLoading: false,
      submitLoading: false
    }
  },
  methods: {
    /**
     * 点击发送验证码
     */
    async onclickSendCode() {
      /* 判断是否可以发送 */
      if (this.$getState('sendCode', 'canSend')) {
        /* 验证手机号 */
        this.$refs.form.validateField('phone', async(valid) => {
          if (!valid) { // 没有报错信息
            try {
              this.sendLoading = true
              /* 开始倒计时 */
              this.$storesCommit('startSend')
              this.$success('验证码已发送, 请注意查收')
            } catch (err) { err }
            this.sendLoading = false
          }
        })
      }
    },
    /**
     * 点击登录
     */
    async onclickLogin() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          try {
            this.submitLoading = true
            this.$storesCommit('loginSuccess', {
              userInfo: mockUserInfo,
              token: Date.now(),
            })
            this.$router.push(`/dataShow`)
          } catch (err) { err }
          this.submitLoading = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;

  .login {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 30px;
    background-color: #ffffff;
    border-radius: $radiusSmall;
    box-shadow: $shadow1;
    transform: translate(-50%, -50%);
  }

  h1 {
    margin-bottom: 10px;
    text-align: center;
  }

  .code-body {
    .el-input {
      width: 45%;
    }

    .el-button {
      width: 50%;
      margin-left: 10px;
    }
  }

  .login-btn {
    display: block;
    width: 90%;
    margin: 30px auto 0;
  }
}
</style>
