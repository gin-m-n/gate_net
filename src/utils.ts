export const convertCoordinate = (w: number, h: number, docX: number, docY: number) => {
  const x = docX - w / 2
  const y = -(docY - h / 2)
  return [x, y]
}
