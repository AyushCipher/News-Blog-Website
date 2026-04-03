export default async function handler(req, res) {
  const { endpoint = 'top-headlines', category, q, lang = 'en' } = req.query
  const apiKey = process.env.GNEWS_API_KEY

  let url = `https://gnews.io/api/v4/${endpoint}?lang=${lang}&apikey=${apiKey}`

  if (category) {
    url += `&category=${category}`
  }
  if (q) {
    url += `&q=${q}`
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('News API error:', error)
    res.status(500).json({ error: 'Failed to fetch news', details: error.message })
  }
}
