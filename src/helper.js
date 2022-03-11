// Fetch data by url
export const fetchGetData = async (url) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
    return null
  }
}
// Fetch data
export const fetchData = async (url, requestOptions) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, requestOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message)
    return null
  }
}


// Check if the day is a weekend (Bangladesh)
export const isWeekend = (date) => {
  return date.day() === 5 || date.day() === 6
}

// Check if the day is friday
export const isFriday = (date) => {
  return date.day() === 5
}

// Check if the day is saturday
export const isSaturday = (date) => {
  return date.day() === 6
}

// make keyword search
export const makeKeywordSearch = (keyword) => {
  const reservedSymbols = ['-', '+', '<', '>', '@', '(', ')', '~', '*', '?', ':', '"', '\'', '&', '$', '#', '%', '^', '{', '}', '[', ']', '|', '\\', '/', '_', '.']
  keyword = keyword.replace(reservedSymbols, "")
  keyword = keyword.toLowerCase()
  keyword = keyword.replace(/[^A-Za-z0-9-]/g, " ")
  return keyword
}
