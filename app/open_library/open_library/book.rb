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

    def subjects
      Array(book_json[:subjects]).map { |subject| { name: String(subject) } }
    end

    def physical_dimensions
      String(book_json[:physical_dimensions])
    end

    def weight
      String(book_json[:weight])
    end

    def physical_format
      String(book_json[:physical_format])
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
        subjects: [],
        physical_dimensions: nil,
        weight: nil,
        physical_format: nil,
      }
    end

    private

    attr_accessor :book_json
  end
end
