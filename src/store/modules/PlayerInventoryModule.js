export default {
  state: { items: [] },
  mutations: {
    addItem (state, itemData) {
      let existingItem = state.items.find(item => item.itemName === itemData.itemName)
      if (existingItem === undefined) {
        let itemToAdd = state.inventoryData.find(item => item.itemName === itemData.itemName)
        itemToAdd.amount = itemData.amount
        state.items.push(itemToAdd)
      } else {
        existingItem.amount += itemData.amount
      }
    },
    removeItem (state, itemData) {
      for (let index in state.items) {
        if (state.items[index].itemName === itemData.itemName) {
          state.items.splice(index, 1)
        }
      }
    },
    useItem (state, itemData) {
      for (let index in state.items) {
        if (state.items[index].itemName === itemData.itemName) {
          state.items[index].amount -= itemData.subtractUses
          if (state.items[index].amount <= 0) state.items.splice(index, 1)
        }
      }
    }
  }
}
