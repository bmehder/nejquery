import { log, pipe, spread, sum } from './index.js'

const categories = new Map([
	['utils', 14],
	['debugging', 12],
	['array', 50],
	['number', 21],
	['string', 22],
	['predicates', 29],
	['objects', 6],
	['helpers', 22],
])

const nejquery_philosophy = `
  Get rid of the dots.
  Curry the functions.
  The data comes last.
`

pipe(spread, sum, log)(categories.values())
