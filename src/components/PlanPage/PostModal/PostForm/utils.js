import React from 'react'
import facebook from './Checkbox/facebook.png'
import instagram from './Checkbox/instagram.png'
import googleplus from './Checkbox/googleplus.png'
import twitter from './Checkbox/twitter.png'

function generateNumbersArr(num) {
  const arr = []
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

function mapToCheckboxComponent({ checkedMedia, Component, cb }) {
  return function mapper(media) {
    const checked = checkedMedia.includes(media)
    return (
      <Component
        media={media}
        smPath={getIconPath(media)}
        checked={checked}
        onChange={cb}
        key={media}
      />
    )
  }
}

function getHours(time) {
  return time.slice(0, time.indexOf(':'))
}

function getMinutes(time) {
  return time.slice(time.indexOf(':') + 1)
}

function filterOut(term) {
  return function filterFn(item) {
    return item !== term
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
}
