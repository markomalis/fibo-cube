import { updateInline, updateWithStep } from './update'

export function indexToXy(index: number, edgeSize: number): CubeCoordinates {
  const invertedIndex = (edgeSize * edgeSize - 1) - index
  const modulo = invertedIndex % edgeSize
  return {
    x: modulo,
    y: (invertedIndex - modulo) / edgeSize,
  }
}

export function resetXy(x: number, y: number, edgeSize: number, values: Cube): void {
  const index = xyToIndex( x, y, edgeSize )
  values[index] = 0
}

export function update( x: number, y: number, edgeSize: number, values: Cube ): Cube {
  const inlineBase = y * edgeSize
  const stepBase = x
  const index = xyToIndex(x,y,edgeSize)

  values.reverse()
  updateInline({ values, edgeSize, base: inlineBase })
  updateWithStep({ values, edgeSize, base: stepBase })
  values.reverse()
  values[index] = values[index] - 1

  return values
}

export function xyToIndex( x: number, y: number, edgeSize: number ): number {
  return (edgeSize * edgeSize - 1) - (y * edgeSize + x)
}