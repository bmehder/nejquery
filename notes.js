const categories = new Map([
  ['utils', 5],
  ['debugging', 10],
  ['array', 39],
  ['number', 16],
  ['string', 22],
  ['predicates', 26],
  ['objects', 5],
  ['helpers', 5],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))