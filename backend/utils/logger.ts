export const info = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

export const error = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}
