export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { query, type } = body

  console.log(`Searching for ${type} with query: ${query}`)

  return {
    results: [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ]
  }
})
