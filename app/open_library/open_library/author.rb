module OpenLibrary
  class Author
    include ActiveModel::Serializers::JSON

    def initialize(author_json)
      self.author_json = author_json
    end

    def name
      String(author_json[:name])
    end

    def bio
      String(author_json[:bio])
    end

    def attributes
      { name: nil }
    end

    private

    attr_accessor :author_json
  end
end
