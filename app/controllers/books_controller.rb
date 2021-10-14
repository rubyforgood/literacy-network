# frozen_string_literal: true

class BooksController < AuthenticatedController
  protect_from_forgery unless: -> { request.format.json? || request.format.xml? }

  BOOKS = [{
    "id": 1,
    "isbn": "0140328726",
    "title": "Fantastic Mr. Fox",
    "authors": [
      {
        "name": "Roald Dahl"
      }
    ],
    "number_of_pages": 96,
    "publishers": [
      {
        "name": "Puffin"
      }
    ],
    "publish_date": "October 1, 1988"
  }]

  def index
    render(json: BOOKS)
  end
  
  def show
    book = BOOKS.find {|book| book[:isbn] == params[:isbn] }

    if book.nil?
      render(json: { message: "404 Not Found" }, status: 404)
    else
      render(json: book)
    end
  end

  def create
    render(json: params.merge({ id: rand(1000) }), status: 202)
  end

  def update
    render(json: params, status: 200)
  end
end
