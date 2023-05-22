// Generate a random UUID - Thanks ChatGPT!
function generateRandomNumber(
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER
) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { generateRandomNumber }
