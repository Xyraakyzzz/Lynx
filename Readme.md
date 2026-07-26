<div align="center">

# 🦊 Lynx

**Fast, lightweight, and Lynx-compatible web framework for Node.js.**

[![npm](https://img.shields.io/npm/v/@xof/lynx?color=cb3837&logo=npm)](https://www.npmjs.com/package/@xof/lynx)
[![Downloads](https://img.shields.io/npm/dm/@xof/lynx?logo=npm)](https://www.npmjs.com/package/@xof/lynx)
[![License](https://img.shields.io/github/license/Xyraakyzzz/Lynx)](https://github.com/Xyraakyzzz/Lynx)
[![GitHub](https://img.shields.io/badge/GitHub-Xyraakyzzz-black?logo=github)](https://github.com/Xyraakyzzz/Lynx)

Simple. Familiar. Powerful.

</div>

---

# Installation

```bash
npm install @xof/lynx
```

or

```bash
yarn add @xof/lynx
```

or

```bash
pnpm add @xof/lynx
```

---

# Quick Start

```js
import lynx from '@xof/lynx'

const app = lynx()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

Run:

```bash
node index.js
```

Open:

```
http://localhost:3000
```

---

# Features

- ⚡ Extremely fast
- 📦 Lightweight
- 🚀 Custom fetch
- 🔧 Middleware support
- 📁 Static files
- 🍪 Cookies
- 📄 JSON & Text responses
- 🌐 Router support
- ❤️ Easy to learn

---

# Basic Usage

## GET

```js
app.get('/', (req, res) => {
  res.send('Hello World')
})
```

---

## POST

```js
app.post('/login', (req, res) => {
  res.json({
    success: true
  })
})
```

---

## Route Parameters

```js
app.get('/users/:id', (req, res) => {
  res.send(req.params.id)
})
```

---

## Query

```
/search?q=lynx
```

```js
app.get('/search', (req, res) => {
  res.json(req.query)
})
```

---

## JSON Response

```js
app.get('/api', (req, res) => {
  res.json({
    success: true,
    creator: 'Xyraakyzzz'
  })
})
```

---

## Send File

```js
app.get('/download', (req, res) => {
  res.sendFile('./example.txt')
})
```

---

## Static Files

```js
app.use('/public', lynx.static('public'))
```

```
public/
 ├── style.css
 ├── app.js
 └── logo.png
```

Access:

```
/public/style.css
```

---

## Middleware

```js
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
```

---

## Listen

```js
app.listen(3000)
```

or

```js
app.listen(3000, () => {
  console.log('Ready!')
})
```

---

# Compatibility

```js
app.get(...)
app.post(...)
app.put(...)
app.patch(...)
app.delete(...)

app.use(...)
app.listen(...)
```

---

# Example Project

```js
import lynx from '@xof/lynx'

const app = lynx()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Welcome to Lynx!')
})

app.get('/json', (req, res) => {
  res.json({
    framework: 'Lynx',
    version: '1.0.0'
  })
})

app.listen(3000)
```

---

# Documentation

Coming soon.

---

# Repository

GitHub

https://github.com/Xyraakyzzz/Lynx

NPM

https://www.npmjs.com/package/@xof/lynx

---

# 🇮🇩 Tutorial (Bahasa Indonesia)

## Instalasi

```bash
npm install @xof/lynx
```

---

## Membuat Server

```js
import lynx from '@xof/lynx'

const app = lynx()

app.get('/', (req, res) => {
  res.send('Halo Dunia!')
})

app.listen(3000)
```

Jalankan:

```bash
node index.js
```

Lalu buka:

```
http://localhost:3000
```

---

## Routing

```js
app.get('/about', (req, res) => {
  res.send('Tentang')
})

app.post('/login', (req, res) => {
  res.json({
    success: true
  })
})
```

---

## Parameter URL

```js
app.get('/users/:id', (req, res) => {
  res.send(req.params.id)
})
```

---

## Query

```
/search?q=node
```

```js
req.query.q
```

---

## Middleware

```js
app.use((req, res, next) => {
  console.log(req.url)
  next()
})
```

---

## Mengirim JSON

```js
res.json({
  success: true
})
```

---

## Menjalankan Server

```js
app.listen(3000)
```

---

# 🇺🇸 Tutorial (English)

## Install

```bash
npm install @xof/lynx
```

---

## Create a Server

```js
import lynx from '@xof/lynx'

const app = lynx()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)
```

Run:

```bash
node index.js
```

Visit:

```
http://localhost:3000
```

---

## Routing

```js
app.get('/about', (req, res) => {
  res.send('About')
})

app.post('/login', (req, res) => {
  res.json({
    success: true
  })
})
```

---

## URL Parameters

```js
app.get('/users/:id', (req, res) => {
  res.send(req.params.id)
})
```

---

## Query

```
/search?q=node
```

```js
req.query.q
```

---

## Middleware

```js
app.use((req, res, next) => {
  console.log(req.url)
  next()
})
```

---

## JSON Response

```js
res.json({
  success: true
})
```

---

## Start Server

```js
app.listen(3000)
```

---

# HTTP Client (Fetch)

Lynx includes a built-in HTTP client based on the native `fetch()` API.

## Import

### CommonJS

```js
const lynx = require('@xof/lynx')

const res = await lynx.fetch.get('https://jsonplaceholder.typicode.com/posts/1')

console.log(res.data)
```

### ES Module

```js
import lynx from '@xof/lynx'

const res = await lynx.fetch.get('https://jsonplaceholder.typicode.com/posts/1')

console.log(res.data)
```

---

## GET

```js
const res = await lynx.fetch.get('https://api.example.com/users')

console.log(res.data)
```

---

## POST

```js
const res = await lynx.fetch.post(
  'https://api.example.com/users',
  {
    name: 'John',
    age: 20
  }
)

console.log(res.data)
```

---

## PUT

```js
await lynx.fetch.put(
  'https://api.example.com/users/1',
  {
    name: 'John'
  }
)
```

---

## PATCH

```js
await lynx.fetch.patch(
  'https://api.example.com/users/1',
  {
    age: 21
  }
)
```

---

## DELETE

```js
await lynx.fetch.delete('https://api.example.com/users/1')
```

---

## HEAD

```js
await lynx.fetch.head('https://api.example.com')
```

---

## OPTIONS

```js
await lynx.fetch.options('https://api.example.com')
```

---

## Custom Headers

```js
const res = await lynx.fetch.get(
  'https://api.example.com',
  {
    headers: {
      Authorization: 'Bearer YOUR_TOKEN'
    }
  }
)
```

---

## Base URL

```js
const api = lynx.fetch.create({
  baseURL: 'https://api.example.com'
})

const users = await api.get('/users')
const posts = await api.get('/posts')
```

---

## Response

Every request returns:

```js
{
  data,
  status,
  statusText,
  ok,
  redirected,
  url,
  method,
  headers,
  response
}
```

Example:

```js
const res = await lynx.fetch.get('https://api.example.com')

console.log(res.status)
console.log(res.ok)
console.log(res.headers)
console.log(res.data)
```

---

## License

This project is licensed under the **[MIT License](LICENSE)**.

---

<div align="center">

Made with ❤️ by **[Xyraakyzzz](https://github.com/Xyraakyzzz)**

⭐ If you like **Lynx**, don't forget to give this repository a star.

</div>
