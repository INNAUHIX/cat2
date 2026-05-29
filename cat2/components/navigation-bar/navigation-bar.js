Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '#000000'
    },
    showBack: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: 44
  },
  lifetimes: {
    attached: function() {
      try {
        var windowInfo = wx.getWindowInfo()
        this.setData({
          statusBarHeight: windowInfo.statusBarHeight || 44
        })
      } catch (e) {
        try {
          var sysInfo = wx.getSystemInfoSync()
          this.setData({
            statusBarHeight: sysInfo.statusBarHeight || 44
          })
        } catch (e2) {
        }
      }
    }
  },
  methods: {
    onBack: function() {
      wx.navigateBack()
    }
  }
})