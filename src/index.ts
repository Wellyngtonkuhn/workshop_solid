import { buildApp } from "./drivers/app.js"

const app = buildApp()

await app.ready()

await app.listen({
  port: 3000
})

console.log('App running at http://localhost:3000')
console.log('Documentation running at http://localhost:3000/docs')