<template>
	<div class="orders">
		<h1>订单管理</h1>
		<!-- 数据统计 -->
		<div class="table-container">
			<el-table
				ref="table"
				stripe
				:data="arr_orders"
				@row-click="order=$event"
			>
				<el-table-column label="订单ID">
					<template slot="header">
						<el-input
							class="search-input"
							size="mini"
							placeholder="订单ID"
							clearable
							v-model.number="orderId"
							@change="loadOrders(1)"
						/>
					</template>
					<template slot-scope="scope">
						{{scope.row.contribPointOrder.id}}
					</template>
				</el-table-column>
				<el-table-column
					label="时间"
					width="105px"
					prop="purchaseTime"
					align="center"
				/>
				<el-table-column
					label="相关用户"
					align="center"
				>
					<template slot="header">
						<el-input
							class="search-input"
							size="mini"
							placeholder="用户ID"
							clearable
							v-model.number="userId"
							@change="loadOrders(1)"
						/>
					</template>
					<template slot-scope="scope">
						{{scope.row.contribPointOrder.user.userId}} - {{scope.row.contribPointOrder.user.nickname}}
					</template>
				</el-table-column>
				<el-table-column
					label="类型"
					align="center"
				>
					<template slot-scope="scope">
						<div>附件购买</div>
						<div><strong>{{scope.row.contribPointOrder.project.name}}</strong></div>
					</template>
				</el-table-column>
				<el-table-column
					label="商品说明"
					align="center"
				>
					<template slot-scope="scope">
						<ul>
							<li
								v-for="(file,index) in scope.row.contribPointOrder.orderResources"
								:key="index"
							>
								{{file.resource.name}}
							</li>
						</ul>
					</template>
				</el-table-column>
				<el-table-column
					label="花费"
					align="center"
				>
					<template slot-scope="scope">
						<div>{{scope.row.contribPointOrder.chargedAhaCredit}}Aha币</div>
						<div>{{scope.row.contribPointOrder.chargedAhaPoint}}Aha点</div>
						<div>总: {{scope.row.contribPointOrder.totalCost}}</div>
					</template>
				</el-table-column>
				<el-table-column
					label="状态"
					align="center"
				>
					<template slot-scope="scope">
						<div>{{scope.row.contribPointOrder.status === 0 ? "已取消" : "已支付"}}</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页器 -->
			<div class="pagination">
				<el-pagination
					background
					layout="prev, pager, next"
					:page-size="pageSize"
					:total="total"
					:current-page="pageNum"
					@current-change="loadOrders"
				/>
			</div>
		</div>
		<!-- 订单详细 -->
		<OrderDetail
			v-if="order"
			:order="order"
			@close="order=null"
		/>
	</div>
</template>

<script>
import { orders as mockOrders } from '@user/constants/mock'

export default {
  route: {
    meta: {
      leftNav: true,
      activeLeft: 'Order'
    },
  },
  data() {
    return {
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示多少条
      total: 0,
      is_loadAll: false,
      orderId: '',
      userId: '',
      arr_orders: [],
      order: null
    }
  },
  created() {
    this.loadOrders(1)
  },
  methods: {
    async loadOrders(pageNum = this.pageNum) {
      this.$loading()
      const res = mockOrders

      this.arr_orders = res.pageData.map(order => {
        order.purchaseTime = moment(order.purchaseTime).format('YYYY/MM/DD HH:mm:ss')
        order.contribPointOrder.createTime = moment(order.contribPointOrder.createTime).format('YYYY/MM/DD HH:mm:ss')
        order.contribPointOrder.payTime = moment(order.contribPointOrder.payTime).format('YYYY/MM/DD HH:mm:ss')
        return order
      })
      this.pageNum = pageNum
      this.total = res.total
      console.log(this.arr_orders)
      this.$hideLoading()

    }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  padding: 20px;
  font-size: $sSmall;

  h1 {
    margin-bottom: 10px;
    color: $blue;
  }

  .remark {
    margin-top: 10px;
  }

  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
