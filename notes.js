const categories = new Map([
  ['utils', 5],
  ['debugging', 10],
  ['array', 39],
  ['number', 17],
  ['string', 20],
  ['predicates', 26],
  ['objects', 5],
  ['helpers', 8],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))