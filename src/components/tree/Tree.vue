
<template>
  <div class="tree-node" v-for="(node, index) in treeData" :key="node.label">
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
      <Tree v-if="node.children" :data="node.children" :has-checkbox="hasCheckbox" @update:data="handleChildUpdate(node, $event)" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  hasCheckbox: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:data'])

const treeData = ref([])
const isOpenArr = ref([])

// 深拷贝数据并添加 parentNode 属性
function cloneAndAttachParents(nodes, parent = null) {
  if (!Array.isArray(nodes)) {
    console.warn('Invalid nodes data, expected an array:', nodes)
    return []
  }
  return nodes.map((node) => {
    if (!node || typeof node !== 'object') {
      console.warn('Invalid node:', node)
      return { label: 'Unnamed Node', checked: false, children: [] }
    }
    const newNode = {
      label: node.label || 'Unnamed Node',
      checked: node.checked ?? false,
      parentNode: parent
    }
    newNode.children = node.children ? cloneAndAttachParents(node.children, newNode) : []
    return newNode
  })
}

// 初始化 treeData
function initTreeData() {
  const oldIsOpenArr = [...isOpenArr.value] // 保存旧的折叠状态
  treeData.value = cloneAndAttachParents(props.data || [])
  isOpenArr.value = Array(treeData.value.length).fill(false) // 初始化新数组
  // 恢复旧的折叠状态，长度不足的部分补 false
  for (let i = 0; i < Math.min(oldIsOpenArr.length, isOpenArr.value.length); i++) {
    isOpenArr.value[i] = oldIsOpenArr[i]
  }
}

onMounted(() => {
  initTreeData()
})

// 监听 props.data 变化
watch(
  () => props.data,
  () => {
    initTreeData()
  },
  { deep: true }
)

// 判断是否有子节点
const hasChildren = (node) => {
  return node.children && node.children.length > 0
}

// 处理复选框变化
function handleChange(node) {
  console.log('handleChange triggered for:', node.label)
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
    if (!parentNode) return
    const allNodeChecked = parentNode.children.every((child) => child.checked)
    if (allNodeChecked && !parentNode.checked) {
      parentNode.checked = true
      updateParentCheck(parentNode)
    } else if (!allNodeChecked && parentNode.checked) {
      parentNode.checked = false
      updateParentCheck(parentNode)
    }
  }
  updateParentCheck(node)

  // 触发 update:data 事件
  emit('update:data', treeData.value)
}

// 处理子组件的 update:data 事件
function handleChildUpdate(parentNode, updatedChildren) {
  console.log('handleChildUpdate triggered for:', parentNode.label)
  parentNode.children = updatedChildren
  // 更新父节点状态
  const allNodeChecked = parentNode.children.every((child) => child.checked)
  parentNode.checked = allNodeChecked
  // 递归更新父节点的父节点
  if (parentNode.parentNode) {
    const updateParentCheck = (node) => {
      const parent = node.parentNode
      if (!parent) return
      const allChecked = parent.children.every((child) => child.checked)
      parent.checked = allChecked
      updateParentCheck(parent)
    }
    updateParentCheck(parentNode)
  }
  // 触发 update:data 事件
  emit('update:data', treeData.value)
}
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