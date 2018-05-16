function isObjEmpty(obj) {
  return Object.keys(obj).length === 0
}

function reduceToNewState(prevState, { payload, type }) {
  const { text, time, media, date, id, prevDate } = payload
  const obj = { text, time, media }

  switch (type) {
    case 'update': {
      const clearPrevDate = updateState(prevState, {
        date: prevDate,
        id,
        obj: null,
      })
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

export { isObjEmpty, reduceToNewState }
