const fiboByIndex: { [n: number]: number } = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7: 13,
  8: 21,
  9: 34,
  10: 55,
  11: 89,
  12: 144,
  13: 233,
  14: 377,
  15: 610,
  16: 987,
  17: 1597,
  18: 2584,
  19: 4181,
  20: 6765,
}

const indexOfFibo: { [n: number]: number } = {
  1: 1,
  2: 3,
  3: 4,
  5: 5,
  8: 6,
  13: 7,
  21: 8,
  34: 9,
  55: 10,
  89: 11,
  144: 12,
  233: 13,
  377: 14,
  610: 15,
  987: 16,
  1597: 17,
  2584: 18,
  4181: 19,
  6765: 20,
}

export function fiboIndexOf(fibo: number): number {
  return indexOfFibo[fibo]
}

export function isFiboSequence({ values, startIndex, fiboIndex, length }: { values: number[], startIndex: number, fiboIndex: number, length: number }): any {
  const sequence = []
  for(let i = 0;i<length;i++) {
    if(!(fiboByIndex[fiboIndex+i] === values[startIndex+i])) {
      return undefined
    }
    sequence.push(startIndex+i)
  }
  return {
    startIndex,
    sequence,
  }
}

export default function({ values, edgeSize, matchLength }: WorkerParameters): number[] {
  const lastValidMatchIndex = edgeSize - matchLength
  return checkMatches(values)
    .filter((match) => match.startIndex % edgeSize <= lastValidMatchIndex)
    .reduce((matches: number[], match) => ([ ...matches, ...match.sequence ]), [])
}

function checkMatches(values: number[]): MatchInstance[] {
  let results: MatchInstance[] = []

  for(let i = 0;i<values.length;i++) {
    const value = values[i]
    const fiboIndex = fiboIndexOf(value)
    const sequence = fiboIndexOf(value) && isFiboSequence({ values, startIndex: i, fiboIndex, length: 5 })
    if(sequence) {
      results.push(sequence)
    }
  }

  return results
}
