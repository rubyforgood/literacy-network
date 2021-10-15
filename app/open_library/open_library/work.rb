module OpenLibrary
  class Work < Resource
    def description
      String(source_json[:description])
    end

    def attributes
      {
        description: nil,
      }
    end
  end
end
