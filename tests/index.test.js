
import assert from 'assert';
import {
	identity,
	apply,
	thrush,
	applyReducer,
	pipe,
	compose,
	mapAll,
	applyToIndex,
	composeState,
	juxt,
	curry,
		uncurry,
	tap,
	tee,
	tapIf,
	log,
	table,
	panic,
	group,
	groupEnd,
	collapsed,
	tell,
	note,
	snitch,
	see,
	getType,
	map,
	forEach,
	filter,
	keep,
	compact,
	reject,
	reduce,
	fold,
	slice,
	take,
	concat,
	cons,
	push,
	includes,
	indexOf,
	lastIndexOf,
	at,
	first,
	second,
	head,
	tail,
	last,
	flat,
	flatten,
	flattenAll,
	flatMap,
	find,
	findIndex,
	findLastIndex,
	findAllIndexes,
	every,
	some,
	join,
	joinArray,
	count,
	getArrayKeys,
	fill,
	chunk,
	reverse,
	sort,
	uniq,
	union,
	intersection,
	difference,
	hasAllElems,
	shuffle,
	toObject,
	spread,
	partition,
	zip,
	unzip,
	intersperse,
	inc,
	dec,
	add,
	sub,
	mul,
	div,
	divBy,
	subBy,
	mod,
	square,
	negate,
	sum,
	min,
	max,
	floor,
	ceil,
	round,
	abs,
	sqrt,
	toFixed,
	toLocaleString,
	split,
	splitChars,
	splitOnSpace,
	substring,
	replace,
	replaceAll,
	repeat,
	append,
	trim,
	stringify,
	parseJSON,
	capitalize,
	startsWith,
	endsWith,
	toLowerCase,
	toUpperCase,
	toLocaleLowerCase,
	toLocaleUpperCase,
	reverseChars,
	padStart,
	padEnd,
	truncateWords,
	getLength,
	length,
	True,
	False,
	not,
	isNaN,
	isLetter,
	isNumber,
	isSpecialChar,
	isLetterOrNumber,
	isUpperCase,
	isLowerCase,
	isSpace,
	isUniq,
	isOdd,
	isEven,
	isDivBy,
	isGt,
	isGtE,
	isLt,
	isLtE,
	isEq,
	isSame,
	isLooseEq,
	isClickOrEnter,
	isArray,
	isEmptyArray,
	isNotEmptyArray,
	isNotEmptyString,
	isNullish,
	isSet,
	isMap,
	or,
	and,
	pluck,
	getProp,
	groupBy,
	groupByProp,
	toArray,
	getKeys,
	getValues,
	flip,
	setCountMap,
	range,
	unfold,
	getAllPairs,
	getRandomNumber,
	when,
	ifElse,
	nab,
	delay,
	nap,
	removeNonLetters,
	removeNonNumbers,
	numWithCommas,
	showPopover,
	select,
	selectAll,
	guard,
	createADT,
	match,
	matchStrict,
	Maybe,
	Result,
	mapResult,
	mapMaybe,
	flatMapResult,
	flatMapMaybe,
	unwrap,
	defaultTo,
	isJust,
	isNothing,
	isOk,
	isErr,
	foldMaybe,
	foldResult,
	tryCatch,
} from '../index.js'

const test = (name, fn) => {
  try {
    fn();
    console.log('✔', name);
  } catch (err) {
    console.error('✘', name);
    console.error(err);
  }
};

// reverseChars
test('reverseChars reverses the characters in a string', () => {
  const result = reverseChars('abc');
  assert.strictEqual(result, 'cba');
});

// round
test('round rounds a number to the nearest integer', () => {
  assert.strictEqual(round(4.4), 4);
  assert.strictEqual(round(4.5), 5);
});

// see
test('see logs the value and returns it unchanged', () => {
  const obj = { hello: 'world' };
  const result = see(obj);
  assert.deepStrictEqual(result, obj);
});

// select
test('select queries DOM elements by selector', () => {
  const div = globalThis.document?.createElement?.('div') || {};
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '<div class="test"></div>';
    const result = select('.test');
    assert.strictEqual(result.length, 1);
  } else {
    assert.ok(typeof select === 'function'); // fallback to verify function exists
  }
});

// selectAll
test('selectAll queries all DOM elements by selector', () => {
  const divs = globalThis.document?.createElement?.('div') || {};
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '<div class="x"></div><div class="x"></div>';
    const result = selectAll('.x');
    assert.ok(result.length >= 2);
  } else {
    assert.ok(typeof selectAll === 'function');
  }
});

// shuffle
test('shuffle returns a shuffled array with same elements', () => {
  const input = [1, 2, 3, 4, 5];
  const result = shuffle(input);
  assert.strictEqual(result.length, input.length);
  assert.deepStrictEqual([...input].sort(), [...result].sort());
});

