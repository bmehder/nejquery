// Utils
export const identity = x => x

export const apply = fn => x => fn(x)

export const thrush = x => fn => fn(x)

export const applyReducer = (acc, fn) => fn(acc)

export const pipe =
	(...fns) =>
	x =>
		fns.reduce(applyReducer, x)

export const compose =
	(...fns) =>
	x =>
		fns.reduceRight(applyReducer, x)

export const mapAll =
	(...fns) =>
	x =>
		fns.map(fn => fn(x))

export const applyToIndex = fn => (_, i) => fn(i)

export const composeWithState = (state, ...fns) => {
	const reducer = (obj, fn) => ({
		...obj,
		...fn(obj, newState => composeWithState(newState, ...fns)),
	})
	return fns.reduce(reducer, state)
}

export const juxt = fns => x => fns.map(fn => fn(x))

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

export const uncurry =
	fn =>
	(...args) =>
		(
			_fn => _args =>
				_args.reduce((_f, arg) => _f(arg), _fn)
		)(fn)(args)

// debugging functions
export const tap = fn => x => (fn(x), identity(x))
export const tee = tap

export const tapIf = pred => fn => x => (pred(x) ? fn(x) : null, x)

export const log = console.log

export const table = console.table

export const panic = console.error

export const group = console.group

export const groupEnd = console.groupEnd

export const collapsed = console.groupCollapsed

export const tell = label => x => label ? console.log(label, x) : console.log(x)

export const note = compose(tap, tell)

export const snitch = note

export const see = tap(log)

export const getType = x => typeof x

// Array functions
export const map = fn => xs => xs.map(fn ?? identity)

export const forEach = fn => xs => xs.forEach(fn ?? identity)

export const filter = fn => xs => xs.filter(fn ?? identity)

export const keep = filter

export const compact = xs => xs.filter(Boolean)

export const reject = fn => xs => xs.filter(not(fn) ?? identity)

export const allPass =
	(...predicates) =>
	x =>
		predicates.every(p => p(x))

export const anyPass =
	(...predicates) =>
	x =>
		predicates.some(p => p(x))

// DEPRECATED
export const reduce = fn => xs => xs.reduce(fn)

export const fold = fn => arg => xs => xs.reduce(fn, arg ?? xs[0])

export const slice = start => end => xs => xs.slice(start, end)

export const take = x => xs => xs.slice(0, x)

export const concat = a => b => a.concat(b)

export const cons = x => xs => [x, ...xs]

export const push = x => xs => [...xs, x]

export const includes = x => xs => xs.includes(x)

export const indexOf = x => xs => xs.indexOf(x)

export const lastIndexOf = x => xs => xs.lastIndexOf(x)

export const at = x => xs => xs.at(x)

export const first = xs => xs.at(0)

export const second = xs => xs.at(1)

export const head = first

export const tail = xs => xs.slice(1)

export const last = xs => xs.at(-1)

export const flat = x => xs => xs.flat(x)

export const flatten = xs => xs.flat(1)

export const flattenAll = xs => {
	const fn = (acc, item) =>
		Array.isArray(item) ? [...acc, ...flattenAll(item)] : [...acc, item]

	return fold(fn)([])(xs)
}

export const flatMap = fn => xs => xs.flatMap(fn)

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

export const fill = value => start => end => xs => [...xs].fill(value, start, end)

export const chunk = size => xs => {
	const result = []
	for (let i = 0; i < xs.length; i += size) {
		result.push(xs.slice(i, i + size))
	}
	return result
}

export const reverse = xs => xs.toReversed()

export const sort = fn => xs => xs.toSorted(fn)

export const uniq = xs => [...new Set(xs)]

export const union = x => y => [...new Set([...x, ...y])]

export const intersection = x => y => {
	const setY = new Set(y)
	return [...new Set(x)].filter(item => setY.has(item))
}

export const difference = x => y => x.filter(_x => !y.includes(_x))

export const hasAllElems = (xs1, xs2) => xs1.every(x => xs2.includes(x))

