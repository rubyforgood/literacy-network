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

export const createBook = (book) => {
  return fetch(`books`, { method: "POST", body: JSON.stringify(book), headers })
}

export const updateBook = (book) => {
  return fetch(endpoint(book.isbn), { method: "PATCH", body: JSON.stringify(book), headers })
}
