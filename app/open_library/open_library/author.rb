module OpenLibrary
  class Author < Resource
    def name
      String(source_json[:name])
    end

    def bio
      String(source_json[:bio])
    end

    def attributes
      {
        name: nil,
        bio: nil,
      }
    end
  end
end
