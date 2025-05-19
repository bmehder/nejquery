## Table of Contents

- [Array functions](#array-functions)
- [Number functions](#number-functions)
- [String functions](#string-functions)
- [Objects](#objects)
- [Utils](#utils)
- [Debugging functions](#debugging-functions)
- [Predicates](#predicates)
- [Helpers](#helpers)


## Array functions

### `at`

**Description:**  
Returns the element at the specified index in an array. Supports negative indexing.

```js
export const at = x => xs => xs.at(x)
```

```js
at(-1)([1, 2, 3]) // => 3
```

---

### `chunk`

**Description:**  
Splits an array into chunks of a specified size.

```js
export const chunk = size => xs => {
  const result = []
  for (let i = 0; i < xs.length; i += size) {
    result.push(xs.slice(i, i + size))
  }
  return result
}
```

```js
chunk(2)([1, 2, 3, 4, 5]) // => [[1, 2], [3, 4], [5]]
```

---

### `concat`

**Description:**  
Concatenates two arrays.

```js
export const concat = a => b => a.concat(b)
```

```js
concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
```

---

### `compact`

**Description:**
Removes all falsy values (`false`, `0`, `''`, `null`, `undefined`, `NaN`) from an array.

```js
export const compact = xs => xs.filter(Boolean)
```

```js
compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]
```

---


### `cons`

**Description:**  
Adds an element to the front of an array.

```js
export const cons = x => xs => [x, ...xs]
```

```js
cons(0)([1, 2, 3]) // => [0, 1, 2, 3]
```

---

### `count`

**Description:**  
Counts how many times a specific value appears in an array.

```js
export const count = x => xs => xs.filter(_x => _x === x).length
```

```js
count(2)([1, 2, 2, 3]) // => 2
```

---
### `difference`

**Description:**  
Returns a new array with elements from the first array that are not in the second.

```js
export const difference = x => y => x.filter(_x => !y.includes(_x))
```

```js
difference([1, 2, 3])([2, 4]) // => [1, 3]
```

---

### `every`

**Description:**  
Checks if all elements in the array satisfy the predicate.

```js
export const every = fn => xs => xs.every(fn)
```

```js
every(x => x > 0)([1, 2, 3]) // => true
```

---

### `filter`

**Description:**  
Returns a new array containing elements that satisfy the predicate.

```js
export const filter = fn => xs => xs.filter(fn ?? identity)
```

```js
filter(x => x > 1)([1, 2, 3]) // => [2, 3]
```

---

### `find`

**Description:**  
Returns the first element that satisfies the predicate.

```js
export const find = fn => xs => xs.find(fn)
```

```js
find(x => x > 2)([1, 2, 3, 4]) // => 3
```

---

### `findAllIndexes`

**Description:**  
Returns all indexes of elements that match the given value.

```js
export const findAllIndexes = arg => xs => {
  const folder = (acc, x, i) => (arg === x ? [...acc, i] : acc)
  return fold(folder)([])(xs)
}
```

```js
findAllIndexes(2)([1, 2, 3, 2, 4]) // => [1, 3]
```

---

### `findIndex`

**Description:**  
Returns the index of the first element that satisfies the predicate.

```js
export const findIndex = fn => xs => xs.findIndex(fn)
```

```js
findIndex(x => x > 2)([1, 2, 3, 4]) // => 2
```

---

### `findLastIndex`

**Description:**  
Returns the index of the last element that satisfies the predicate.

```js
export const findLastIndex = fn => xs => xs.findLastIndex(fn)
```

```js
findLastIndex(x => x % 2 === 0)([1, 2, 3, 4, 5]) // => 3
```

---

### `first`

**Description:**  
Returns the first element in an array.

```js
export const first = xs => xs.at(0)
```

```js
first([1, 2, 3]) // => 1
```

---

### `flat`

**Description:**  
Flattens an array one level deep using the native `flat()` method.

```js
export const flat = x => xs => xs.flat(x)
```

```js
flat(1)([1, [2, 3], [4]]) // => [1, 2, 3, 4]
```

---

### `flatMap`

**Description:**  
Maps each element and flattens the result one level deep.

```js
export const flatMap = fn => xs => xs.flatMap(fn)
```

```js
flatMap(x => [x, x])([1, 2]) // => [1, 1, 2, 2]
```

---

### `flatten`

**Description:**  
Flattens a nested array one level deep.

```js
export const flatten = xs => xs.flat(1)
```

```js
flatten([1, [2, 3]]) // => [1, 2, 3]
```

---

### `flattenAll`

**Description:**  
Recursively flattens a deeply nested array.

```js
export const flattenAll = xs => {
  const fn = (acc, item) =>
    Array.isArray(item) ? [...acc, ...flattenAll(item)] : [...acc, item]

  return fold(fn)([])(xs)
}
```

```js
flattenAll([1, [2, [3, [4]]]]) // => [1, 2, 3, 4]
```

---

### `fold`

**Description:**  
Reduces an array using a binary function and an initial accumulator value.

```js
export const fold = fn => arg => xs => xs.reduce(fn, arg ?? xs[0])
```

```js
fold((a, b) => a + b)(0)([1, 2, 3]) // => 6
```

---

### `forEach`

**Description:**  
Applies a function to each element in the array for side effects.

```js
export const forEach = fn => xs => xs.forEach(fn ?? identity)
```

```js
forEach(console.log)([1, 2, 3])
// logs: 1, 2, 3
```

---
### `getArrayKeys`

**Description:**  
Returns the array of numeric indices from an array.

```js
export const getArrayKeys = xs => [...xs.keys()]
```

```js
getArrayKeys(['a', 'b', 'c']) // => [0, 1, 2]
```

---

### `hasAllElems`

**Description:**  
Checks if all elements of the first array exist in the second.

```js
export const hasAllElems = (xs1, xs2) => xs1.every(x => xs2.includes(x))
```

```js
hasAllElems([1, 2], [1, 2, 3]) // => true
```

---

### `head`

**Description:**  
Returns the first element in an array. Alias for `first`.

```js
export const head = first
```

```js
head([10, 20, 30]) // => 10
```

---

### `includes`

**Description:**  
Checks whether the array includes a given value.

```js
export const includes = x => xs => xs.includes(x)
```

```js
includes(2)([1, 2, 3]) // => true
```

---

### `indexOf`

**Description:**  
Returns the first index at which a given element can be found.

```js
export const indexOf = x => xs => xs.indexOf(x)
```

```js
indexOf(3)([1, 2, 3, 2]) // => 2
```

---

### `intersection`

**Description:**  
Returns a new array containing elements common to both arrays.

```js
export const intersection = x => y => {
  const setY = new Set(y)
  return [...new Set(x)].filter(item => setY.has(item))
}
```

```js
intersection([1, 2, 3, 2])([2, 3, 4]) // => [2, 3]
```

---

### `intersperse`

**Description:**  
Inserts a separator between elements of an array.

```js
export const intersperse = arg => xs => xs.flatMap(x => [x, arg]).slice(0, -1)
```

```js
intersperse('-')(['a', 'b', 'c']) // => ['a', '-', 'b', '-', 'c']
```

---

### `join`

**Description:**  
Joins all elements of an array into a string with a separator.

```js
export const join = x => xs => xs.join(x ?? '')
```

```js
join('-')([1, 2, 3]) // => '1-2-3'
```

---

### `joinArray`

**Description:**  
Joins all elements of an array into a string without any separator.

```js
export const joinArray = join('')
```

```js
joinArray(['a', 'b', 'c']) // => 'abc'
```

---

### `keep`

**Description:**  
Alias for `filter` — keeps values that satisfy a predicate.

```js
export const keep = filter
```

```js
keep(x => x % 2 === 0)([1, 2, 3, 4]) // => [2, 4]
```

---

### `last`

**Description:**  
Returns the last element in an array.

```js
export const last = xs => xs.at(-1)
```

```js
last([1, 2, 3]) // => 3
```

---

### `lastIndexOf`

**Description:**  
Returns the last index at which a given element can be found.

```js
export const lastIndexOf = x => xs => xs.lastIndexOf(x)
```

```js
lastIndexOf(2)([1, 2, 3, 2]) // => 3
```

---

### `map`

**Description:**  
Applies a function to each element in an array.

```js
export const map = fn => xs => xs.map(fn ?? identity)
```

```js
map(x => x * 2)([1, 2, 3]) // => [2, 4, 6]
```

---

### `partition`

**Description:**  
Splits an array into two groups: those that satisfy the predicate and those that don’t.

```js
export const partition = fn => xs =>
  xs.reduce(
    (acc, x) =>
      fn(x) ? [[...acc[0], x], [...acc[1]]] : [[...acc[0]], [...acc[1], x]],
    [[], []]
  )
```

```js
partition(x => x % 2 === 0)([1, 2, 3, 4]) // => [[2, 4], [1, 3]]
```

---

### `push`

**Description:**  
Returns a new array with an item added to the end.

```js
export const push = x => xs => [...xs, x]
```

```js
push(4)([1, 2, 3]) // => [1, 2, 3, 4]
```

---

### `reduce`

**Description:**  
Applies a reducer function to the array, returning a single result.

> ⚠️ Warning: This version of reduce does not take an initial value.
It will throw an error on empty arrays.
For a safer, curried alternative that supports an initial value, use fold instead.

```js
export const reduce = fn => xs => xs.reduce(fn)
```

```js
reduce((a, b) => a + b)([1, 2, 3]) // => 6
// ⚠️ Will throw on empty array:
// reduce((a, b) => a + b)([]) // ❌ TypeError
```

---

### `reject`

**Description:**  
Filters out items that match the predicate.

```js
export const reject = fn => xs => xs.filter(not(fn) ?? identity)
```

```js
reject(x => x > 1)([1, 2, 3]) // => [1]
```

---

### `reverse`

**Description:**  
Returns a reversed copy of the array.

```js
export const reverse = xs => xs.toReversed()
```

```js
reverse([1, 2, 3]) // => [3, 2, 1]
```

---

### `second`

**Description:**  
Returns the second element of the array.

```js
export const second = xs => xs.at(1)
```

```js
second([10, 20, 30]) // => 20
```

---

### `shuffle`

**Description:**  
Randomizes the order of elements in an array using the Fisher–Yates algorithm.

```js
export const shuffle = xs => {
  const arr = [...xs]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
```

```js
shuffle([1, 2, 3]) // => [2, 3, 1] (random order)
```

---

### `slice`

**Description:**  
Extracts a section of the array between two indexes.

```js
export const slice = start => end => strOrNum => strOrNum.slice(start, end)
```

```js
slice(1)(3)([0, 1, 2, 3, 4]) // => [1, 2]
```

---

### `some`

**Description:**  
Checks if at least one item in the array satisfies the predicate.

```js
export const some = fn => xs => xs.some(fn)
```

```js
some(x => x > 2)([1, 2, 3]) // => true
```

---

### `sort`

**Description:**  
Returns a sorted copy of the array using the given compare function.

```js
export const sort = fn => xs => xs.toSorted(fn)
```

```js
sort((a, b) => b - a)([3, 1, 2]) // => [3, 2, 1]
```

---

### `spread`

**Description:**  
Creates a shallow copy of an array using the spread operator.

```js
export const spread = x => [...x]
```

```js
spread([1, 2, 3]) // => [1, 2, 3]
```

---

### `tail`

**Description:**  
Returns all elements of the array except the first.

```js
export const tail = xs => xs.slice(1)
```

```js
tail([1, 2, 3]) // => [2, 3]
```

---

### `take`

**Description:**  
Returns the first `n` elements of the array.

```js
export const take = x => xs => xs.slice(0, x)
```

```js
take(2)([1, 2, 3, 4]) // => [1, 2]
```

---

### `toObject`

**Description:**  
Converts an array of key-value pairs into an object.

```js
export const toObject = Object.fromEntries
```

```js
toObject([['a', 1], ['b', 2]]) // => { a: 1, b: 2 }
```

---

### `union`

**Description:**  
Returns a new array containing the union of two arrays (no duplicates).

```js
export const union = x => y => [...new Set([...x, ...y])]
```

```js
union([1, 2])([2, 3]) // => [1, 2, 3]
```

---

### `uniq`

**Description:**  
Removes duplicate values from an array.

```js
export const uniq = xs => [...new Set(xs)]
```

```js
uniq([1, 2, 2, 3]) // => [1, 2, 3]
```

---

### `unzip`

**Description:**  
Converts an array of pairs into two arrays of firsts and seconds.

```js
const doUnzip = ([xs, ys], [x, y]) => [
  [...xs, x],
  [...ys, y],
]

export const unzip = xs => xs.reduce(doUnzip, [[], []])
```

```js
unzip([[1, 'a'], [2, 'b'], [3, 'c']]) // => [[1, 2, 3], ['a', 'b', 'c']]
```

---

## Number functions

### `abs`

**Description:**  
Returns the absolute value of a number.

```js
export const abs = Math.abs
```

```js
abs(-5) // => 5
```

---

### `add`

**Description:**  
Adds two numbers.

```js
export const add = x => y => x + y
```

```js
add(2)(3) // => 5
```

---

### `ceil`

**Description:**  
Rounds a number upward to the nearest integer.

```js
export const ceil = Math.ceil
```

```js
ceil(1.2) // => 2
```

---

### `dec`

**Description:**  
Decrements a number by 1.

```js
export const dec = x => x - 1
```

```js
dec(3) // => 2
```

---

### `div`

**Description:**  
Divides the first number by the second.

```js
export const div = x => y => x / y
```

```js
div(10)(2) // => 5
```

---

### `divBy`

**Description:**  
Divides the second number by the first.

```js
export const divBy = x => y => y / x
```

```js
divBy(2)(10) // => 5
```

---

### `floor`

**Description:**  
Rounds a number downward to the nearest integer.

```js
export const floor = Math.floor
```

```js
floor(1.8) // => 1
```

---

### `inc`

**Description:**  
Increments a number by 1.

```js
export const inc = x => x + 1
```

```js
inc(3) // => 4
```

---

### `max`

**Description:**  
Returns the largest of the given numbers.

```js
export const max = (...args) => Math.max(...args)
```

```js
max(1, 5, 3) // => 5
```

---

### `min`

**Description:**  
Returns the smallest of the given numbers.

```js
export const min = (...args) => Math.min(...args)
```

```js
min(1, 5, 3) // => 1
```

---

### `mod`

**Description:**  
Returns the remainder of dividing two numbers.

```js
export const mod = x => y => x % y
```

```js
mod(10)(3) // => 1
```

---

### `mul`

**Description:**  
Multiplies two numbers.

```js
export const mul = x => y => x * y
```

```js
mul(3)(4) // => 12
```

---

### `negate`

**Description:**  
Negates a number.

```js
export const negate = x => -x
```

```js
negate(5) // => -5
```

---

### `round`

**Description:**  
Rounds a number to the nearest integer.

```js
export const round = Math.round
```

```js
round(2.6) // => 3
```

---

### `sqrt`

**Description:**  
Returns the square root of a number.

```js
export const sqrt = Math.sqrt
```

```js
sqrt(9) // => 3
```

---

### `square`

**Description:**  
Returns the square of a number.

```js
export const square = x => x * x
```

```js
square(5) // => 25
```

---

### `sub`

**Description:**  
Subtracts the second number from the first.

```js
export const sub = x => y => x - y
```

```js
sub(5)(2) // => 3
```

---

### `subBy`

**Description:**  
Subtracts the first number from the second.

```js
export const subBy = x => y => y - x
```

```js
subBy(2)(5) // => 3
```

---

### `sum`

**Description:**  
Adds up all numbers in the array.

```js
export const sum = xs => xs.reduce((acc, x) => add(acc)(x))
```

```js
sum([1, 2, 3, 4]) // => 10
```

---

### `toFixed`

**Description:**  
Formats a number using fixed-point notation.

```js
export const toFixed = arg => x => x.toFixed(arg)
```

```js
toFixed(2)(3.14159) // => '3.14'
```

---

### `toLocaleString`

**Description:**  
Converts a number to a locale-specific string representation.

```js
export const toLocaleString = arg => x => x.toLocaleString(arg)
```

```js
toLocaleString('en-US')(1234567.89) // => '1,234,567.89'
```

---

## Objects

### `getKeys`

**Description:**  
Returns the enumerable property names of an object.

```js
export const getKeys = Object.keys
```

```js
getKeys({ a: 1, b: 2 }) // => ['a', 'b']
```

---

### `getProp`

**Description:**  
Returns the value of a specified property from an object.

```js
export const getProp = x => obj => obj[x]
```

```js
getProp('name')({ name: 'Alice' }) // => 'Alice'
```

---

### `getValues`

**Description:**  
Returns the enumerable property values of an object.

```js
export const getValues = Object.values
```

```js
getValues({ a: 1, b: 2 }) // => [1, 2]
```

---

### `groupBy`

**Description:**  
Groups elements of an array by a key generated from the provided function.

```js
export const groupBy = fn => obj => Object.groupBy(obj, fn)
```

```js
groupBy(x => x % 2)([1, 2, 3, 4]) // => { '0': [2, 4], '1': [1, 3] }
```

---

### `groupByProp`

**Description:**  
Groups objects in an array by a specified property.

```js
export const groupByProp = x => groupBy(getProp(x))
```

```js
groupByProp('type')([
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
]) // => { fruit: [...], vegetable: [...] }
```

---

### `pluck`

**Description:**  
Returns the value of a specified property from an object. Alias of `getProp`.

```js
export const pluck = x => obj => obj[x]
```

```js
pluck('id')({ id: 42 }) // => 42
```

---

### `toArray`

**Description:**  
Converts an object into an array of `[key, value]` pairs.

```js
export const toArray = Object.entries
```

```js
toArray({ a: 1, b: 2 }) // => [['a', 1], ['b', 2]]
```

---

## String functions

### `append`

**Description:**  
Appends a string to the end of another string.

```js
export const append = x => y => y + x
```

```js
append('world')('hello ') // => 'hello world'
```

---

### `capitalize`

**Description:**  
Capitalizes the first character of a string.

```js
export const capitalize = x => x.charAt(0).toUpperCase() + x.slice(1)
```

```js
capitalize('hello') // => 'Hello'
```

---

### `endsWith`

**Description:**  
Checks if a string ends with the given substring.

```js
export const endsWith = arg => x => x.endsWith(arg)
```

```js
endsWith('bar')('foobar') // => true
```

---

### `getLength`

**Description:**  
Returns the length of a string or array.

```js
export const getLength = xs => xs.length
```

```js
getLength([1, 2, 3]) // => 3
```

---

### `length`

**Description:**  
Alias of `getLength`.

```js
export const length = getLength
```

```js
length('hello') // => 5
```

---

### `padEnd`

**Description:**  
Pads the end of a string with a given character until it reaches the target length.

```js
export const padEnd = len => arg => x => x.padEnd(len, arg)
```

```js
padEnd(6)('.')('hi') // => 'hi....'
```

---

### `padStart`

**Description:**  
Pads the start of a string with a given character until it reaches the target length.

```js
export const padStart = len => arg => x => x.padStart(len, arg)
```

```js
padStart(6)('.')('hi') // => '....hi'
```

---

### `parseJSON`

**Description:**  
Parses a JSON string into a JavaScript object.

```js
export const parseJSON = x => JSON.parse(x)
```

```js
parseJSON('{"a":1}') // => { a: 1 }
```

---

### `repeat`

**Description:**  
Repeats a string a given number of times.

```js
export const repeat = arg => x => x.repeat(arg)
```

```js
repeat(3)('na') // => 'nanana'
```

---

### `replace`

**Description:**  
Replaces the first match of a substring or pattern in a string.

```js
export const replace = regex => arg => x => x.replace(regex, arg)
```

```js
replace('foo')('bar')('foo baz') // => 'bar baz'
```

---

### `replaceAll`

**Description:**  
Replaces all matches of a substring or pattern in a string.

```js
export const replaceAll = regex => arg => x => x.replaceAll(regex, arg)
```

```js
replaceAll('a')('x')('banana') // => 'bxnxnx'
```

---

### `reverseChars`

**Description:**  
Reverses the characters in a string.

```js
export const reverseChars = x => x.split('').reverse().join('')
```

```js
reverseChars('hello') // => 'olleh'
```

---

### `split`

**Description:**  
Splits a string into an array using a delimiter.

```js
export const split = arg => x => x.split(arg ?? '')
```

```js
split('-')('1-2-3') // => ['1', '2', '3']
```

---

### `splitChars`

**Description:**  
Splits a string into an array of individual characters.

```js
export const splitChars = split('')
```

```js
splitChars('abc') // => ['a', 'b', 'c']
```

---

### `splitOnSpace`

**Description:**  
Splits a string into an array of words separated by spaces.

```js
export const splitOnSpace = split(' ')
```

```js
splitOnSpace('hello world') // => ['hello', 'world']
```

---

### `startsWith`

**Description:**  
Checks if a string starts with the given substring.

```js
export const startsWith = arg => x => x.startsWith(arg)
```

```js
startsWith('foo')('foobar') // => true
```

---

### `stringify`

**Description:**  
Converts a JavaScript object to a pretty-printed JSON string.

```js
export const stringify = x => JSON.stringify(x, null, 2)
```

```js
stringify({ a: 1 }) // => '{\n  "a": 1\n}'
```

---

### `substring`

**Description:**  
Extracts a substring between two indices.

```js
export const substring = start => end => x => x.substring(start, end)
```

```js
substring(1)(3)('hello') // => 'el'
```

---

### `toLocaleLowerCase`

**Description:**  
Converts a string to lower case using locale-specific case mappings.

```js
export const toLocaleLowerCase = x => x.toLocaleLowerCase()
```

```js
toLocaleLowerCase('HELLO') // => 'hello'
```

---

### `toLocaleUpperCase`

**Description:**  
Converts a string to upper case using locale-specific case mappings.

```js
export const toLocaleUpperCase = x => x.toLocaleUpperCase()
```

```js
toLocaleUpperCase('hello') // => 'HELLO'
```

---

### `toLowerCase`

**Description:**  
Converts a string to lower case.

```js
export const toLowerCase = x => x.toLowerCase()
```

```js
toLowerCase('HELLO') // => 'hello'
```

---

### `toUpperCase`

**Description:**  
Converts a string to upper case.

```js
export const toUpperCase = x => x.toUpperCase()
```

```js
toUpperCase('hello') // => 'HELLO'
```

---

### `trim`

**Description:**  
Removes whitespace from both ends of a string.

```js
export const trim = x => x.trim()
```

```js
trim('  hello ') // => 'hello'
```

---

### `truncateWords`

**Description:**  
Truncates a string to the first `n` words.

```js
export const truncateWords = arg => x => x.split(' ').slice(0, arg).join(' ')
```

```js
truncateWords(2)('This is a test string') // => 'This is'
```

---




## Utils

### `apply`

**Description:**  
Applies a function to a value.

```js
export const apply = fn => x => fn(x)
```

```js
apply(x => x + 1)(2) // => 3
```

---

### `applyReducer`

**Description:**  
Helper function used for reducing over function chains.

```js
export const applyReducer = (acc, fn) => fn(acc)
```

```js
applyReducer(2, x => x * 2) // => 4
```

---

### `applyToIndex`

**Description:**  
Creates a function that applies the given function to an element's index.

```js
export const applyToIndex = fn => (_, i) => fn(i)
```

```js
[0, 0, 0].map(applyToIndex(i => i * 2)) // => [0, 2, 4]
```

---

### `compose`

**Description:**  
Right-to-left function composition.

```js
export const compose =
  (...fns) =>
  x =>
    fns.reduceRight(applyReducer, x)
```

```js
compose(x => x + 1, x => x * 2)(3) // => 7
```

---

### `composeWithState`

**Description:**  
Recursively applies state decorators to a state object.

```js
export const composeWithState = (state, ...fns) => {
  const reducer = (obj, fn) => ({
    ...obj,
    ...fn(obj, newState => composeWithState(newState, ...fns)),
  })
  return fns.reduce(reducer, state)
}
```

```js
const addFoo = state => () => ({ foo: 1 })
composeWithState({}, addFoo) // => { foo: 1 }
```

---

### `curry`

**Description:**  
Transforms a multi-arg function into curried form.

```js
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

```js
const add3 = (a, b, c) => a + b + c
curry(add3)(1)(2)(3) // => 6
```

---

### `identity`

**Description:**  
Returns the input unchanged.

```js
export const identity = x => x
```

```js
identity(42) // => 42
```

---

### `mapAll`

**Description:**  
Applies a list of functions to the same input.

```js
export const mapAll =
  (...fns) =>
  x =>
    fns.map(fn => fn(x))
```

```js
mapAll(x => x + 1, x => x * 2)(3) // => [4, 6]
```

---

### `pipe`

**Description:**  
Left-to-right function composition.

```js
export const pipe =
  (...fns) =>
  x =>
    fns.reduce(applyReducer, x)
```

```js
pipe(x => x + 1, x => x * 2)(3) // => 8
```

---

### `thrush`

**Description:**  
Applies a function to a value (value-first style). Often used for piping a value into a composed function.

```js
export const thrush = x => fn => fn(x)
```

```js
thrush(2)(x => x * 10) // => 20
```

---

### `uncurry`

**Description:**  
Transforms a curried function into a variadic function.

```js
export const uncurry =
  fn =>
  (...args) =>
    (
      _fn => _args =>
        _args.reduce((_f, arg) => _f(arg), _fn)
    )(fn)(args)
```

```js
const curried = a => b => c => a + b + c
uncurry(curried)(1, 2, 3) // => 6
```

---

### `juxt`

**Description:**  
Applies multiple functions to the same input and collects the results in an array. Useful for running several computations in parallel on a single value.

```js
export const juxt = fns => x => fns.map(fn => fn(x))
```

```js
juxt([
  x => x + 1,
  x => x * 2,
  x => `Value: ${x}`
])(3) // => [4, 6, "Value: 3"]
```

---


## debugging functions

### `collapsed`

**Description:**  
Starts a collapsed console group.

```js
export const collapsed = console.groupCollapsed
```

```js
collapsed('Debug Group')
```

---

### `getType`

**Description:**  
Returns the type of a value as a string.

```js
export const getType = x => typeof x
```

```js
getType(123) // => 'number'
```

---

### `group`

**Description:**  
Starts a new console group.

```js
export const group = console.group
```

```js
group('Grouped Output')
```

---

### `groupEnd`

**Description:**  
Ends the current console group.

```js
export const groupEnd = console.groupEnd
```

```js
groupEnd()
```

---

### `log`

**Description:**  
Shortcut for `console.log`.

```js
export const log = console.log
```

```js
log('Hello') // logs 'Hello'
```

---

### `note`

**Description:**  
Logs a label and value, then returns the value.

```js
export const note = compose(tap, tell)
```

```js
note('Value')(42) // logs: Value 42, returns 42
```

---

### `panic`

**Description:**  
Shortcut for `console.error`.

```js
export const panic = console.error
```

```js
panic('Something went wrong')
```

---

### `see`

**Description:**  
Logs a value and returns it. Alias for `tap(console.log)`.

```js
export const see = tap(log)
```

```js
see('test') // logs 'test' and returns 'test'
```

---

### `snitch`

**Description:**  
Alias for `note`. Logs and returns the value.

```js
export const snitch = note
```

```js
snitch('debug')(100)
```

---

### `table`

**Description:**  
Shortcut for `console.table`.

```js
export const table = console.table
```

```js
table([{ name: 'Alice' }, { name: 'Bob' }])
```

---

### `tap`

**Description:**  
Runs a function for side effects and returns the input.

```js
export const tap = fn => x => (fn(x), identity(x))
```

```js
tap(console.log)('value') // logs 'value' and returns it
```

---

### `tee`

**Description:**  
Alias for `tap`. Useful in data pipelines.

```js
export const tee = tap
```

```js
tee(console.log)('hello') // logs 'hello' and returns it
```

---

### `tapIf`

**Description:**  
Runs a side-effect function if a predicate is true. Returns the original input unchanged.

```js
export const tapIf = pred => fn => x => (pred(x) && fn(x), x)
```

```js
tapIf(x => x > 1)(console.log)(2) // logs: 2, returns 2
```

---

### `tell`

**Description:**  
Logs a value with an optional label.

```js
export const tell = label => x => label ? console.log(label, x) : console.log(x)
```

```js
tell('value')(123) // logs 'value 123'
```

---

## predicates

### `True`

**Description:**  
Returns `true`, ignoring any input.

```js
export const True = _ => true
```

```js
True() // => true
True('anything') // => true
```

---

### `False`

**Description:**  
Returns `false`, ignoring any input.

```js
export const False = _ => false

### `and`

**Description:**  
Logical AND operation.

```js
export const and = (a, b) => a && b
```

```js
and(true, false) // => false
```

---

### `isArray`

**Description:**  
Returns true if the value is an array.

```js
export const isArray = x => Array.isArray(x)
```

```js
isArray([1, 2, 3]) // => true
```

---

### `isClickOrEnter`

**Description:**  
Returns true if the event is a click or Enter key event.

```js
export const isClickOrEnter = evt => evt.type === 'click' || evt.key === 'Enter'
```

```js
isClickOrEnter({ type: 'click' }) // => true
```

---

### `isDivBy`

**Description:**  
Returns true if the second number is divisible by the first.

```js
export const isDivBy = x => y => y % x === 0
```

```js
isDivBy(3)(9) // => true
```

---

### `isEmptyArray`

**Description:**  
Returns true if the value is an empty array.

```js
export const isEmptyArray = xs => Array.isArray(xs) && xs.length === 0
```

```js
isEmptyArray([]) // => true
```

---

### `isEq`

**Description:**  
Returns true if both values are strictly equal.

```js
export const isEq = x => y => x === y
```

```js
isEq(1)(1) // => true
```

---

### `isEven`

**Description:**  
Returns true if the number is even.

```js
export const isEven = x => x % 2 === 0
```

```js
isEven(4) // => true
```

---

### `isGt`

**Description:**  
Returns true if the value is greater than the argument.

```js
export const isGt = arg => x => x > arg
```

```js
isGt(5)(10) // => true
```

---

### `isGtE`

**Description:**  
Returns true if the value is greater than or equal to the argument.

```js
export const isGtE = arg => x => x >= arg
```

```js
isGtE(5)(5) // => true
```

---

### `isLetter`

**Description:**  
Returns true if the value is a letter.

```js
export const isLetter = x => typeof x === 'string' && x.toLowerCase() !== x.toUpperCase()
```

```js
isLetter('A') // => true
```

---

### `isLetterOrNumber`

**Description:**  
Returns true if the value is a letter or number.

```js
export const isLetterOrNumber = x => isLetter(x) || isNumber(x)
```

```js
isLetterOrNumber('1') // => true
```

---

### `isLooseEq`

**Description:**  
Returns true if values are loosely equal (==).

```js
export const isLooseEq = x => y => x == y
```

```js
isLooseEq('1')(1) // => true
```

---

### `isLowerCase`

**Description:**  
Returns true if the letter is lowercase.

```js
export const isLowerCase = x => isLetter(x) && x === x.toLowerCase()
```

```js
isLowerCase('a') // => true
```

---

### `isLt`

**Description:**  
Returns true if the value is less than the argument.

```js
export const isLt = arg => x => x < arg
```

```js
isLt(5)(4) // => true
```

---

### `isLtE`

**Description:**  
Returns true if the value is less than or equal to the argument.

```js
export const isLtE = arg => x => x <= arg
```

```js
isLtE(5)(5) // => true
```

---

### `isMap`

**Description:**  
Returns true if the value is a Map.

```js
export const isMap = x => x instanceof Map
```

```js
isMap(new Map()) // => true
```

---

### `isNaN`

**Description:**  
Checks if a value is NaN.

```js
export const isNaN = x => Number.isNaN(x)
```

```js
isNaN(NaN) // => true
```

---

### `isNotEmptyArray`

**Description:**  
Returns true if the value is a non-empty array.

```js
export const isNotEmptyArray = xs => Array.isArray(xs) && xs.length > 0
```

```js
isNotEmptyArray([1]) // => true
```

---

### `isNotEmptyString`

**Description:**  
Returns true if the value is a non-empty string.

```js
export const isNotEmptyString = str => str.length > 0
```

```js
isNotEmptyString('hello') // => true
```

---

### `isNullish`

**Description:**  
Returns true if the value is `null` or `undefined`.

```js
export const isNullish = x => x == null
```

```js
isNullish(null) // => true
```

---

### `isNotNullish`

**Description:**  
Returns true if the value is not `null` or `undefined`.

```js
export const isNotNullish = not(isNullish)
```

```js
isNotNullish(42) // => true
```

---

### `isNumber`

**Description:**  
Returns true if the value is a number. Also returns true for numeric string.

```js
export const isNumber = x => !isNaN(+x)
```

```js
isNumber('42') // => true
```

---

### `isOdd`

**Description:**  
Returns true if the number is odd.

```js
export const isOdd = x => x % 2 !== 0
```

```js
isOdd(3) // => true
```

---

### `isSame`

**Description:**  
Returns true if two values are the same using `Object.is()`.

```js
export const isSame = x => y => Object.is(x, y)
```

```js
isSame(NaN)(NaN) // => true
```

---

### `isSet`

**Description:**  
Returns true if the value is a Set.

```js
export const isSet = x => x instanceof Set
```

```js
isSet(new Set()) // => true
```

---

### `isSpace`

**Description:**  
Returns true if the character is a space.

```js
export const isSpace = x => Object.is(x, ' ')
```

```js
isSpace(' ') // => true
```

---

### `isSpecialChar`

**Description:**  
Returns true if the character is not a letter or number.

```js
export const isSpecialChar = x => isNaN(x) && x.toLowerCase() === x.toUpperCase()
```

```js
isSpecialChar('@') // => true
```

---

### `isUniq`

**Description:**  
Returns true if all elements in the array are unique.

```js
export const isUniq = xs => new Set(xs).size === xs.length
```

```js
isUniq([1, 2, 3]) // => true
```

---

### `isUpperCase`

**Description:**  
Returns true if the letter is uppercase.

```js
export const isUpperCase = x => isLetter(x) && x === x.toUpperCase()
```

```js
isUpperCase('A') // => true
```

---

### `not`

**Description:**  
Negates a predicate function.

```js
export const not =
  fn =>
  (...args) =>
    !fn(...args)
```

```js
not(x => x > 1)(2) // => false
```

---

### `or`

**Description:**  
Logical OR operation.

```js
export const or = (a, b) => a || b
```

```js
or(false, true) // => true
```

---

## Helpers

### `flip`

**Description:**  
Reverses the order of the first two arguments of a curried binary function.

```js
export const flip = fn => x => y => fn(y)(x)
```

```js
const subtract = a => b => a - b
flip(subtract)(1)(5) // => 4
```

---

### `setCountMap`

**Description:**  
Creates a `Map` counting the occurrences of each item in the array.

```js
export const setCountMap = xs =>
  xs.reduce((map, x) => map.set(x, map.get(x) + 1 || 1), new Map())
```

```js
[...setCountMap(['a', 'b', 'a']).entries()] // => [['a', 2], ['b', 1]]
```

---

### `range`

**Description:**  
Creates an array of numbers from `start` to `end`, inclusive.

```js
export const range = start => end =>
	Array.from({ length: end - start + 1 }, (_, i) => start + i)
```

```js
range(2)(4) // => [2, 3, 4]
```

---

### `rangeGen`

**Description:**  
Creates a generator that yields numbers from `start` to `end`, inclusive.

```js
export function rangeGen(start = 0) {
	return function* (end) {
		for (let i = start; i <= end; i++) {
			yield i
		}
	}
}
```

```js
[...rangeGen(1)(3)] // => [1, 2, 3]
```

---

### `unfold`

**Description:**  
Generates a list by recursively applying a function until it returns false.

```js
export const unfold = fn => x => fn(x) ? [fn(x)[0], ...unfold(fn)(fn(x)[1])] : []
```

```js
unfold(n => n > 0 ? [n, n - 1] : false)(3) // => [3, 2, 1]
```

---

### `getAllPairs`

**Description:**  
Generates all ordered pairs from an array.

```js
export const getAllPairs = xs => map(x => map(y => [x, y])(xs))(xs)
```

```js
getAllPairs([1, 2]) // => [[[1,1],[1,2]],[[2,1],[2,2]]]
```

---

### `getRandomNumber`

**Description:**  
Returns a random integer between 1 and `max`.

```js
export const getRandomNumber = (max = 1) => Math.floor(Math.random() * max + 1)
```

```js
getRandomNumber(5) // => random number from 1 to 5
```

---

### `when`

**Description:**  
Applies a function if a predicate is true.

```js
export const when = p => f => x => p(x) ? f(x) : identity(x)
```

```js
when(x => x > 5)(x => x * 2)(6) // => 12
```

---

### `ifElse`

**Description:**  
Chooses between two functions based on a predicate.

```js
export const ifElse = p => f => g => x => p(x) ? f(x) : g(x)
```

```js
ifElse(x => x > 0)(x => 'yes')(x => 'no')(1) // => 'yes'
```

---

### `guard`

**Description:**  
Evaluates a list of [predicate, result] pairs. Returns the first result whose predicate returns true. Supports both eager values (static results) and lazy result functions.

```js
export const guard = pairs => input => {
  for (const [predicate, result] of pairs) {
    if (predicate(input)) {
      return typeof result === 'function' ? result(input) : result
    }
  }
  throw new Error('No guard matched')
}
```

```js
const describe = guard([
  [x => x < 0,     'negative'],
  [x => x === 0,   'zero'],
  [() => true,     'positive']
]);

describe(-5); // => "negative"
describe(0);  // => "zero"
describe(42); // => "positive"

const label = guard([
  [x => x < 0,     x => `neg ${x}`],
  [x => x === 0,   () => 'zero'],
  [() => true,     x => `pos ${x}`]
]);

label(-3); // => "neg -3"
label(0);  // => "zero"
label(4);  // => "pos 4"
```

---



### `nab`

**Description:**  
Fetches and parses JSON from a URL.

```js
export const nab = async url => await (await fetch(url)).json()
```

```js
// nab('/api/data') // => returns parsed JSON
```

---

### `delay`

**Description:**  
Delays invocation of a function.

```js
export const delay = ms => new Promise(res => setTimeout(res, +ms ?? 0))
```

```js
delay(1000)(console.log)('hi')
```

---

### `nap`

**Description:**  
Returns a promise that resolves after `ms` milliseconds.

```js
export const nap = ms => new Promise(resolve => setTimeout(resolve, ms))
```

```js
await nap(100)
```

---

### `removeNonLetters`

**Description:**  
Removes all non-letter characters from a string.

```js
export const removeNonLetters = pipe(split(''), filter(isLetter), join(''))
```

```js
removeNonLetters('a1!b2') // => 'ab'
```

---

### `removeNonNumbers`

**Description:**  
Removes all non-numeric characters from a string.

```js
export const removeNonNumbers = pipe(splitChars, keep(isNumber), joinArray)
```

```js
removeNonNumbers('a1b2') // => '12'
```

---

### `numWithCommas`

**Description:**  
Formats a number with commas as thousands separators.

```js
export const numWithCommas = n => new Intl.NumberFormat('en-US').format(n)
```

```js
numWithCommas(1234567) // => '1,234,567'
```

---

### `showPopover`

**Description:**  
Triggers the `showPopover()` method on an element.

```js
export const showPopover = x => x.showPopover()
```

```js
// showPopover(document.querySelector('#my-el'))
```

---

### `select`

**Description:**  
Selects DOM elements by query selectors.

```js
export const select = (...xs) => xs.map(x => document.querySelector(x))
```

```js
select('#a', '#b') // => [HTMLElement, HTMLElement]
```

---

### `selectAll`

**Description:**  
Selects all DOM elements matching query selectors.

```js
export const selectAll = (...xs) => xs.map(x => document.querySelectorAll(x))
```

```js
selectAll('div') // => [NodeList]
```

---

### `createADT`

**Description:**  
Creates an algebraic data type (ADT) constructor.

```js
export const createADT = spec =>
	Object.fromEntries(
		Object.entries(spec).map(([tag, fieldNames]) => [
			tag,
			(...args) => {
				if (args.length !== fieldNames.length)
					throw new Error(`Expected ${fieldNames.length} arguments for ${tag}`)

				const fields = Object.fromEntries(
					fieldNames.map((name, i) => [name, args[i]])
				)

				return { tag, ...fields }
			},
		])
	)
```

```js
const Option = createADT({ Some: ['value'], None: [] })
Option.Some(1) // => { tag: 'Some', value: 1 }
```

---

### `match`

**Description:**  
Pattern matches an ADT with fallback support.

```js
export const match = (value, handlers) => {
	const handler = handlers[value.tag] || handlers._
	if (!handler)
		throw new Error(`No match for tag: ${value.tag}, and no fallback (_) provided`)
	return handler(value)
}
```

```js
match(Result.Ok(1), { Ok: x => x.value }) // => 1
```

---

### `matchStrict`

**Description:**  
Strict version of `match`; all variants must be handled explicitly.

```js
export const matchStrict = (value, handlers) => {
	const { tag } = value

	if (!handlers.hasOwnProperty(tag))
		throw new Error(`Missing handler for tag: ${tag}`)

	const handledTags = Object.keys(handlers)
	if (handledTags.includes('_'))
		throw new Error(
			`matchStrict does not support fallback (_) — handle all variants explicitly`
		)

	return handlers[tag](value)
}
```

```js
matchStrict(Result.Err('fail'), { Err: x => x.message }) // => 'fail'
```

---

### `Maybe`

**Description:**  
An ADT with `Just(value)` and `Nothing()` variants.

```js
export const Maybe = createADT({
	Just: ['value'],
	Nothing: [],
})
```

```js
Maybe.Just(5) // => { tag: 'Just', value: 5 }
```

---

### `Result`

**Description:**  
An ADT with `Ok(value)` and `Err(message)` variants.

```js
export const Result = createADT({
	Ok: ['value'],
	Err: ['message'],
})
```

```js
Result.Err('Oops') // => { tag: 'Err', message: 'Oops' }
```

---

### `mapResult`

**Description:**  
Maps the value inside `Ok`, passes through `Err`.

```js
export const mapResult = fn => result =>
	result.tag === 'Ok' ? Result.Ok(fn(result.value)) : result
```

```js
mapResult(x => x + 1)(Result.Ok(1)) // => Ok(2)
```

---

### `mapMaybe`

**Description:**  
Maps the value inside `Just`, passes through `Nothing`.

```js
export const mapMaybe = fn => maybe =>
	maybe.tag === 'Just' ? Maybe.Just(fn(maybe.value)) : maybe
```

```js
mapMaybe(x => x * 2)(Maybe.Just(2)) // => Just(4)
```

---

### `flatMapResult`

**Description:**  
Applies a function to an `Ok` that returns another `Result`.

```js
export const flatMapResult = fn => result =>
	result.tag === 'Ok' ? fn(result.value) : result
```

```js
flatMapResult(x => Result.Ok(x * 2))(Result.Ok(2)) // => Ok(4)
```

---

### `flatMapMaybe`

**Description:**  
Applies a function to a `Just` that returns another `Maybe`.

```js
export const flatMapMaybe = fn => maybe =>
	maybe.tag === 'Just' ? fn(maybe.value) : maybe
```

```js
flatMapMaybe(x => Maybe.Just(x * 2))(Maybe.Just(2)) // => Just(4)
```

---

### `toMaybe`

**Description:**  
Wraps a non-nullish value in a `Maybe.Just`. Returns `Maybe.Nothing` for `null` or `undefined`.

```js
export const toMaybe = val =>
  isNotNullish(val) ? Maybe.Just(val) : Maybe.Nothing()
```

```js
toMaybe(42)           // => Just(42)
toMaybe(null)         // => Nothing
toMaybe(undefined)    // => Nothing
```

---

### `unwrap`

**Description:**  
Returns the value inside `Just` or `Ok`, or fallback.

```js
export const unwrap = fallback => adt => {
	const { tag } = adt
	if (tag === 'Just' || tag === 'Ok') return adt.value
	if (fallback !== undefined) return fallback
	throw new Error(`Cannot unwrap ${tag}`)
}
```

```js
unwrap(undefined)(Maybe.Just(2)) // => 2
```

---

### `defaultTo`

**Description:**  
Returns value inside `Just`/`Ok` or fallback.

```js
export const defaultTo = fallback => adt =>
	adt.tag === 'Just' || adt.tag === 'Ok' ? adt.value : fallback
```

```js
defaultTo(0)(Maybe.Nothing()) // => 0
```

---

### `isJust`

**Description:**  
Checks if the `Maybe` is a `Just`.

```js
export const isJust = maybe => maybe.tag === 'Just'
```

```js
isJust(Maybe.Just(1)) // => true
```

---

### `isNothing`

**Description:**  
Checks if the `Maybe` is `Nothing`.

```js
export const isNothing = maybe => maybe.tag === 'Nothing'
```

```js
isNothing(Maybe.Nothing()) // => true
```

---

### `isOk`

**Description:**  
Checks if the `Result` is `Ok`.

```js
export const isOk = result => result.tag === 'Ok'
```

```js
isOk(Result.Ok(1)) // => true
```

---

### `isErr`

**Description:**  
Checks if the `Result` is `Err`.

```js
export const isErr = result => result.tag === 'Err'
```

```js
isErr(Result.Err('fail')) // => true
```

---

### `foldMaybe`

**Description:**  
Applies a handler for `Nothing` or `Just`.

```js
export const foldMaybe = onNothing => onJust => maybe =>
	maybe.tag === 'Just' ? onJust(maybe.value) : onNothing()
```

```js
foldMaybe(() => 'none')(x => x * 2)(Maybe.Just(3)) // => 6
```

---

### `foldResult`

**Description:**  
Applies a handler for `Err` or `Ok`.

```js
export const foldResult = onErr => onOk => result =>
	result.tag === 'Ok' ? onOk(result.value) : onErr(result.message)
```

```js
foldResult(x => `fail: ${x}`)(x => x + 1)(Result.Ok(2)) // => 3
```

---

### `tryCatch`

**Description:**  
Wraps a function call in a `Result`.

```js
export const tryCatch = fn => arg => {
	try {
		return Result.Ok(fn(arg))
	} catch (err) {
		return Result.Err(err.message || 'Unknown error')
	}
}
```

```js
tryCatch(JSON.parse)('{"a":1}') // => Ok({ a: 1 })
```

