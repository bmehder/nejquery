# nejQuery

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

```js
import { pipe, map, filter, add } from 'nejquery'

const nums = [1, 2, 3, 4]

const doubledOdds = pipe(
  filter(x => x % 2 === 1),
  map(add(1))
)(nums)

console.log(doubledOdds) // => [2, 4]
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
const Option = createADT({ Some: ['value'], None: [] })
const maybeValue = Option.Some(42)

match(maybeValue, {
  Some: ({ value }) => console.log(value),
  None: () => console.log('Nothing here'),
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

## 📜 License

MIT
