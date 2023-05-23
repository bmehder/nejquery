// Utils
export const identity = arg => arg

export const pipe =
  (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg)

export const compose =
  (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg)

export const tap = fn => arg => (fn(arg), identity(arg))

export const invoke = (...fns) => fns.forEach(fn => fn)

// console functions
export const log = console.log

export const table = console.table

export const panic = console.error

export const group = console.group

export const groupEnd = console.groupEnd

export const collapsed = console.groupCollapsed

export const tell = note => arg => note ? console.log(note, arg) : console.log(arg)

export const note = compose(tap, tell)

export const see = tap(log)

export const getType = arg => (log(typeof arg))

// Array functions
export const map = cb => arr => arr.map(cb ?? identity)

export const forEach = cb => arr => arr.forEach(cb ?? identity)

export const filter = pred => arr => [...arr].filter(pred ?? identity)

export const keep = filter

export const reject = pred => arr => [...arr].filter(not(pred) ?? identity)

export const reduce = cb => arr => [...arr].reduce(cb)

export const fold = cb => initial => arr => [...arr].reduce(cb, initial ?? arr[0])

export const slice = start => end => strOrNum => strOrNum.slice(start, end)

export const concat = a => b => a.concat(b)

export const push = arr => val => [...arr, val]

export const includes = arg => arr => arr.includes(arg)

export const indexOf = arg => arr => arr.indexOf(arg)

export const lastIndexOf = arg => arr => arr.lastIndexOf(arg)

export const first = arr => arr.at(0)

export const head = first

export const last = arr => arr.at(-1)

export const at = arg => arr => arr.at(arg)

export const toSorted = cb => arr => [...arr].sort(cb)

export const sortStrings = arr => [...arr].sort((a, b) => a.localeCompare(b))

export const reverse = arr => [...arr].reverse()

export const flat = arr => arr.flat(1)

export const flatDeep = arr => {
  const reducer = (acc, item) =>
    Array.isArray(item) ? [...acc, ...flatDeep(item)] : [...acc, item]

  return fold(reducer)([])(arr)
}

export const find = cb => arr => arr.find(cb)

export const findIndex = cb => arr => arr.findIndex(cb)

export const findLastIndex = cb => arr => arr.findLastIndex(cb)

export const findAllIndexes = arg => arr => {
  const folder = (acc, item, idx) => arg === item ? [...acc, idx] : acc
  return fold(folder)([])(arr)
}

export const every = cb => arr => arr.every(cb ?? identity)

export const some = cb => arr => arr.some(cb ?? identity)

export const join = sep => arr => arr.join(sep ?? '')

export const joinArray = join('')

export const count = arg => arr => [...arr].filter(x => x === arg).length

export const chunk = size => arr => arr.reduce((acc, _, index, array) => {
  index % size === 0
    ? acc = [...acc, slice(index)(index + size)(array)]
    : acc
  return acc
}, [])

export const uniq = arr => [...new Set(arr)]

export const union = a => b => [...new Set([...a, ...b])]

export const intersection = a => b => [...new Set(a)].filter(x => new Set(b).has(x))

export const difference = a => b => a.filter(x => !b.includes(x))

export const hasAllElems = (arr1, arr2) => arr1.every(elem => arr2.includes(elem))

export const shuffle = arr => [...arr].sort(() => 0.5 - Math.random())

// Number functions
export const inc = n => n += 1

export const dec = n => n -= 1

export const add = a => b => a + b

export const sub = a => b => a + b

export const mul = a => b => a * b

export const div = a => b => a / b

export const square = n => n * n

export const negative = n => -n

export const sum = arr => arr.reduce((acc, item) => add(acc)(item))

export const min = (...args) => Math.min(...args)

export const max = (...args) => Math.max(...args)

export const floor = n => Math.floor(n)

export const ceil = n => Math.ceil(n)

export const round = n => Math.round(n)

export const toFixed = len => arg => arg.toFixed(len)

