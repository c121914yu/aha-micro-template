<template>
	<div
		class="order-card popup"
		@click="$emit('close')"
	>
		<div
			class="content"
			@click.stop=""
		>
			<h2 class="center">订单详细</h2>
			<el-avatar
				:size="50"
				:src="order.contribPointOrder.project.avatarUrl"
			>
				<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
			</el-avatar>
			<div><small>{{order.contribPointOrder.project.name}}</small></div>
			<h1 class="price">-{{order.contribPointOrder.totalCost}}</h1>
			<div
				:style="{
					color: order.contribPointOrder.status === 0 ? 'var(--red)' : '$origin2'
				}"
			>
				<small><strong>{{order.contribPointOrder.status === 0 ? "已取消" : "已支付"}}</strong></small>
			</div>
			<!-- 商品说明 -->
			<div class="card">
				<span class="label">商品说明</span>
				<ul class="value">
					<li
						class="filename"
						v-for="(file,index) in order.contribPointOrder.orderResources"
						:key="index"
					>
						{{file.resource.name}}
					</li>
				</ul>
			</div>
			<!-- 付款详细 -->
			<div class="card">
				<span class="label">付款详细</span>
				<div class="value">
					<div>{{order.contribPointOrder.chargedAhaCredit}}Aha币</div>
					<div>{{order.contribPointOrder.chargedAhaPoint}}Aha点</div>
				</div>
			</div>
			<!-- 账单分类 -->
			<div class="card">
				<span class="label">账单分类</span>
				<div class="value">附件购买</div>
			</div>
			<!-- 创建时间 -->
			<div class="card">
				<span class="label">创建时间</span>
				<div class="value">{{order.contribPointOrder.createTime}}</div>
			</div>
			<!-- 付款时间 -->
			<div class="card">
				<span class="label">付款时间</span>
				<div class="value">{{order.contribPointOrder.payTime}}</div>
			</div>
			<!-- 相关用户 -->
			<div class="card">
				<span class="label">相关用户</span>
				<div class="value">{{order.contribPointOrder.user.userId}} - {{order.contribPointOrder.user.nickname}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    order: Object
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    background-color: #f4f4f4;

    .el-avatar {
      margin: 5px 0;
    }

    .price {
      color: $origin1;
    }

    .card {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px;
      background-color: #ffffff;
      border-bottom: $border1;

      &:first-of-type {
        border-top-left-radius: $radiusSmall;
        border-top-right-radius: $radiusSmall;
      }

      &:last-of-type {
        border: none;
        border-bottom-right-radius: $radiusSmall;
        border-bottom-left-radius: $radiusSmall;
      }

      .label {
        font-size: 12px;
      }

      .value {
        flex: 1;
        margin-left: 5px;
        color: $origin1;
        text-align: end;

        .filename {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
