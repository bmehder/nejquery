const categories = new Map([
  ['utils', 5],
  ['debugging', 10],
  ['array', 37],
  ['number', 16],
  ['string', 17],
  ['predicates', 26],
  ['helpers', 15],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))