const categories = new Map([
  ['utils', 5],
  ['debugging', 10],
  ['array', 40],
  ['number', 17],
  ['string', 21],
  ['predicates', 27],
  ['objects', 5],
  ['helpers', 13],
])


console.log([...categories.values()].reduce((acc, item) => acc + item))