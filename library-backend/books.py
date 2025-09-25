from flask import Blueprint, request, jsonify
from extensions import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from auth import role_required  # 👈 Add this line


books_bp = Blueprint("books", __name__)

@books_bp.route("/books", methods=["POST"])
@jwt_required()
@role_required("admin")
def add_book():
    data = request.get_json()
    mongo.db.books.insert_one(data)
    return jsonify({"message": "Book added"}), 201

@books_bp.route("/books", methods=["GET"])
@jwt_required()
def get_books():
    books = list(mongo.db.books.find({}, {"_id": 0}))
    return jsonify(books), 200

@books_bp.route("/books/<isbn>", methods=["PUT"])
@jwt_required()
@role_required("admin")
def update_book(isbn):
    data = request.get_json()
    mongo.db.books.update_one({"isbn": isbn}, {"$set": data})
    return jsonify({"message": "Book updated"}), 200

@books_bp.route("/books/<isbn>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_book(isbn):
    mongo.db.books.delete_one({"isbn": isbn})
    return jsonify({"message": "Book deleted"}), 200