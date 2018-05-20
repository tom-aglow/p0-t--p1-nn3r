import moment from 'moment'
import { isInThePast } from 'components/PlanPage/utils'

const MS_PER_DAY = 1000 * 60 * 60 * 24
const NUMERALS = ['first', 'second', 'third']

function getWeekdayName(day) {
  return moment.weekdays(moment(day).weekday() + 1)
}

function formatDay(day) {
  if (isToday(day)) return 'Today'
  if (isTomorrow(day)) return 'Tomorrow'
  if (isYesterday(day)) return 'Yesterday'
  return moment(day).format('MMM D')
}

function formatTime(time) {
  return moment(time, ['h:m', 'H:m']).format('LT')
}

function isToday(day) {
  const now = new Date()
  const dayObj = new Date(day)
  return dateDiffInDays(now, dayObj) === 0
}

function isTomorrow(day) {
  const now = new Date()
  const dayObj = new Date(day)
  return dateDiffInDays(now, dayObj) === 1
}

function isYesterday(day) {
  const now = new Date()
  const dayObj = new Date(day)
  return dateDiffInDays(now, dayObj) === -1
}

function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / MS_PER_DAY)
}

function reduceToSlotsObject(day) {
  return function reducer(obj, item, index) {
    if (isInThePast(day, item)) return obj
    return {
      ...obj,
      [item]: { type: 'slot', text: `${NUMERALS[index]} slot`, time: item },
    }
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
    if (!posts[key]) return accObj

    const obj = {
      [posts[key].time]: {
        id: key,
        type: 'post',
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
  isToday,
}
