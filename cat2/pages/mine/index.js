Page({
  data: {
    petInfo: null,
    petImage: '',
    petName: '',
    breed: ''
  },

  onShow() {
    const pet = wx.getStorageSync('petInfo') || null
    if (pet) {
      this.setData({
        petInfo: pet,
        petImage: pet.petImage || '',
        petName: pet.petName || '',
        breed: pet.breed || ''
      })
    } else {
      this.setData({
        petInfo: null,
        petImage: '',
        petName: '',
        breed: ''
      })
    }
    this.setTabBarSelected()
  },

  setTabBarSelected() {
    const tabBar = typeof this.getTabBar === 'function' ? this.getTabBar() : null
    console.log('[mine] getTabBar:', tabBar)
    if (tabBar) {
      tabBar.setData({ selected: 1 })
      console.log('[mine] set selected to 1')
    } else {
      console.log('[mine] getTabBar not ready, retry in 100ms')
      setTimeout(() => this.setTabBarSelected(), 100)
    }
  },

  onEditTap() {
    wx.navigateTo({
      url: '/pages/add-pet/index'
    })
  }
})