export const shuffle = xs => {
	const arr = [...xs]
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

export const toObject = Object.fromEntries

export const spread = x => [...x]

export const partition = fn => xs =>
	xs.reduce(
		(acc, x) =>
			fn(x) ? [[...acc[0], x], [...acc[1]]] : [[...acc[0]], [...acc[1], x]],
		[[], []]
	)

const doUnzip = ([xs, ys], [x, y]) => [
	[...xs, x],
	[...ys, y],
]

export const zip = a => b => a.map((x, i) => [x, b[i]])

export const unzip = xs => xs.reduce(doUnzip, [[], []])

export const intersperse = arg => xs => xs.flatMap(x => [x, arg]).slice(0, -1)

// Number functions
export const inc = x => x + 1

export const dec = x => x - 1

export const add = x => y => x + y

export const sub = x => y => x - y

export const mul = x => y => x * y

export const div = x => y => x / y

export const divBy = x => y => y / x

export const subBy = x => y => y - x

export const mod = x => y => x % y

export const square = x => x * x

export const negate = x => -x

export const sum = xs => xs.reduce((acc, x) => add(acc)(x))

export const min = (...args) => Math.min(...args)

export const max = (...args) => Math.max(...args)

export const floor = Math.floor

export const ceil = Math.ceil

export const round = Math.round

export const abs = Math.abs

export const sqrt = Math.sqrt

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

export const append = x => y => y + x

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

export const reverseChars = x => x.split('').reverse().join('')

export const padStart = len => arg => x => x.padStart(len, arg)

export const padEnd = len => arg => x => x.padEnd(len, arg)

export const truncateWords = arg => x => x.split(' ').slice(0, arg).join(' ')

export const getLength = xs => xs.length

export const length = getLength

// predicates

export const True = _ => true

export const False = _ => false

export const not =
	fn =>
	(...args) =>
		!fn(...args)

export const isNaN = x => Number.isNaN(x)

export const isLetter = x =>
	typeof x === 'string' && x.toLowerCase() !== x.toUpperCase()

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

export const isNotEmptyString = str => str.length > 0

export const isNullish = x => x == null

export const isNotNullish = not(isNullish)

export const isSet = x => x instanceof Set

export const isMap = x => x instanceof Map

export const or = (a, b) => a || b

export const and = (a, b) => a && b

// Objects
export const pluck = x => obj => obj[x]
export const getProp = pluck
export const dot = pluck

export const pick = keys => obj => Object.fromEntries(keys.map(key => [key, obj[key]]))

export const groupBy = fn => obj => Object.groupBy(obj, fn)

export const groupByProp = x => groupBy(pluck(x))

export const toArray = Object.entries

export const getKeys = Object.keys

export const getValues = Object.values

// Helpers
export const flip = fn => x => y => fn(y)(x)

export const setCountMap = xs =>
	xs.reduce((map, x) => map.set(x, map.get(x) + 1 || 1), new Map())

export const range = start => end =>
	Array.from({ length: end - start + 1 }, (_, i) => start + i)

export function rangeGen(start = 0) {
	return function* (end) {
		for (let i = start; i <= end; i++) {
			yield i
		}
	}
}

export const unfold = fn => x => fn(x) ? [fn(x)[0], ...unfold(fn)(fn(x)[1])] : []

export const getAllPairs = xs => map(x => map(y => [x, y])(xs))(xs)

export const getRandomNumber = (max = 1) => Math.floor(Math.random() * max + 1)

export const when = p => f => x => p(x) ? f(x) : identity(x)

export const ifElse = p => f => g => x => p(x) ? f(x) : g(x)

export const nab = async url => await (await fetch(url)).json()

export const delay = ms => new Promise(res => setTimeout(res, +ms ?? 0))

export const nap = ms => new Promise(resolve => setTimeout(resolve, ms))

export const removeNonLetters = pipe(split(''), filter(isLetter), join(''))

export const removeNonNumbers = pipe(splitChars, keep(isNumber), joinArray)

export const numWithCommas = n => new Intl.NumberFormat('en-US').format(n)

export const showPopover = x => x.showPopover()

export const select = (...xs) => xs.map(x => document.querySelector(x))

export const selectAll = (...xs) => xs.map(x => document.querySelectorAll(x))

export const guard = pairs => input => {
	for (const [predicate, result] of pairs) {
		if (predicate(input)) {
			return typeof result === 'function' ? result(input) : result
		}
	}
	throw new Error('No guard matched')
}

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

export const match = (value, handlers) => {
	const handler = handlers[value.tag] || handlers._
	if (!handler)
		throw new Error(`No match for tag: ${value.tag}, and no fallback (_) provided`)
	return handler(value)
}

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

export const Maybe = createADT({
	Just: ['value'],
	Nothing: [],
})

export const Result = createADT({
	Ok: ['value'],
	Err: ['message'],
})

export const mapResult = fn => result =>
	result.tag === 'Ok' ? Result.Ok(fn(result.value)) : result

export const mapMaybe = fn => maybe =>
	maybe.tag === 'Just' ? Maybe.Just(fn(maybe.value)) : maybe

export const apMaybe = maybeFn => maybeVal =>
	isJust(maybeFn) && isJust(maybeVal)
		? Maybe.Just(maybeFn.value(maybeVal.value))
		: Maybe.Nothing()

export const apResult = resultFn => resultVal =>
	isOk(resultFn) && isOk(resultVal)
		? Result.Ok(resultFn.value(resultVal.value))
		: isErr(resultFn)
		? resultFn
		: resultVal

export const flatMapResult = fn => result =>
	result.tag === 'Ok' ? fn(result.value) : result

export const flatMapMaybe = fn => maybe =>
	maybe.tag === 'Just' ? fn(maybe.value) : maybe

export const toMaybe = val => (isNotNullish(val) ? Maybe.Just(val) : Maybe.Nothing())

export const unwrap = fallback => adt => {
	const { tag } = adt
	if (tag === 'Just' || tag === 'Ok') return adt.value
	if (fallback !== undefined) return fallback
	throw new Error(`Cannot unwrap ${tag}`)
}

export const defaultTo = fallback => adt =>
	adt.tag === 'Just' || adt.tag === 'Ok' ? adt.value : fallback

export const isJust = maybe => maybe.tag === 'Just'

export const isNothing = maybe => maybe.tag === 'Nothing'

export const isOk = result => result.tag === 'Ok'

export const isErr = result => result.tag === 'Err'

export const foldMaybe = onNothing => onJust => maybe =>
	maybe.tag === 'Just' ? onJust(maybe.value) : onNothing()

export const foldResult = onErr => onOk => result =>
	result.tag === 'Ok' ? onOk(result.value) : onErr(result.message)

export const tryCatch = fn => arg => {
	try {
		return Result.Ok(fn(arg))
	} catch (err) {
		return Result.Err(err.message || 'Unknown error')
	}
}

