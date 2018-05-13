/* eslint-disable import/prefer-default-export */
import data from './data'

const SERVER_RESPONSE_DELAY = 0

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, SERVER_RESPONSE_DELAY)
  })
}

export default { getData }
