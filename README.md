# nejQuery

[![npm version](https://img.shields.io/npm/v/nejquery)](https://www.npmjs.com/package/nejquery)
![license](https://img.shields.io/npm/l/nejquery)
![minified size](https://img.shields.io/bundlephobia/min/nejquery)

**nejQuery** is a lightweight, functional JavaScript utility library — inspired by Ramda, Lodash, and FP principles — with a focus on **data-last**, **curried**, and **composable** functions. It offers a rich set of helpers for arrays, strings, numbers, objects, predicates, ADTs, and more.

> It's like Ramda with fewer gotchas, Lodash with less weight, and jQuery with... well, no jQuery.

---

## 🙃 Why not just use Ramda or Lodash?

> Honestly? You should. They're battle-tested, community-loved, and full-featured.  

> But if you've ever screamed "why is this curried nonsense so weird" or thought Lodash was a bit... much — welcome to **nejQuery**, the utility library your inner minimalist didn’t know it needed.


---

## ✨ Features

- Data-last, curried function signatures
- Immutable and side-effect-aware utilities
- Composable with `pipe()` and `compose()`
- Includes support for custom ADTs like `Maybe` and `Result`
- Written in plain JavaScript (no build step required)

---

## 📦 Installation

```bash
npm install nejquery
```

Or add manually:

```html
<script src="path/to/nejquery.js"></script>
```

---

## 🔧 Usage

Instead of writing imperative code like this:

```js
const nums = [1, 2, 3, 4];
const result = [];

for (let i = 0; i < nums.length; i++) {
  const x = nums[i];
  if (x % 2 === 1) {
    result.push(x + 1);
  }
}

console.log(result); // [2, 4]
```

...you can write code declaratively like this:

```js
import { pipe, map, filter, add } from 'nejquery'

const nums = [1, 2, 3, 4]

const isOdd = x => x % 2 === 1

// Partially applied functions
const add1 = add(1)
const filterIsOdd = filter(isOdd)
const mapIncrement = map(add1)

// Using Pipe for function composition
const incrementOdds = pipe(filterIsOdd, mapIncrement)

console.log(incrementOdds(nums)) // => [2, 4]
```

---

## 🧰 Categories

nejQuery is organized into the following sections:

- **[Array functions](./nejquery_docs.md#array-functions)**
- **[Number functions](./nejquery_docs.md#number-functions)**
- **[String functions](./nejquery_docs.md#string-functions)**
- **[Objects](./nejquery_docs.md#objects)**
- **[Utils](./nejquery_docs.md#utils)**
- **[Debugging functions](./nejquery_docs.md#debugging-functions)**
- **[Predicates](./nejquery_docs.md#predicates)**
- **[Helpers](./nejquery_docs.md#helpers)**

Full documentation is available in [**nejquery_docs.md**](./nejquery_docs.md)

---

## 🧪 ADT Support

Use `createADT` to build expressive data structures:

```js
const Vehicle = createADT({
  Car: ['make', 'model'],
  Bicycle: ['type'],
  Truck: ['make', 'payloadCapacity']
})

const myVehicle = Vehicle.Car('Toyota', 'Camry')

match(myVehicle, {
  Car: ({make, model}) => console.log(`Car: ${make} ${model}`),
  Bicycle: ({type}) => console.log(`Bicycle: ${type}`),
  Truck: ({make, payloadCapacity}) => console.log(`Truck: ${make}, Payload: ${payloadCapacity}kg`)
})
```

Includes built-in ADTs: `Maybe`, `Result` and matching helpers.

---

## 📄 Documentation

All functions are documented with descriptions, examples, and implementations in [**nejquery_docs.md**](./nejquery_docs.md)

---

## 🧠 Philosophy

- Keep functions small and pure
- Prioritize readability and composability
- Never mutate inputs
- Empower functional programming in everyday JavaScript

---

## 📣 Contributing

Got a function to propose? Open a PR or an issue — contributions are welcome!

---

> **Disclaimer:** nejQuery is not affiliated with or endorsed by the jQuery Foundation or OpenJS Foundation.  
> Plus, I have great respect for jQuery. My grandfather used to use it.

---

## 📜 License

MIT
