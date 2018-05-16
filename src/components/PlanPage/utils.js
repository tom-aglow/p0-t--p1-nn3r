function isObjEmpty(obj) {
  return Object.keys(obj).length === 0
}

function reduceToNewState(prevState, { payload, type }) {
  switch (type) {
    case 'update':
      return updateDataInState(prevState, payload)
    case 'add':
      return addDataInState(prevState, payload)
    default:
      return prevState
  }
}

function updateDataInState(prevState, params) {
  const date = params.date.format('YYYY-MM-DD')
  const prevDate = params.prevDate.format('YYYY-MM-DD')
  const { text, time, media } = params

  return {
    data: {
      ...prevState.data,
      [prevDate]: {
        ...(prevState.data[prevDate] || {}),
        posts: {
          ...(prevState.data[prevDate] ? prevState.data[prevDate].posts : {}),
          [params.id]: {},
        },
      },
      [date]: {
        ...(prevState.data[date] || {}),
        posts: {
          ...(prevState.data[date] ? prevState.data[date].posts : {}),
          [params.id]: {
            text,
            time,
            media,
          },
        },
      },
    },
  }
}

function addDataInState(prevState, params) {
  const date = params.date.format('YYYY-MM-DD')
  const { text, time, media } = params
  const id = `id-${new Date().valueOf()}`

  return {
    data: {
      ...prevState.data,
      [date]: {
        ...(prevState.data[date] || {}),
        posts: {
          ...(prevState.data[date] ? prevState.data[date].posts : {}),
          [id]: {
            text,
            time,
            media,
          },
        },
      },
    },
  }
}

export { isObjEmpty, reduceToNewState }
