// app.js
App({
  onLaunch() {
    this.initApp()
  },

  async initApp() {
    try {
      await this.checkPlatform()
      await this.loadLogs()
      await this.doLogin()
    } catch (error) {
      console.error('App init error:', error)
    }
  },

  checkPlatform: function() {
    return new Promise((resolve) => {
      try {
        const deviceInfo = wx.getDeviceInfo()
        if (deviceInfo && deviceInfo.platform) {
          console.log('当前平台:', deviceInfo.platform)
        }
        resolve()
      } catch (e) {
        console.log('Platform check fallback')
        resolve()
      }
    })
  },

  loadLogs: function() {
    return new Promise((resolve) => {
      try {
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
      } catch (e) {
        console.error('Load logs error:', e)
      }
      resolve()
    })
  },

  doLogin: function() {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        console.log('Login timeout, skip login')
        resolve()
      }, 10000)

      wx.login({
        success: (res) => {
          clearTimeout(timeout)
          if (res.code) {
            console.log('Login success, code:', res.code)
          }
          resolve()
        },
        fail: (err) => {
          clearTimeout(timeout)
          console.error('Login failed:', err)
          resolve()
        },
        complete: () => {
          clearTimeout(timeout)
        }
      })
    })
  },

  globalData: {
    userInfo: null
  }
})