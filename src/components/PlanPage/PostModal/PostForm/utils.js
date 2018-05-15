import React from 'react'

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

export { renderHoursOptions, renderMinutesOptions }
