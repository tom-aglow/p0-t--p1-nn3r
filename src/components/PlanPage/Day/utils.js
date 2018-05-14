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
  const date = new Date(`1970-01-01 ${time}`)
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

function reduceToSlotsObject(obj, item, index) {
  return { ...obj, [item]: { type: 'slot', text: `${NUMERALS[index]} slot` } }
}

function getNewPostObj() {
  return {
    new: {
      type: 'slot',
      text: 'Shedule post on this day',
    },
  }
}

function sortStringsAsc(a, b) {
  return a.localeCompare(b)
}

export {
  getWeekdayName,
  formatDay,
  reduceToSlotsObject,
  sortStringsAsc,
  formatTime,
  getNewPostObj,
}