// setCountMap
test('setCountMap creates a frequency map from an array', () => {
  const result = setCountMap(['a', 'b', 'a', 'c', 'b', 'a']);
  const expected = new Map([['a', 3], ['b', 2], ['c', 1]]);
  assert.deepStrictEqual([...result], [...expected]);
});

// showPopover
test('showPopover exists and is a function', () => {
  assert.strictEqual(typeof showPopover, 'function');
});

// snitch
test('snitch logs a label and value without throwing', () => {
  assert.doesNotThrow(() => snitch('test label', { key: 42 }));
});

// sort
test('sort sorts an array of numbers in ascending order', () => {
  const result = sort((a, b) => a - b)([4, 2, 5, 1, 3]);
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5]);
});

// split
test('split divides a string by a delimiter', () => {
  const result = split(',')('a,b,c');
  assert.deepStrictEqual(result, ['a', 'b', 'c']);
});

// splitChars
test('splitChars splits a string into individual characters', () => {
  const result = splitChars('abc');
  assert.deepStrictEqual(result, ['a', 'b', 'c']);
});

// splitOnSpace
test('splitOnSpace splits a string by spaces', () => {
  const result = splitOnSpace('hello world again');
  assert.deepStrictEqual(result, ['hello', 'world', 'again']);
});



// sqrt
test('sqrt returns the square root of a number', () => {
  assert.strictEqual(sqrt(9), 3);
  assert.strictEqual(sqrt(0), 0);
});

// square
test('square returns the square of a number', () => {
  assert.strictEqual(square(3), 9);
  assert.strictEqual(square(0), 0);
});

// spread
test('spread returns a new array by spreading input', () => {
  const result = spread([1, 2, 3]);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

// startsWith
test('startsWith checks if a string starts with a substring', () => {
  assert.strictEqual(startsWith('foo')('foobar'), true);
  assert.strictEqual(startsWith('baz')('foobar'), false);
});



// sub
test('sub subtracts the second number from the first', () => {
  assert.strictEqual(sub(10)(3), 7);
});

// subBy
test('subBy subtracts the first number from the second', () => {
  assert.strictEqual(subBy(3)(10), 7);
});

// substring
test('substring returns a portion of a string between indices', () => {
  const result = substring(1)(4)('hello');
  assert.strictEqual(result, 'ell');
});

// stringify
test('stringify converts a value to a pretty JSON string', () => {
  assert.strictEqual(stringify({ a: 1 }), '{\n  "a": 1\n}');
});

// sum
test('sum adds up all numbers in an array', () => {
  const result = sum([1, 2, 3, 4]);
  assert.strictEqual(result, 10);
});



// toFixed
test('toFixed formats a number with fixed decimal places', () => {
  const result = toFixed(2)(3.14159);
  assert.strictEqual(result, '3.14');
});

// toLocaleLowerCase
test('toLocaleLowerCase converts a string to locale lowercase', () => {
  assert.strictEqual(toLocaleLowerCase('Äpfel'), 'äpfel');
});



// toLocaleUpperCase
test('toLocaleUpperCase converts a string to locale uppercase', () => {
  assert.strictEqual(toLocaleUpperCase('straße'), 'STRASSE');
});

// toLowerCase
test('toLowerCase converts a string to lowercase', () => {
  assert.strictEqual(toLowerCase('ABC'), 'abc');
});

// toObject
test('toObject converts key-value pairs into an object', () => {
  const result = toObject([['a', 1], ['b', 2]]);
  assert.deepStrictEqual(result, { a: 1, b: 2 });
});

// toLocaleString
test('toLocaleString formats number with separators', () => {
  const result = toLocaleString()(1234567.89);
  assert.ok(typeof result === 'string');
  assert.ok(result.length >= 5);
});

// toArray
test('toArray converts an object into an array of key-value pairs', () => {
  const result = toArray({ a: 1, b: 2 });
  assert.deepStrictEqual(result, [['a', 1], ['b', 2]]);
});

// toUpperCase
test('toUpperCase converts a string to uppercase', () => {
  assert.strictEqual(toUpperCase('hello'), 'HELLO');
});

// trim
test('trim removes leading and trailing whitespace', () => {
  assert.strictEqual(trim('  hello  '), 'hello');
});

// truncateWords
test('truncateWords limits string to specified number of words', () => {
  const result = truncateWords(2)('one two three four');
  assert.strictEqual(result, 'one two');
});



// uncurry
test('uncurry converts a curried function to uncurried form', () => {
  const curried = a => b => a + b;
  const uncurried = uncurry(curried);
  assert.strictEqual(uncurried(2, 3), 5);
});

// tryCatch
test('tryCatch returns Result.Err if function throws', () => {
  const safe = tryCatch(() => { throw new Error('fail') });
  const result = safe();
  assert.strictEqual(result.tag, 'Err');
  assert.strictEqual(result.message, 'fail');
});

// unfold
test('unfold generates a sequence from a seed and next function', () => {
  const next = x => x > 5 ? null : [x, x + 1];
  const result = unfold(next)(1);
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5]);
});

