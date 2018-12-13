import { updateInline, updateWithStep } from './update'

export function indexToXy(index: number, edgeSize: number): CubeCoordinates {
  const modulo = index % edgeSize
  return {
    x: (index - modulo) / edgeSize,
    y: modulo
  }
}

export function resetXy(x: number, y: number, edgeSize: number, values: Cube): void {
  const index = xyToIndex( x, y, edgeSize )
  values[index] = 0
}

export function update( x: number, y: number, edgeSize: number, values: Cube ): Cube {
  const inlineBase = x * edgeSize
  const stepBase = y
  const index = xyToIndex( x, y , edgeSize)

  updateInline({ values, edgeSize, base: inlineBase })
  updateWithStep({ values, edgeSize, base: stepBase })
  values[index] = values[index] - 1

  return values
}

export function xyToIndex( x: number, y: number, edgeSize: number ): number {
  return x * edgeSize + y
}