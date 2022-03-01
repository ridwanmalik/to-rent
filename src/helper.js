// Fetch data by url
export const fetchDataByUrl = async (url) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`)
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
