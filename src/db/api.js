/* eslint-disable import/prefer-default-export */
import data from './data'

const SERVER_RESPONSE_DELAY = 1000

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, SERVER_RESPONSE_DELAY)
  })
}

function updatePost() {
  return new Promise(resolve => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('post was updated')
      resolve()
    }, SERVER_RESPONSE_DELAY)
  })
}

function addPost() {
  return new Promise(resolve => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('post was added')
      resolve()
    }, SERVER_RESPONSE_DELAY)
  })
}

function deletePost() {
  return new Promise(resolve => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('post was deleted')
      resolve()
    }, SERVER_RESPONSE_DELAY)
  })
}

export default {
  getData,
  updatePost,
  addPost,
  deletePost,
}
