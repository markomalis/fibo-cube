type Cube = number[]

interface CubeCoordinates {
  x: number
  y: number
}

interface FlatCube {
  update: (x: number, y: number, edgeSize: number, values: Cube) => Cube
  xyToIndex: (x: number, y: number, edgeSize: number) => number
  indexToXy: (index: number, edgeSize: number) => CubeCoordinates
}