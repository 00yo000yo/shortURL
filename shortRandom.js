const characters =
  "0918467523abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

module.exports = (num) => {
  let result = ""
  for (let i = 0; i < num; i++) {
    result += characters[Math.floor(Math.random() * characters.length)]
  }
  return result
}
