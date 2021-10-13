import React from "react"
import { jsonToCsv } from "../../helpers/csv"

export default function Books({ books = [] }) {
  const blob = new Blob([jsonToCsv(books)], { type: "text/csv" })
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
