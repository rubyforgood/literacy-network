function jsonToCSV(books = []) {
  const header = Object.keys(books[0]).join(",")
  const items = books.map(book => Object.values(book).map(JSON.stringify).join(",")).join("\n")

  return `${header}\n${items}`
}

export default function Books({ books = [] }) {
  const blob = new Blob([jsonToCSV(books)], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  return (
    <table>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Publish Date</th>
          <th><a href={url} download="books.csv">Export CSV</a></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.authors}</td>
            <td>{ book.publishDate }</td>
            <td>&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
