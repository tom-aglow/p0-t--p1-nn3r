function formatTime(time) {
  const date = new Date(`1970-01-01 ${time}`)
  const options = { hour: '2-digit', minute: '2-digit' }
  return date.toLocaleTimeString('en-US', options)
}

export { formatTime }
