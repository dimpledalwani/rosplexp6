from flask import Blueprint, request, jsonify
from app import mongo

book_bp = Blueprint("book", __name__)

@book_bp.route("/", methods=["GET"])
def get_books():
    books = list(mongo.db.books.find({}, {"_id": 0}))
    return jsonify(books), 200

@book_bp.route("/", methods=["POST"])
def add_book():
    data = request.get_json()
    book = {
        "title": data["title"],
        "author": data["author"],
        "genre": data.get("genre", "Unknown"),
        "availability": data.get("availability", "Available")
    }
    mongo.db.books.insert_one(book)
    return jsonify({"message": "Book added successfully"}), 201
