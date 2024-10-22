// File: utils/calculations.ts
export const decimalToFraction = (decimal: number): string => {
  if (decimal === 0) return '0'
  if (decimal === 1) return '1'
  
  const tolerance = 1.0E-6
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1
  let b = decimal
  do {
    let a = Math.floor(b)
    let aux = h1
    h1 = a * h1 + h2
    h2 = aux
    aux = k1
    k1 = a * k1 + k2
    k2 = aux
    b = 1 / (b - a)
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance)

  return `${h1}/${k1}`
}
