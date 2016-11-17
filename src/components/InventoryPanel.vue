<template>
<div id="inventory-panel">
  <ul>
    <li v-for="item in inventoryData">{{ item.text }} x {{ item.amount }}</li>
  </ul>
</div>
</template>

<script>
export default {

  name: 'InventoryPanel',

  props: ['inventoryData']
}
</script>

<style lang="css" scoped>
#inventory-panel {
    box-sizing: border-box;
    height: 100%;
    border: 1px solid red;
}
</style>