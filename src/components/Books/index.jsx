export default function Books({ books = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Publish Date</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.authors}</td>
            <td>{book.publishDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
