import { log, pipe, spread, sum } from './index.js'

const categories = new Map([
  ['utils', 11],
  ['debugging', 12],
  ['array', 47],
  ['number', 19],
  ['string', 22],
  ['predicates', 27],
  ['objects', 6],
  ['helpers', 16],
])

const nejquery_philosophy = `
  Get rid of the dots.
  Curry the functions.
  The data comes last.
`

pipe(spread, sum, log)(categories.values())

// TODO: isPropEq (propEq)