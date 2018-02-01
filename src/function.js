const popHash = (str, symbol) => (str.split(symbol || '#').pop())
const countUnread = (obj, valible) => {
  // const valible = 'patientAcknowledgeDateTime'
  let count = 0
  obj.forEach((key) => {
    !key[valible] && count++
  })
  return count
}

export const _function = {
  popHash,
  countUnread
}
