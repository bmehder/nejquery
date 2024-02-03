// Utils
export const identity = x => x

export const pipe =
	(...fns) =>
	x =>
		fns.reduce((acc, fn) => fn(acc), x)

export const compose =
	(...fns) =>
	x =>
		fns.reduceRight((acc, fn) => fn(acc), x)

export const tap = fn => x => (fn(x), identity(x))

export const invoke = (...fns) => fns.forEach(fn => fn)

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

// debugging functions
export const log = console.log

export const table = console.table

export const panic = console.error

export const group = console.group

export const groupEnd = console.groupEnd

export const collapsed = console.groupCollapsed

export const tell = label => x => label ? console.log(label, x) : console.log(x)

export const note = compose(tap, tell)

export const see = tap(log)

export const getType = x => typeof x

// Array functions
export const map = fn => xs => xs.map(fn ?? identity)

export const forEach = fn => xs => xs.forEach(fn ?? identity)

export const filter = fn => xs => [...xs].filter(fn ?? identity)

export const keep = filter

export const reject = fn => xs => [...xs].filter(not(fn) ?? identity)

export const reduce = fn => xs => [...xs].reduce(fn)

export const fold = fn => arg => xs => [...xs].reduce(fn, arg ?? xs[0])

export const slice = start => end => strOrNum => strOrNum.slice(start, end)

export const concat = a => b => a.concat(b)

export const push = xs => x => [...xs, x]

export const includes = x => xs => xs.includes(x)

export const indexOf = x => xs => xs.indexOf(x)

export const lastIndexOf = x => xs => xs.lastIndexOf(x)

export const first = xs => xs.at(0)

export const head = first

export const last = xs => xs.at(-1)

export const flat = xs => xs.flat(1)

export const flatDeep = xs => {
	const fn = (acc, item) =>
		Array.isArray(item) ? [...acc, ...flatDeep(item)] : [...acc, item]

	return fold(fn)([])(xs)
}

export const find = fn => xs => xs.find(fn)

export const findIndex = fn => xs => xs.findIndex(fn)

export const findLastIndex = fn => xs => xs.findLastIndex(fn)

export const findAllIndexes = arg => xs => {
	const folder = (acc, x, i) => (arg === x ? [...acc, i] : acc)
	return fold(folder)([])(xs)
}

export const every = fn => xs => xs.every(fn)

export const some = fn => xs => xs.some(fn)

export const join = x => xs => xs.join(x ?? '')

export const joinArray = join('')

export const count = x => xs => xs.filter(_x => _x === x).length

export const getArrayKeys = xs => [...xs.keys()]

export const chunk = size => xs =>
	xs.reduce((acc, _, i, xs) => {
		i % size === 0 ? (acc = [...acc, slice(i)(i + size)(xs)]) : acc
		return acc
	}, [])

export const uniq = xs => [...new Set(xs)]

export const union = x => y => [...new Set([...x, ...y])]

export const intersection = x => y => [...new Set(x)].filter(_x => new Set(y).has(_x))

export const difference = x => y => a.filter(_x => !y.includes(_x))

export const hasAllElems = (xs1, xs2) => xs1.every(x => xs2.includes(x))

export const shuffle = xs => xs.sort(() => 0.5 - Math.random())

export const toObject = xs => Object.fromEntries(xs)

// Number functions
export const inc = x => (x += 1)

export const dec = x => (x -= 1)

export const add = x => y => x + y

export const sub = x => y => x + y

export const mul = x => y => x * y

export const div = x => y => y / x

export const square = x => x * x

export const negate = x => -x

export const sum = xs => xs.reduce((acc, x) => add(acc)(x))

export const min = (...args) => Math.min(...args)

export const max = (...args) => Math.max(...args)

export const floor = Math.floor

export const ceil = Math.ceil

export const round = Math.round

export const toFixed = arg => x => x.toFixed(arg)

export const toLocaleString = arg => x => x.toLocaleString(arg)

// String functions
export const split = arg => x => x.split(arg ?? '')

