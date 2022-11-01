export function deepFormatStringToDate(data, isDate = false) {
  if (data instanceof Array) {
    return data.map(d => deepFormatStringToDate(d))
  }

  if (data instanceof Object) {
    const formatData = {}
    Object.keys(data).forEach(key => {
      if (key.includes('date') || key.includes('Date') ||
          key.includes('time') || key.includes('time')) {
        formatData[key] = deepFormatStringToDate(data[key], true)
      } else {
        formatData[key] = deepFormatStringToDate(data[key], false)
      }
    })
    return formatData
  }

  if (isDate) {
    if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
      let x = new Date(data)
      if (x instanceof Date && !isNaN(x)) return x
      else return data
    }
  }

  return data
}