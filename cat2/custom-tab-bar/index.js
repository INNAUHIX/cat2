Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        iconPath: '/images/tab-home.png',
        selectedIconPath: '/images/tab-home-active.png',
        text: '首页'
      },
      {
        pagePath: '/pages/mine/index',
        iconPath: '/images/tab-mine.png',
        selectedIconPath: '/images/tab-mine-active.png',
        text: '我的'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const index = Number(e.currentTarget.dataset.index)
      const url = e.currentTarget.dataset.path
      wx.switchTab({ url })
    }
  }
})
