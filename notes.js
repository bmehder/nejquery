const categories = new Map([
  ['utils', 5],
  ['debugging', 10],
  ['array', 38],
  ['number', 16],
  ['string', 18],
  ['predicates', 26],
  ['helpers', 15],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))