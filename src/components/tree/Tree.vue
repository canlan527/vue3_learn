<template>
  <div class="tree-node" v-for="(node, index) in data" :key="node.label">
    <div class="node-label">
      <!-- 折叠/展开按钮 -->
      <button class="toggle-button" v-if="hasChildren(node)" @click="isOpenArr[index] = !isOpenArr[index]">
        {{ isOpenArr[index] ? '▼' : '►' }}
      </button>
      <!-- 复选框 -->
      <input type="checkbox" v-if="hasCheckbox" v-model="node.checked" @change="handleChange(node)">
      <!-- 节点名称 -->
      <label :for="node.label">{{ node.label }}</label>
    </div>
    <!-- 要渲染子树，递归使用组件 -->
    <div v-show="isOpenArr[index]">
      <Tree v-if="node.children" :data="node.children" :has-checkbox="hasCheckbox" :parent-node="node" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  hasCheckbox: {
    type: Boolean,
    required: true
  },
  parentNode: {
    type: Object,
    default: null
  }
})
// 采用依赖注入的方式向下一级提供父节点
// const parentNode = inject('parentNode', null)

// onMounted(() => {
//   props.data.forEach((node) => {
//     provide('parentNode', node)
//   })
// })



// 每一层通过状态来控制面板是折叠还是展开
const isOpenArr = ref(props.data.map(() => false))
// 判断是否有子节点
const hasChildren = (node) => {
  return node.children && node.children.length > 0
}

function handleChange(node) {
  // console.log(node.checked)
  // 更新子节点
  const updateChildCheck = (node, checked) => {
    node.checked = checked
    if (hasChildren(node)) {
      node.children.forEach((child) => {
        updateChildCheck(child, checked)
      })
    }
  }
  updateChildCheck(node, node.checked)

  // 更新父节点
  const updateParentCheck = (node) => {
    const parentNode = node.parentNode
    if (!parentNode) return;
    const allNodeChecked = parentNode.children?.every(node => node.checked)
    if (allNodeChecked && !parentNode.checked) { // 如果所有子节点都勾选上了
      // 如果父组件没有勾选就勾选上，并递归向上传递更新状态
      parentNode.checked = true;
      updateParentCheck(parentNode)
    } else if (!allNodeChecked && parentNode.checked) { // 如果不是所有子节点都勾选的情况
      // 如果父组件处于勾选状态就取消勾选，并向上传递更新状态
      parentNode.checked = false
      updateParentCheck(parentNode)
    }
  }

  updateParentCheck(node)
}

// 构造数据结构，给data的每个节点加上parentNode属性
const addParentRefs = (nodes, parent = null) => {
  nodes.forEach(node => {
    node.parentNode = parent
    if (node.children) {
      addParentRefs(node.children, node)
    }
  })
}

onMounted(() => {
  addParentRefs(props.data)
})
</script>

<style lang="scss" scoped>
.tree-node {
  margin-left: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.node-label {
  cursor: pointer;
  display: flex;
  align-items: baseline;
  font-size: 14px;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  color: #333;
}
</style>