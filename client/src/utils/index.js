export const daysLeft = (deadline) => {
  const diff = new Date(deadline).getTime() - Date.now()
  const remaining = diff / (1000 * 3600 * 24)
  return remaining.toFixed(0)
}

export const calcBarPercentage = (goal, raisedAmount) => {
  const p = Math.round((raisedAmount * 100) / goal)
  return p
}

export const checkIfImage = (url, cb) => {
  const img = new Image()
  img.src = url

  if (img.complete) cb(true)
  img.onload = () => cb(true)
  img.onerror = () => cb(false)
}