// union
test('union returns a unique array of all elements from both arrays', () => {
  const result = union([1, 2, 3])([3, 4, 5]);
  assert.deepStrictEqual(result.sort(), [1, 2, 3, 4, 5]);
});

// uniq
test('uniq removes duplicate values from an array', () => {
  const result = uniq([1, 2, 2, 3, 3, 3]);
  assert.deepStrictEqual(result, [1, 2, 3]);
});



// unzip
test('unzip splits an array of pairs into two arrays', () => {
  const result = unzip([['a', 1], ['b', 2]]);
  assert.deepStrictEqual(result, [['a', 'b'], [1, 2]]);
});

// unwrap
test('unwrap returns value or fallback if nullish', () => {
  const just = { tag: 'Just', value: 42 };
  const nothing = { tag: 'Nothing' };

  assert.strictEqual(unwrap('fallback')(just), 42);
  assert.strictEqual(unwrap('fallback')(nothing), 'fallback');
});

// when
test('when executes the effect if predicate returns true', () => {
  const result = when(x => x > 5)(x => x * 2)(6);
  assert.strictEqual(result, 12);
});

// zip
test('zip combines two arrays into pairs', () => {
  const result = zip(['a', 'b'])([1, 2]);
  assert.deepStrictEqual(result, [['a', 1], ['b', 2]]);
});

// Maybe
test('Maybe ADT has Just and Nothing constructors', () => {
  const just = Maybe.Just(42);
  const nothing = Maybe.Nothing();

  assert.deepStrictEqual(just, { tag: 'Just', value: 42 });
  assert.deepStrictEqual(nothing, { tag: 'Nothing' });
});

// add
test('add returns the sum of two numbers', () => {
  assert.strictEqual(add(2)(3), 5);
});

// and
test('and returns true if both predicates match', () => {
  const isEven = x => x % 2 === 0;
  const isPositive = x => x > 0;
  const isEvenAndPositive = and(isEven, isPositive);
  assert.strictEqual(isEvenAndPositive(4), true);
  assert.strictEqual(isEvenAndPositive(-2), false);
});

// append
test('append concatenates two strings', () => {
  assert.strictEqual(append('world')('hello '), 'hello world');
});



// ceil
test('ceil rounds numbers up', () => {
  assert.strictEqual(ceil(1.2), 2);
  assert.strictEqual(ceil(-1.8), -1);
});

// capitalize
test('capitalize only uppercases the first letter', () => {
  assert.strictEqual(capitalize('heLLo'), 'HeLLo');
});

// createADT
test('createADT returns tagged constructors with values', () => {
  const Shape = createADT({ Circle: ['radius'], Square: ['side'] });
  assert.deepStrictEqual(Shape.Circle(10), { tag: 'Circle', radius: 10 });
  assert.deepStrictEqual(Shape.Square(5), { tag: 'Square', side: 5 });
});

// curry
test('curry returns a curried version of a function', () => {
  const fn = (a, b, c) => a + b + c;
  const curried = curry(fn);
  assert.strictEqual(curried(1)(2)(3), 6);
});

// dec
test('dec decrements a number by 1', () => {
  assert.strictEqual(dec(5), 4);
});

// defaultTo
test('defaultTo returns inner value for Just, fallback for Nothing', () => {
  assert.strictEqual(defaultTo('fallback')(Maybe.Just('actual')), 'actual');
  assert.strictEqual(defaultTo('fallback')(Maybe.Nothing()), 'fallback');
});

// delay
test('delay waits and resolves after time', async () => {
  const before = Date.now();
  await delay(75);
  const after = Date.now();
  assert.ok(after - before >= 50);
});


// difference
test('difference returns elements in the first array not in the second', () => {
  const result = difference([1, 2, 3, 4])([2, 4]);
  assert.deepStrictEqual(result, [1, 3]);
});

// div
test('div divides two numbers', () => {
  assert.strictEqual(div(10)(2), 5);
});

// divBy
test('divBy divides second number by the first', () => {
  assert.strictEqual(divBy(2)(10), 5);
});

// endsWith
test('endsWith checks if string ends with a given substring', () => {
  assert.strictEqual(endsWith('bar')('foobar'), true);
  assert.strictEqual(endsWith('baz')('foobar'), false);
});

// flatMapMaybe
test('flatMapMaybe applies function and flattens Just/ Nothing', () => {
  const doubleJust = x => Maybe.Just(x * 2);
  const toNothing = () => Maybe.Nothing();
  assert.deepStrictEqual(flatMapMaybe(doubleJust)(Maybe.Just(2)), Maybe.Just(4));
  assert.deepStrictEqual(flatMapMaybe(toNothing)(Maybe.Just(2)), Maybe.Nothing());
});
