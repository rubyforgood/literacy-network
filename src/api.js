const endpoint = isbn => `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`

export const fetchBookInfo = async (isbn) => {
  const resp = await fetch(endpoint(isbn))
  const data = await resp.json()
  const info = data[`ISBN:${isbn}`]

  const title = info.title
  const publishDate = info.publish_date
  const authors = info.authors.map(author => author.name).join(", ")

  return {
    isbn,
    title,
    authors,
    publishDate
  }
}
