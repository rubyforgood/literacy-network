const endpoint = isbn => `/books/${isbn}`

export const fetchBookInfo = async (isbn) => {
  const headers = new Headers({ "Authorization": "Bearer " + window.sessionToken });
  const resp = await fetch(endpoint(isbn), { headers })
  const data = await resp.json()

  const title = data.title
  const publishDate = data.publish_date
  const authors = data.authors.map(author => author.name).join(", ")

  return {
    isbn,
    title,
    authors,
    publishDate
  }
}
