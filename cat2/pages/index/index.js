Page({
  data: {
    petInfo: null,
    petImage: '',
    petName: '',
    daysWithPet: 0
  },

  onLoad() {
    this.loadPetData()
  },

  onShow() {
    this.loadPetData()
    this.setTabBarSelected()
  },

  setTabBarSelected() {
    const tabBar = typeof this.getTabBar === 'function' ? this.getTabBar() : null
    console.log('[index] getTabBar:', tabBar)
    if (tabBar) {
      tabBar.setData({ selected: 0 })
      console.log('[index] set selected to 0')
    } else {
      console.log('[index] getTabBar not ready, retry in 100ms')
      setTimeout(() => this.setTabBarSelected(), 100)
    }
  },

  loadPetData() {
    const pet = wx.getStorageSync('petInfo') || null
    if (pet) {
      const daysWithPet = this.calculateDaysWithPet(pet.homeDate)
      this.setData({
        petInfo: pet,
        petImage: pet.petImage || '',
        petName: pet.petName || '',
        daysWithPet
      })
    } else {
      this.setData({
        petInfo: null,
        petImage: '',
        petName: '',
        daysWithPet: 0
      })
    }
  },

  calculateDaysWithPet(homeDate) {
    if (!homeDate) return 0
    const home = new Date(homeDate)
    const today = new Date()
    const diff = today - home
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  },

  onAddPetTap() {
    wx.navigateTo({
      url: '/pages/add-pet/index'
    })
  }
})
