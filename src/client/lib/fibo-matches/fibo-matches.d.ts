interface WorkerParameters {
  values: number[],
  edgeSize: number,
  matchLength: number,
}

interface MatchInstance {
  startIndex: number
  sequence: number[]
}