module OpenLibrary
  class HttpClient
    def initialize(root_url: "https://openlibrary.org/")
      self.root_uri = URI(root_url)
      self.http =  new_http
    end

    def get(path, params: nil, headers: {})
      uri = build_uri_for(path, and_params: params)
      request = Net::HTTP::Get.new(uri)
      Hash(headers).each { |header, value| request[header] = value }

      request(request)
    end

    private

    attr_accessor :http,
                  :root_uri

    delegate :host, to: :root_uri
    delegate :port, to: :root_uri
    delegate :scheme, to: :root_uri

    def new_http
      Net::HTTP.start(host, port, use_ssl: scheme == "https")
    end

    def build_uri_for(path, and_params: {})
      uri = URI.join(root_uri, path)
      params = Array(URI.decode_www_form(String(uri.query))) << params.to_a
      uri.query = URI.encode_www_form(params)

      uri
    end

    def request(request)
      case response = http.request(request)
      when Net::HTTPSuccess
        JSON.parse(response.body, symbolize_names: true)
      when Net::HTTPRedirection
        Rails.logger.debug("[#{self.class}] Following redirect for request: #{request.uri}, to location: #{response['location']}")
        get(response["location"])
      else
        Rails.logger.warn("[#{self.class}] Unexpected for response: #{request.uri}, status: #{response.code}")
        nil
      end
    end
  end
end
