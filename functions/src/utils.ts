export const convertJST = (utcDate: string) => {
  const time = new Date(utcDate)
  time.setHours(time.getHours() + 9)
  return time.toLocaleString('ja-JP').slice(0, -3)
}
