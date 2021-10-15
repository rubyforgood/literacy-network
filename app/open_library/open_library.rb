module OpenLibrary
  mattr_accessor :connection_pool,
                 instance_accessor: false,
                 default: ConnectionPool.new(size: ENV.fetch("RAILS_MAX_THREADS") { 16 }, timeout: 5) { HttpClient.new }

  def self.lookup_by_isbn(isbn)
    Book.new(connection_pool.with { |client| client.get("/isbn/#{isbn}.json") })
  end

  def self.authors(authors)
    Array(authors).map { |author| Author.new(connection_pool.with { |client| client.get("#{author}.json") }) }
  end
end
