Page({
  data: {
    gender: 'male',
    neutered: 'yes',
    petImage: '',
    petName: '',
    breed: '',
    petDays: 0
  },

  setGender: function(gender) {
    this.setData({
      gender: gender
    })
  },

  setNeutered: function(neutered) {
    this.setData({
      neutered: neutered
    })
  },

  onNameInput: function(e) {
    this.setData({ petName: e.detail.value })
  },

  onChooseBreed: function() {
    // TODO: 打开品种选择器
  },

  onGenderChange: function(e) {
    this.setData({ gender: e.detail.value })
  },

  onNeuteredChange: function(e) {
    this.setData({ neutered: e.detail.value })
  },

  onSave: function() {
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  onChooseImage: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        wx.cropImage({
          src: tempFilePath,
          cropScale: '16:9',
          success: (res) => {
            this.setData({ petImage: res.tempFilePath })
          },
          fail: () => {
            this.setData({ petImage: tempFilePath })
          }
        })
      }
    })
  }
})