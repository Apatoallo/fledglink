const getMonthAndfullYear = (val) => {
  if(val) {
    let date = new Date(val)
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = monthArray[date.getMonth()]
    let fullYear = date.getFullYear()
    return `${month} ${fullYear}`
  } else {
    return 'Present'
  } 
  }

export default getMonthAndfullYear;