// dateFormat 方法中，匹配日期格式
const DATE_FORMAT_REG = /(YY|MM|DD|hh|mm|ss)/g
const Utils = {
  searchAssign (origin = {}, values = {}, ...params) {
    const tempValue = Object.assign({}, values)
    if (params && params.length) {
      params.forEach((item) => {
        Object.assign(tempValue, item)
      })
    }
    if (Object.keys(tempValue).length) {
      for (const key in tempValue) {
        if (Utils.isNotEmpty(tempValue[key]) && Utils.isNotEmpty(String(tempValue[key]))) {
          origin[key] = tempValue[key]
        } else {
          delete origin[key]
        }
      }
    } else {
      for (const key in origin) {
        if (!Utils.isNotEmpty(origin[key])) {
          delete origin[key]
        }
      }
    }
    return origin
  },
  isNotEmpty (value) {
    switch (typeof (value)) {
      case 'undefined': {
        return false
      }

      case 'string': {
        return value.length !== 0
      }

      case 'object': {
        if (Array.isArray(value)) {
          return value.length !== 0
        } else if (value === null) {
          return false
        } else {
          return Object.keys(value).length !== 0
        }
      }

      default: {
        return true
      }
    }
  },
  getDate (date) {
    var nowDate = date || new Date()
    return {
      Y: nowDate.getFullYear(),
      M: nowDate.getMonth(),
      D: nowDate.getDate()
    }
  },
  padStart (string = '', maxlength = 0, fillStrIng = '0') {
    while (string.length < maxlength) {
      string = fillStrIng + string
    }
    return string
  },
  formartTime (date, format = 'YY-MM-DD') {
    var _date = Utils.getDate(date)
    const _newDate = {
      YY: String(_date.Y),
      MM: Utils.padStart(String(_date.M + 1), 2, '0'),
      DD: Utils.padStart(String(_date.D), 2, '0'),
      hh: Utils.padStart(String(_date.h), 2, '0'),
      mm: Utils.padStart(String(_date.min), 2, '0'),
      ss: Utils.padStart(String(_date.s), 2, '0')
    }

    return format.replace(DATE_FORMAT_REG, function (match, p) {
      return _newDate[p]
    })
  }
}
export default Utils
