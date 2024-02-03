const categories = new Map([
  ['utils', 6],
  ['debugging', 10],
  ['array', 35],
  ['number', 16],
  ['string', 22],
  ['predicates', 27],
  ['objects', 5],
  ['helpers', 12],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))