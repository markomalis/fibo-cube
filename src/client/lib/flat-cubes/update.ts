function updateCell(index: number, values: number[]) {
  const currentValue = values[index] || 0

  values[index] = currentValue + 1
}

export function updateInline({ base, edgeSize, values }: any) {
  for(let i=base;i<base+edgeSize;i++) {
    updateCell(i, values)
  }
}

export function updateWithStep({ base, edgeSize, values }: any) {
  for(let i=base;i<values.length;i=i+edgeSize) {
    updateCell(i, values)
  }
}
