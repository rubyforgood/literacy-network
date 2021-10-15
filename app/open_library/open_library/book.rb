module OpenLibrary
  class Book < Resource

    def isbn
      Array(source_json[:isbn_13]).first ||
      Array(source_json[:isbn_10]).first
    end

    def title
      String(source_json[:title])
    end

    def authors
      @authors ||= OpenLibrary.authors(Array(source_json[:authors]).flat_map(&:values))
    end

    def publishers
      Array(source_json[:publishers]).each_with_object([]) { |publisher, all_publishers| all_publishers << { name: publisher } }
    end

    def number_of_pages
      Integer(source_json[:number_of_pages])
    end

    def publish_date
      String(source_json[:publish_date])
    end

    def subjects
      Array(source_json[:subjects]).map { |subject| { name: String(subject) } }
    end

    def physical_dimensions
      String(source_json[:physical_dimensions])
    end

    def weight
      String(source_json[:weight])
    end

    def physical_format
      String(source_json[:physical_format])
    end

    def destination
      String(works.map(&:description).compact.first)
    end

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
        destination: nil,
      }
    end

    private

    def works
      @works ||= OpenLibrary.works(Array(source_json[:works]).flat_map(&:values))
    end
  end
end
