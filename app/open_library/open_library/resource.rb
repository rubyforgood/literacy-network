module OpenLibrary
  class Resource
    include ActiveModel::Serializers

    def initialize(source_json)
      self.source_json = source_json
    end

    def attributes
      {}
    end

    delegate :blank?, to: :book_json

    private

    attr_accessor :source_json
  end
end