export const splitChars = split('')

export const splitOnSpace = split(' ')

export const substring = start => end => x => x.substring(start, end)

export const replace = regex => arg => x => x.replace(regex, arg)

export const replaceAll = regex => arg => x => x.replaceAll(regex, arg)

export const repeat = arg => x => x.repeat(arg)

export const trim = x => x.trim()

export const stringify = x => JSON.stringify(x, null, 2)

export const parseJSON = x => JSON.parse(x)

export const capitalize = x => x.charAt(0).toUpperCase() + x.slice(1)

export const startsWith = arg => x => x.startsWith(arg)

export const endsWith = arg => x => x.endsWith(arg)

export const toLowerCase = x => x.toLowerCase()

export const toUpperCase = x => x.toUpperCase()

export const toLocaleLowerCase = x => x.toLocaleLowerCase()

export const toLocaleUpperCase = x => x.toLocaleUpperCase()

export const reverseWord = x => x.toReversed().join('')

export const padStart = len => arg => x => x.padStart(len, arg)

export const padEnd = len => arg => x => x.padEnd(len, arg)

export const truncateWords = arg => x => x.split(' ').splice(0, arg).join(' ')

export const getLength = xs => xs.length

// predicates
export const not =
	fn =>
	(...args) =>
		!fn(...args)

export const isNaN = x => Number.isNaN(x)

export const isLetter = x => typeof x === 'string' && x.toLowerCase() !== x.toUpperCase()

export const isNumber = x => !isNaN(+x)

export const isSpecialChar = x => isNaN(x) && x.toLowerCase() === x.toUpperCase()

export const isLetterOrNumber = x => isLetter(x) || isNumber(x)

export const isUpperCase = x => isLetter(x) && x === x.toUpperCase()

export const isLowerCase = x => isLetter(x) && x === x.toLowerCase()

export const isSpace = x => Object.is(x, ' ')

export const isUniq = xs => new Set(xs).size === xs.length

export const isOdd = x => x % 2 !== 0

export const isEven = x => x % 2 === 0

export const isDivBy = x => y => y % x === 0

export const isGt = arg => x => x > arg

export const isGtE = arg => x => x >= arg

export const isLt = arg => x => x < arg

export const isLtE = arg => x => x <= arg

export const isEq = x => y => x === y

export const isSame = x => y => Object.is(x, y)

export const isLooseEq = x => y => x == y

export const isClickOrEnter = evt => evt.type === 'click' || evt.key === 'Enter'

export const isArray = x => Array.isArray(x)

export const isEmptyArray = xs => Array.isArray(xs) && xs.length === 0

export const isNotEmptyArray = xs => Array.isArray(xs) && xs.length > 0

export const isNullish = x => x == null

export const isSet = x => x instanceof Set

export const isMap = x => x instanceof Map

// Objects
export const pluck = x => obj => obj[x]

export const toArray = Object.entries

export const toPairs = x => [...x]

export const getKeys = Object.keys

export const getValues = Object.values

// Helpers
export const setCountMap = xs =>
	xs.reduce((map, x) => map.set(x, map.get(x) + 1 || 1), new Map())

export const range =
	(start = 1) =>
	end =>
		start === end ? [start] : [start, ...range(start + 1)(end)]

export const getAllPairs = xs => map(x => map(y => [x, y])(xs))(xs)

export const getRandomNumber = (max = 1) => Math.floor(Math.random() * max + 1)

export const nab = async url => await (await fetch(url)).json()

export const delay =
	ms =>
	fn =>
	(...args) =>
		setTimeout(fn, +ms ?? 0, ...args)

export const removeNonLetters = pipe(split(''), filter(isLetter), join(''))

export const removeNonNumbers = pipe(splitChars, keep(isNumber), joinArray)

export const showPopover = x => x.showPopover()

export const nap = ms => new Promise(resolve => setTimeout(resolve, ms))

export const select = (...xs) => xs.map(x => document.querySelector(x))

export const selectAll = (...xs) => xs.map(x => document.querySelectorAll(x))