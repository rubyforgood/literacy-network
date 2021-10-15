const endpoint = isbn => `/books/${isbn}`

export const fetchBookInfo = async (isbn) => {
  const headers = new Headers({ "Authorization": "Bearer " + window.sessionToken });
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

const createHeaders = () => {
  return new Headers({ "Authorization": "Bearer " + window.sessionToken, "Content-Type": "application/json" });
}

export const createBook = async (book) => {
  const headers = createHeaders()
  return await fetch(`books`, { method: "POST", body: JSON.stringify(book), headers })
}

export const updateBook = async (book) => {
  const headers = createHeaders()
  return await fetch(endpoint(book.isbn), { method: "PATCH", body: JSON.stringify(book), headers })
}
