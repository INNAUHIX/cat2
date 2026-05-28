Page({
  data: {
    toastVisible: false,
    toastText: '',
    gender: 'male',
    neutered: 'yes',
    petImage: '',
    petName: '',
    breed: '',
    petDays: 0,
    birthDate: '',
    homeDate: '',
    showBreedModal: false,
    selectedCategory: 'cat',
    searchKeyword: '',
    showCategory: true,
    showDatePicker: false,
    datePickerType: '',
    datePickerTitle: '',
    years: [],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: [],
    selectedYear: 2024,
    selectedMonth: 1,
    selectedDay: 1,
    wheelOffsets: [110, 110, 110],
    touchStartY: [0, 0, 0],
    touchStartOffset: [0, 0, 0],
    currentWheel: -1,
    breedMap: {
      cat: [
        { name: '中华狸花猫' },
        { name: '英国短毛猫' },
        { name: '美国短毛猫' },
        { name: '布偶猫' },
        { name: '橘猫' },
        { name: '暹罗猫' },
        { name: '波斯猫' },
        { name: '异国短毛猫' },
        { name: '苏格兰折耳猫' },
        { name: '缅因猫' },
        { name: '俄罗斯蓝猫' },
        { name: '德文卷毛猫' },
        { name: '加菲猫' },
        { name: '孟加拉豹猫' },
        { name: '新加坡猫' },
        { name: '东方短毛猫' },
        { name: '埃及猫' },
        { name: '土耳其安哥拉猫' },
        { name: '挪威森林猫' },
        { name: '西伯利亚猫' },
        { name: '斯芬克斯猫' },
        { name: '阿比西尼亚猫' },
        { name: '孟买猫' },
        { name: '喜马拉雅猫' }
      ],
      dog: [
        { name: '中华田园犬' },
        { name: '贵宾犬' },
        { name: '金毛寻回犬' },
        { name: '西伯利亚雪橇犬' },
        { name: '萨摩耶犬' },
        { name: '威尔士柯基犬' },
        { name: '柴犬' },
        { name: '拉布拉多寻回犬' },
        { name: '比熊犬' },
        { name: '雪纳瑞犬' },
        { name: '边境牧羊犬' },
        { name: '德国牧羊犬' },
        { name: '吉娃娃' },
        { name: '斗牛犬' },
        { name: '秋田犬' },
        { name: '阿拉斯加雪橇犬' },
        { name: '巴哥犬' },
        { name: '法国斗牛犬' },
        { name: '罗威纳犬' },
        { name: '哈士奇' },
        { name: '松狮犬' },
        { name: '萨摩耶' },
        { name: '藏獒' },
        { name: '柯基犬' }
      ],
      bird: [
        { name: '虎皮鹦鹉' },
        { name: '玄凤鹦鹉' },
        { name: '八哥' },
        { name: '画眉' },
        { name: '信鸽' },
        { name: '金丝雀' },
        { name: '牡丹鹦鹉' },
        { name: '蓝金刚鹦鹉' },
        { name: '文鸟' },
        { name: '百灵鸟' },
        { name: '珍珠鸟' },
        { name: '黄鹂鸟' }
      ],
      rabbit: [
        { name: '荷兰垂耳兔' },
        { name: '荷兰侏儒兔' },
        { name: '狮子兔' },
        { name: '荷兰兔' },
        { name: '安哥拉兔' },
        { name: '海棠兔' },
        { name: '迷你垂耳兔' },
        { name: '巨型安哥拉兔' },
        { name: '雷克斯兔' },
        { name: '英国垂耳兔' }
      ]
    }
  },

  onNameInput: function(e) {
    this.setData({ petName: e.detail.value })
  },

  setGender: function(e) {
    this.setData({ gender: e.detail.value })
  },

  setNeutered: function(e) {
    this.setData({ neutered: e.detail.value })
  },

  onChooseBreed: function() {
    this.setData({ showBreedModal: true })
    this.filterBreeds()
  },

  closeBreedModal: function() {
    this.setData({ showBreedModal: false })
  },

  selectCategory: function(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ selectedCategory: category })
    this.filterBreeds()
  },

  selectBreed: function(e) {
    const breed = e.currentTarget.dataset.breed
    this.setData({ breed, showBreedModal: false })
  },

  onSearchInput: function(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterBreeds()
  },

  clearSearch: function() {
    this.setData({ searchKeyword: '' })
    this.filterBreeds()
  },

  filterBreeds: function() {
    const { searchKeyword, selectedCategory, breedMap } = this.data
    
    if (!searchKeyword) {
      const breeds = breedMap[selectedCategory] || []
      this.setData({ filteredBreeds: breeds, showCategory: true })
      return
    }
    
    const allBreeds = Object.values(breedMap).flat()
    const filtered = allBreeds.filter(item => 
      item.name.includes(searchKeyword)
    )
    this.setData({ filteredBreeds: filtered, showCategory: false })
  },

  onLoad: function() {
    const systemInfo = wx.getSystemInfoSync()
    const pxToRpx = 750 / systemInfo.windowWidth
    const now = new Date()
    const currentYear = now.getFullYear()
    const years = []
    for (let i = currentYear - 20; i <= currentYear; i++) {
      years.push(i)
    }
    this.setData({ 
      years,
      selectedYear: currentYear,
      selectedMonth: now.getMonth() + 1,
      selectedDay: now.getDate(),
      filteredBreeds: this.data.breedMap['cat'],
      pxToRpx
    })
    this.updateMonths(currentYear)
    this.updateDays(currentYear, now.getMonth() + 1)
    this.updateWheelTransforms()
    this.loadExistingPetData()
  },

  loadExistingPetData: function() {
    const pet = wx.getStorageSync('petInfo')
    if (pet) {
      this.setData({
        petImage: pet.petImage || '',
        petName: pet.petName || '',
        breed: pet.breed || '',
        gender: pet.gender || 'male',
        neutered: pet.neutered || 'yes',
        birthDate: pet.birthDate || '',
        homeDate: pet.homeDate || ''
      })
      if (pet.birthDate) {
        const birthParts = pet.birthDate.split('-')
        if (birthParts.length === 3) {
          const birthYear = parseInt(birthParts[0])
          const birthMonth = parseInt(birthParts[1])
          const birthDay = parseInt(birthParts[2])
          this.updateMonths(birthYear)
          this.updateDays(birthYear, birthMonth)
          this.setData({
            selectedYear: birthYear,
            selectedMonth: birthMonth,
            selectedDay: birthDay
          })
          this.updateWheelTransforms()
        }
      }
      if (pet.homeDate) {
        const homeParts = pet.homeDate.split('-')
        if (homeParts.length === 3) {
          const homeYear = parseInt(homeParts[0])
          const homeMonth = parseInt(homeParts[1])
          const homeDay = parseInt(homeParts[2])
          this.updateMonths(homeYear)
          this.updateDays(homeYear, homeMonth)
          this.setData({
            selectedYear: homeYear,
            selectedMonth: homeMonth,
            selectedDay: homeDay
          })
          this.updateWheelTransforms()
        }
      }
    }
  },

  updateMonths: function(year) {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    const maxMonth = year < currentYear ? 12 : currentMonth
    const months = []
    for (let i = 1; i <= maxMonth; i++) {
      months.push(i)
    }
    this.setData({ months })
  },

  updateDays: function(year, month) {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()

    let maxDay = new Date(year, month, 0).getDate()
    if (year === currentYear && month === currentMonth) {
      maxDay = Math.min(maxDay, currentDay)
    }

    const days = []
    for (let i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    this.setData({ days })
  },

  updateWheelTransforms: function() {
    const { selectedYear, selectedMonth, selectedDay, years, months, days } = this.data
    const itemHeight = 110
    
    const yearIndex = years.indexOf(selectedYear)
    const monthIndex = months.indexOf(selectedMonth)
    const dayIndex = days.indexOf(selectedDay)
    
    const offsets = [
      110 - yearIndex * itemHeight,
      110 - monthIndex * itemHeight,
      110 - dayIndex * itemHeight
    ]
    
    this.setData({ wheelOffsets: offsets })
  },

  openDatePicker: function(e) {
    const type = e.currentTarget.dataset.type
    const now = new Date()
    const title = type === 'birth' ? '出生日期' : '到家日期'
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    
    const existingDate = type === 'birth' ? this.data.birthDate : this.data.homeDate
    if (existingDate) {
      const dateParts = existingDate.split('-')
      year = parseInt(dateParts[0])
      month = parseInt(dateParts[1])
      day = parseInt(dateParts[2])
      if (year > now.getFullYear() ||
        (year === now.getFullYear() && month > now.getMonth() + 1) ||
        (year === now.getFullYear() && month === now.getMonth() + 1 && day > now.getDate())) {
        year = now.getFullYear()
        month = now.getMonth() + 1
        day = now.getDate()
      }
    }
    
    this.updateMonths(year)
    this.updateDays(year, month)
    this.setData({
      showDatePicker: true,
      datePickerType: type,
      datePickerTitle: title,
      selectedYear: year,
      selectedMonth: month,
      selectedDay: day
    })
    this.updateWheelTransforms()
  },

  closeDatePicker: function() {
    this.setData({ showDatePicker: false })
  },

  confirmDate: function() {
    const { datePickerType, selectedYear, selectedMonth, selectedDay } = this.data
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    this.setData({
      [datePickerType === 'birth' ? 'birthDate' : 'homeDate']: dateStr,
      showDatePicker: false
    })
  },

  onTouchStart: function(e) {
    const wheelIndex = parseInt(e.currentTarget.dataset.wheel)
    const touch = e.touches[0]
    const newTouchStartY = [...this.data.touchStartY]
    const newTouchStartOffset = [...this.data.touchStartOffset]
    newTouchStartY[wheelIndex] = touch.clientY
    newTouchStartOffset[wheelIndex] = this.data.wheelOffsets[wheelIndex]
    this.setData({
      touchStartY: newTouchStartY,
      touchStartOffset: newTouchStartOffset,
      currentWheel: wheelIndex
    })
  },

  onTouchMove: function(e) {
    if (this.data.currentWheel < 0) return
    
    const wheelIndex = this.data.currentWheel
    const touch = e.touches[0]
    const deltaY = touch.clientY - this.data.touchStartY[wheelIndex]
    
    const pxToRpx = this.data.pxToRpx || 2
    let newOffset = this.data.touchStartOffset[wheelIndex] + deltaY * pxToRpx
    
    let dataList = []
    let selectedKey = ''
    if (wheelIndex === 0) {
      dataList = this.data.years
      selectedKey = 'selectedYear'
    } else if (wheelIndex === 1) {
      dataList = this.data.months
      selectedKey = 'selectedMonth'
    } else {
      dataList = this.data.days
      selectedKey = 'selectedDay'
    }
    
    const maxOffset = 110
    const minOffset = 110 - (dataList.length - 1) * 110
    
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset))
    
    let selectedIndex = Math.round((110 - newOffset) / 110)
    selectedIndex = Math.max(0, Math.min(dataList.length - 1, selectedIndex))
    const newValue = dataList[selectedIndex]
    
    const wheelOffsets = [...this.data.wheelOffsets]
    wheelOffsets[wheelIndex] = newOffset
    
    this.setData({
      wheelOffsets,
      [selectedKey]: newValue
    })
  },

  onTouchEnd: function() {
    if (this.data.currentWheel < 0) return
    
    const wheelIndex = this.data.currentWheel
    const itemHeight = 110
    const offset = this.data.wheelOffsets[wheelIndex]
    
    let selectedIndex = Math.round((110 - offset) / itemHeight)
    
    let dataList = []
    let selectedKey = ''
    
    if (wheelIndex === 0) {
      dataList = this.data.years
      selectedKey = 'selectedYear'
    } else if (wheelIndex === 1) {
      dataList = this.data.months
      selectedKey = 'selectedMonth'
    } else {
      dataList = this.data.days
      selectedKey = 'selectedDay'
    }
    
    selectedIndex = Math.max(0, Math.min(dataList.length - 1, selectedIndex))
    const finalOffset = 110 - selectedIndex * itemHeight
    
    const wheelOffsets = [...this.data.wheelOffsets]
    wheelOffsets[wheelIndex] = finalOffset
    
    const newValue = dataList[selectedIndex]
    const updateData = {
      wheelOffsets: wheelOffsets,
      [selectedKey]: newValue,
      currentWheel: -1
    }
    
    if (wheelIndex === 0) {
      const newYear = newValue
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      const maxMonth = newYear < currentYear ? 12 : currentMonth
      const newMonths = []
      for (let i = 1; i <= maxMonth; i++) newMonths.push(i)
      updateData.months = newMonths

      let validMonth = this.data.selectedMonth
      validMonth = Math.min(validMonth, maxMonth)
      updateData.selectedMonth = validMonth

      let maxDay = new Date(newYear, validMonth, 0).getDate()
      if (newYear === currentYear && validMonth === currentMonth) {
        maxDay = Math.min(maxDay, now.getDate())
      }
      const newDays = []
      for (let i = 1; i <= maxDay; i++) newDays.push(i)
      updateData.days = newDays

      let validDay = Math.min(this.data.selectedDay, maxDay)
      let validDayIndex = newDays.indexOf(validDay)
      if (validDayIndex < 0) validDayIndex = 0
      updateData.selectedDay = validDay

      wheelOffsets[1] = 110 - newMonths.indexOf(validMonth) * itemHeight
      wheelOffsets[2] = 110 - validDayIndex * itemHeight
      updateData.wheelOffsets = wheelOffsets
    } else if (wheelIndex === 1) {
      const newMonth = newValue
      const year = this.data.selectedYear
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      let maxDay = new Date(year, newMonth, 0).getDate()
      if (year === currentYear && newMonth === currentMonth) {
        maxDay = Math.min(maxDay, now.getDate())
      }
      const newDays = []
      for (let i = 1; i <= maxDay; i++) newDays.push(i)
      updateData.days = newDays

      let validDay = Math.min(this.data.selectedDay, maxDay)
      let validDayIndex = newDays.indexOf(validDay)
      if (validDayIndex < 0) validDayIndex = 0
      updateData.selectedDay = validDay

      wheelOffsets[2] = 110 - validDayIndex * itemHeight
      updateData.wheelOffsets = wheelOffsets
    }
    
    this.setData(updateData)
  },

  showToast: function(text, duration) {
    const dur = duration || 1500
    this.setData({ toastVisible: true, toastText: text })
    clearTimeout(this._toastTimer)
    this._toastTimer = setTimeout(() => {
      this.setData({ toastVisible: false })
    }, dur)
  },

  onSave: function() {
    if (!this.data.petImage) {
      this.showToast('请上传宠物图片')
      return
    }
    if (!this.data.petName || !this.data.petName.trim()) {
      this.showToast('请输入名称')
      return
    }
    if (!this.data.breed) {
      this.showToast('请选择品种')
      return
    }
    if (!this.data.birthDate) {
      this.showToast('请选择出生日期')
      return
    }
    if (!this.data.homeDate) {
      this.showToast('请选择到家日期')
      return
    }

    const petInfo = {
      petImage: this.data.petImage,
      petName: this.data.petName.trim(),
      breed: this.data.breed,
      gender: this.data.gender,
      neutered: this.data.neutered,
      birthDate: this.data.birthDate,
      homeDate: this.data.homeDate
    }
    wx.setStorageSync('petInfo', petInfo)

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
