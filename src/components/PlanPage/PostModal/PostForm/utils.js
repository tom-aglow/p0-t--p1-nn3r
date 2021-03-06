import React from 'react'
import moment from 'moment'
import facebook from './Checkbox/facebook.png'
import instagram from './Checkbox/instagram.png'
import googleplus from './Checkbox/googleplus.png'
import twitter from './Checkbox/twitter.png'

function generateNumbersArr(num) {
  const arr = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < num; i++) {
    const item = i < 10 ? `0${i}` : i.toString()
    arr.push(item)
  }
  return arr
}

function renderOptions(arr) {
  return arr.map(item => (
    //  eslint-disable-next-line react/jsx-filename-extension
    <option value={item} key={item}>
      {item}
    </option>
  ))
}

function renderHoursOptions() {
  return renderOptions(generateNumbersArr(24))
}

function renderMinutesOptions() {
  return renderOptions(generateNumbersArr(60))
}

function getIconPath(media) {
  const icons = {
    facebook,
    twitter,
    instagram,
    googleplus,
  }
  return icons[media] || null
}

function mapToCheckboxComponent({ checkedMedia, Component, cb, disabled }) {
  return function mapper(media) {
    const checked = checkedMedia.includes(media)
    return (
      <Component
        media={media}
        smPath={getIconPath(media)}
        checked={checked}
        onChange={cb}
        key={media}
        disabled={disabled}
      />
    )
  }
}

function getHours(time) {
  if (time === 'new') return moment().format('HH')
  return time.slice(0, time.indexOf(':'))
}

function getMinutes(time) {
  if (time === 'new') return moment().format('mm')
  return time.slice(time.indexOf(':') + 1)
}

function filterOut(term) {
  return function filterFn(item) {
    return item !== term
  }
}

function getApiCallback(api, action) {
  switch (action) {
    case 'add':
      return api.addPost
    case 'update':
      return api.updatePost
    case 'delete':
      return api.deletePost
    default:
      return api
  }
}

export {
  renderHoursOptions,
  renderMinutesOptions,
  getIconPath,
  mapToCheckboxComponent,
  getHours,
  getMinutes,
  filterOut,
  getApiCallback,
}
