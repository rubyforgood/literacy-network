const endpoint = isbn => `/books/${isbn}`
const headers = new Headers({ "Authorization": "Bearer " + window.sessionToken });

export const fetchBookInfo = async (isbn) => {
  const resp = await fetch(endpoint(isbn), { headers })
  const data = await resp.json()

  const id = data.id
  const title = data.title
  const publishDate = data.publish_date
  const authors = data.authors.map(author => author.name).join(", ")

  return {
    id,
    isbn,
    title,
    authors,
    publishDate
  }
}

export const createBook = async (book) => {
  const resp = await fetch(`books`, { method: "POST", body: JSON.stringify(book), headers })
  const data = await resp.json()

  return data
}

export const updateBook = async (book) => {
  const resp = await fetch(endpoint(book.isbn), { method: "PATCH", body: JSON.stringify(book), headers })
  const data = await resp.json()

  return data
}
