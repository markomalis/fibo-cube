import flatCubes from '../flat-cubes'
import fiboMatches from '../fibo-matches'

export default function(edgeSize: number, matchLength: number): FiboCube {
  const hValues = new Array(edgeSize * edgeSize)
  const h_rValues = new Array(edgeSize * edgeSize)
  const vValues = new Array(edgeSize * edgeSize)
  const v_rValues = new Array(edgeSize * edgeSize)

  const getMatches = (): number[] => {
    const allMatches = [
      ...fiboMatches({ values: hValues, edgeSize, matchLength }).map(match => h2xy(match, edgeSize)),
      ...fiboMatches({ values: h_rValues, edgeSize, matchLength }).map(match => hr2xy(match, edgeSize)),
      ...fiboMatches({ values: vValues, edgeSize, matchLength }).map(match => v2xy(match, edgeSize)),
      ...fiboMatches({ values: v_rValues, edgeSize, matchLength }).map(match => vr2xy(match, edgeSize)),
    ]

    allMatches.forEach(({ x, y }) => flatCubes.horizontal.resetXy(x,y,edgeSize, hValues))
    allMatches.forEach(({ x, y }) => flatCubes.horizontalReverse.resetXy(x,y,edgeSize, h_rValues))
    allMatches.forEach(({ x, y }) => flatCubes.vertical.resetXy(x,y,edgeSize,vValues))
    allMatches.forEach(({ x, y }) => flatCubes.verticalReverse.resetXy(x,y,edgeSize,v_rValues))

    return allMatches
      .map(({ x, y }) => flatCubes.horizontal.xyToIndex(x, y, edgeSize))
  }


  const update = (x: number, y: number): void => {
    flatCubes.horizontal.update(x,y,edgeSize,hValues)
    flatCubes.horizontalReverse.update(x,y,edgeSize,h_rValues)
    flatCubes.vertical.update(x,y,edgeSize,vValues)
    flatCubes.verticalReverse.update(x,y,edgeSize,v_rValues)
  }

  const updateCube = (x: number, y: number): number[] => {
    update(x, y)
    return getMatches()
  }

  return {
    updateCube,
    values: hValues,
  }
}

function h2xy(index: number, edgeSize: number): CubeCoordinates {
  return flatCubes.horizontal.indexToXy(index, edgeSize)
}

function hr2xy(index: number, edgeSize: number): CubeCoordinates {
  return flatCubes.horizontalReverse.indexToXy(index, edgeSize)
}

function v2xy(index: number, edgeSize: number): CubeCoordinates {
  return flatCubes.vertical.indexToXy(index, edgeSize)
}

function vr2xy(index: number, edgeSize: number): CubeCoordinates {
  return flatCubes.verticalReverse.indexToXy(index, edgeSize)
}