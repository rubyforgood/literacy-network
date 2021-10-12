function createCsvItem(book) {
  return Object.values(book).map(JSON.stringify).join(",")
}

export function jsonToCsv(books = []) {
  const header = Object.keys(books[0]).join(",")
  const items = books.map(createCsvItem).join("\n")

  return `${header}\n${items}`
}
