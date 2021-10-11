const endpoint = isbn => `https://openlibrary.org/isbn/${isbn}.json`

export const fetchBookInfo = async (isbn) => {
  const resp = await fetch(endpoint(isbn))
  const data = await resp.json()

  const title = data.title
  const publishDate = data.publish_date
  // TODO: Resolve authors info as a comma separated list
  const author = data.authors[0].key

  return {
    isbn,
    title,
    author,
    publishDate
  }
}
