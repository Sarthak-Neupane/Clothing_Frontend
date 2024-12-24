export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { query, type } = body

  const results = await searchProducts(query, type)

  return {
    results
  }
})

async function searchProducts(q: string, t: string) {
  const response = await fetch(`http://localhost:8080/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Id: q, Name: t })
  })
  const result = await response.json()
  return result
}


