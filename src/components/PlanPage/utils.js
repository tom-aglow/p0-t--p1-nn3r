import moment from 'moment'

function isObjEmpty(obj) {
  return Object.keys(obj).length === 0
}

function reduceToNewState(prevState, { payload, type }) {
  const { text, time, media, date, id, prevDate } = payload
  const obj = { text, time, media }

  switch (type) {
    case 'update': {
      const clearPrevDate =
        date !== prevDate
          ? updateState(prevState, {
              date: prevDate,
              id,
              obj: null,
            })
          : prevState
      return updateState(clearPrevDate, { date, id, obj })
    }
    case 'add': {
      const newId = `id-${new Date().valueOf()}`
      return updateState(prevState, { date, id: newId, obj })
    }
    case 'delete':
      return updateState(prevState, { date, id, obj: null })
    default:
      return prevState
  }
}

function updateState(prevState, params) {
  const { date, id, obj } = params

  return {
    data: {
      ...prevState.data,
      [date]: {
        ...(prevState.data[date] || {}),
        posts: {
          ...(prevState.data[date] ? prevState.data[date].posts : {}),
          [id]: obj,
        },
      },
    },
  }
}

function isInThePast(date = moment().format('YYYY-MM-DD'), time = '00:00') {
  if (time === 'new') return false
  const selectedDate = moment(`${date} ${time}`)
  const now = moment()
  return selectedDate.diff(now) < 0
}

export { isObjEmpty, reduceToNewState, isInThePast }
