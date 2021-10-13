# frozen_string_literal: true
class Shop
  def api_version
    ShopifyApp.configuration.api_version
  end
end
