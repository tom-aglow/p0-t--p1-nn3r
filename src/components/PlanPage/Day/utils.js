const MS_PER_DAY = 1000 * 60 * 60 * 24
const NUMERALS = ['first', 'second', 'third']

function getWeekdayName(day) {
  const options = { weekday: 'long' }
  return day.toLocaleDateString('en-US', options)
}

function formatDay(day) {
  if (isToday(day)) return 'Today'
  if (isTomorrow(day)) return 'Tomorrow'
  if (isYesterday(day)) return 'Yesterday'
  const options = { month: 'long', day: 'numeric' }
  return day.toLocaleDateString('en-US', options)
}

function formatTime(time) {
  const date = parseTime(time)
  const options = { hour: '2-digit', minute: '2-digit' }
  return date.toLocaleTimeString('en-US', options)
}

function isToday(day) {
  const now = new Date()
  return dateDiffInDays(now, day) === 0
}

function isTomorrow(day) {
  const now = new Date()
  return dateDiffInDays(now, day) === 1
}

function isYesterday(day) {
  const now = new Date()
  return dateDiffInDays(now, day) === -1
}

function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / MS_PER_DAY)
}

function parseTime(timeStr) {
  const date = new Date()
  const time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/)
  date.setHours(parseInt(time[1], 10) + (time[3] ? 12 : 0))
  date.setMinutes(parseInt(time[2], 10) || 0)
  return date
}

function reduceToSlotsObject(obj, item, index) {
  return {
    ...obj,
    [item]: { type: 'slot', text: `${NUMERALS[index]} slot`, time: item },
  }
}

function getNewPostObj() {
  return {
    new: {
      type: 'slot',
      text: 'Shedule post on this day',
      time: 'new',
    },
  }
}

function sortStringsAsc(a, b) {
  return a.localeCompare(b)
}

function reduceToTimeKey(posts) {
  return function reducer(accObj, key) {
    const obj = {
      [posts[key].time]: {
        id: key,
        ...posts[key],
      },
    }
    return { ...accObj, ...obj }
  }
}

export {
  getWeekdayName,
  formatDay,
  reduceToSlotsObject,
  sortStringsAsc,
  formatTime,
  getNewPostObj,
  reduceToTimeKey,
}
