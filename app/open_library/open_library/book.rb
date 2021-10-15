module OpenLibrary
  class Book
    include ActiveModel::Serializers::JSON

    def initialize(book_json)
      self.book_json = Hash(book_json)
    end

    def isbn
      Array(book_json[:isbn_13]).first ||
      Array(book_json[:isbn_10]).first
    end

    def title
      String(book_json[:title])
    end

    def authors
      @authors ||= OpenLibrary.authors(book_json[:authors].flat_map(&:values))
    end

    def publishers
      Array(book_json[:publishers]).each_with_object([]) { |publisher, all_publishers| all_publishers << { name: publisher } }
    end

    def number_of_pages
      Integer(book_json[:number_of_pages])
    end

    def publish_date
      String(book_json[:publish_date])
    end

    delegate :blank?, to: :book_json

    def attributes
      {
        isbn: nil,
        title: nil,
        authors: [],
        number_of_pages: nil,
        publishers: [],
        publish_date: nil,
      }
    end

    private

    attr_accessor :book_json
  end
end