export const toLocaleString = num => num.toLocaleString('en-US')

// String functions
export const split = on => arr => arr.split(on ?? '')

export const splitChars = split('')

export const splitOnSpace = split(' ')

export const substring = start => end => str => str.substring(start, end)

export const replace = regex => replacement => str => str.replace(regex, replacement)

export const repeat = times => str => str.repeat(times)

export const trim = str => str.trim()

export const stringify = str => JSON.stringify(str, null, 2)

export const parseJSON = str => JSON.parse(str)

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export const startsWith = arg => str => str.startsWith(arg)

export const endsWith = arg => str => str.endsWith(arg)

export const toLowerCase = str => str.toLocaleLowerCase()

export const toUpperCase = str => str.toLocaleUpperCase()

export const reverseWord = str => [...String(str)].reverse().join('')

export const padStart = len => arg => str => str.padStart(len, arg)

export const padEnd = len => arg => str => str.padEnd(len, arg)

export const truncateWords = num => str => str.split(' ').splice(0, num).join(' ')

// predicates
export const not =
  pred =>
  (...args) =>
    !pred(...args)

export const isNaN = arg => Number.isNaN(arg)

export const isLetter = arg =>
  typeof arg == 'string' && arg.toLowerCase() !== arg.toUpperCase()

export const isNumber = args => !isNaN(+args)

export const isSpecialChar = arg => isNaN(arg) && arg.toLowerCase() === arg.toUpperCase()

export const isLetterOrNumber = arg => isLetter(arg) || isNumber(arg)

export const isUpperCase = char => isLetter(char) && char === char.toUpperCase()

export const isLowerCase = char => isLetter(char) && char === char.toLowerCase()

export const isSpace = arg => Object.is(arg, ' ')

export const isUniq = arr => new Set(arr).size === arr.length

export const isOdd = n => n % 2 !== 0

export const isEven = n => n % 2 === 0

export const isGt = n => arg => arg > n

export const isGtE = n => arg => arg >= n

export const isLt = n => arg => arg < n

export const isLtE = n => arg => arg <= n

export const isEq = a => b => a === b

export const isSame = a => b => Object.is(a, b)

export const isLooseEq = a => b => a == b

export const isClickOrEnter = evt => evt.type === 'click' || evt.key === 'Enter'

export const isArray = arg => Array.isArray(arg)

export const isEmptyArray = arr => Array.isArray(arr) && arr.length === 0

export const isNotEmptyArray = arr => Array.isArray(arr) && arr.length > 0

export const isNullish = arg => arg == null

export const notUndefined = not(includes(undefined))

export const isSet = arg => arg instanceof Set

export const isMap = arg => arg instanceof Map

// Helpers
export const setCountMap = arr =>
  arr.reduce((map, item) => map.set(item, map.get(item) + 1 || 1), new Map())

export const setRange = (start = 1, end = 10) =>
  [...Array(end - start + 1).keys()].reduce(
    (acc, _, index) => ((acc = [...acc, index + start]), acc),
    []
  )

export const pluck = prop => obj => obj[prop]

export const getLength = strOrNum => strOrNum.length

export const getRandomNumber = (max = 1) => Math.floor(Math.random() * max + 1)

export const nab = async url => await (await fetch(url)).json()

export const ifElse = pred => truthCb => falseCb => pred ? truthCb : falseCb

export const removeNonLetters = pipe(split(''), filter(isLetter), join(''))

export const removeNonNumbers = pipe(splitChars, keep(isNumber), joinArray)

export const delay =
  fn =>
  ms =>
  (...args) =>
    setTimeout(fn, +ms ?? 0, ...args)

export const uuid = crypto.randomUUID()

export const toArray = obj => Object.entries(obj)

export const toObject = arr => Object.fromEntries(arr)

export const toPairs = mapObj => [...mapObj]

export const getKeys = obj => Object.keys(obj)

export const getValues = obj => Object.values(obj)