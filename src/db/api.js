/* eslint-disable import/prefer-default-export */
import data from './data'

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export { getData }
