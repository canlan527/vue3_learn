<template>
  <div id="shoppingcart">
    <table>
      <tr>
        <td>
          <input type="checkbox" v-model="selectAll">
          全选
        </td>
        <td>商品</td>
        <td>单价（元）</td>
        <td>数量</td>
        <td>小计（元）</td>
        <td>操作</td>
      </tr>
      <tr v-for="item in goods" :key="goods.id">
        <td>
          <input type="checkbox" v-model="item.checked">
        </td>
        <td>{{ item.goods_name }}</td>
        <td>{{ item.goods_price }}</td>
        <td>
          <button @click="decrease(item.id)">-</button>
          <input type="number" class="ipt" v-model.number="item.goods_num" @input="input(item.id, $event)">
          <button @click="increase(item.id)">+</button>
        </td>
        <td>{{ item.goods_num * item.goods_price }}</td>
        <td>
          <button class="danger" @click="delItem(item.id)">删除</button>
        </td>
      </tr>
    </table>
    <footer class="footer">
      <div class="footer-left">
        <input type="checkbox" v-model="selectAll">
        <span>全选</span>
        <a @click="delChecked">删除选中的商品</a>
        <span>共选择{{ goodsLength }}件商品，已选择{{ checkedLength }}件</span>
      </div>
      <div class="footer-right">
        合计（不含运费）：<span>￥{{ totoalPrice }}元</span>
        <button>去结算</button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// 数据
const isSelectAll = ref(false)
const goods = ref([
  {
    id: 1,
    goods_name: '华为手环',
    goods_price: 169,
    goods_num: 1,
    checked: true
  },
  {
    id: 2,
    goods_name: '索尼耳机',
    goods_price: 163,
    goods_num: 1,
    checked: true
  },
  {
    id: 3,
    goods_name: '小米汽车',
    goods_price: 1890,
    goods_num: 1,
    checked: false
  },
  {
    id: 4,
    goods_name: 'iPhone14',
    goods_price: 1699,
    goods_num: 1,
    checked: true
  }
])
// 计算属性
// 总价
const totoalPrice = computed(() => {
  let total = 0;
  goods.value.forEach((item) => {
    total += item.goods_num * item.goods_price
  })
  return total
})
// 商品总数
const goodsLength = computed(() => {
  return goods.value.filter((item) => {
    return item.goods_num > 0
  }).length
})
// 已选中数量
const checkedLength = computed(() => {
  return goods.value.filter((item) => {
    return item.checked
  }).length;
})

// 全选
const selectAll = computed({
  get() {
    return goods.value.every((item) => {
      return item.checked
    })
  },
  set(newVal) {
    goods.value.forEach((item) => {
      item.checked = newVal
    })
  }
})
// 方法
// 增加
function increase(id) {
  goods.value = goods.value.filter((item) => {
    if (item.id === id && item.goods_num < 10) {
      item.goods_num++;
    }
    return item;
  })
}
// 减少
function decrease(id) {
  goods.value = goods.value.filter((item) => {
    if (item.id === id) {
      item.goods_num--;
    }
    // 如果 item.goods_num 小于等于0，删除此项
    return item.goods_num > 0;
  })
}
// input框输入
function input(id, e) {
  if (e.target.value > 10) {
    e.target.value = 10
  }
  goods.value.forEach(item => {
    if (item.id === id) {
      if (e.target.value <= 10) {
        item.goods_num = e.target.value
      }
    }
  })
}

// 删除单项
function delItem(id) {
  goods.value = goods.value.filter(item => {
    return item.id !== id
  })
}
// 删除选中
function delChecked() {
  goods.value = goods.value.filter(item => {
    return !item.checked
  })
}

</script>

<style lang="scss" scoped>
@import 'assets/shopcart.css';
</style>