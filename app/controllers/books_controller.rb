# frozen_string_literal: true

class BooksController < AuthenticatedController
  skip_before_action :verify_authenticity_token

  ShopifyAPI::Base.api_version = '2021-10'

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
    if book.present?
      render(json: book)
    else
      render(json: { message: "404 Not Found" }, status: 404)
    end
  end

  def create
    create_book_mutation = create_product_with_variants_and_metafields(params)
    client.query(create_book_mutation)

    render(json: params.merge({ id: rand(1000) }), status: 202)
  end

  def update
    render(json: params, status: 200)
  end

private

  def client
    ShopifyAPI::GraphQL.client
  end

  def create_product_with_variants_and_metafields(params)
    condition = params[:condition] || "new"

    quantiy_of_new = params[:quantity] if condition.downcase == "new"
    quantity_of_used = params[:quantity] if condition.downcase == "used"

    price_of_new = params[:price] if condition.downcase == "new"
    price_of_used = params[:price] if condition.downcase == "used"

    client.parse <<~GRAPHQL
      mutation {
        productCreate(input: {
          title: "#{params[:title]}",
          variants: [
            {
              barcode: "#{params[:isbn]}",
              sku: "#{params[:isbn]}",
              price: #{price_of_new || 0},
              options: ["New"],
              inventoryItem: {
                tracked: true,
              },
              inventoryQuantities: {
                availableQuantity: #{quantiy_of_new || 0},
                locationId: "gid://shopify/Location/65796014326",
              },
            },
            {
              barcode: "#{params[:isbn]}",
              sku: "#{params[:isbn]}",
              price: #{price_of_used || 0},
              options: ["Used"],
              inventoryItem: {
                tracked: true,
              },
              inventoryQuantities: {
                availableQuantity: #{quantity_of_used || 0},
                locationId: "gid://shopify/Location/65796014326",
              },
            }
          ],
          metafields: [
            {
              namespace: "my_fields",
              key: "author",
              value: "#{params[:author]}",
              type: "single_line_text_field"
            },
            {
              namespace: "facts",
              key: "isbn",
              value: "#{params[:isbn]}",
              type: "single_line_text_field"
            },
            {
              namespace: "my_fields",
              key: "published_date",
              value: "#{params[:publishDate]}",
              type: "single_line_text_field"
            },
            {
              namespace: "my_fields",
              key: "subject",
              value: "#{params[:subjects]}",
              type: "single_line_text_field"
            },
          ]
        }) {
          userErrors {
            field
            message
          },
          product {
            id
            title
            variants(first: 2){
              edges {
                node {
                  title
                  sku
                  price
                }
              }
            }
            metafields(first: 4){
              edges {
                node {
                  value
                }
              }
            }
          }
        }
      }
    GRAPHQL
  end

  def book
    @book ||= find_book_in_shopify || find_book_in_open_library

  end

  def find_book_in_shopify
    BOOKS.find { |book| book[:isbn] == params[:isbn] }
  end

  def find_book_in_open_library
    OpenLibrary.lookup_by_isbn(params[:isbn])
  end
end
