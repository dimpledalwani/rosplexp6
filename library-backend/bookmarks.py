from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import mongo

bookmarks_bp = Blueprint("bookmarks", __name__)

@bookmarks_bp.route("/bookmarks", methods=["GET"])
@jwt_required()
def get_bookmarks():
    user = get_jwt_identity()["username"]
    bookmarks = list(mongo.db.bookmarks.find({"username": user}, {"_id": 0}))
    return jsonify(bookmarks)

@bookmarks_bp.route("/bookmarks", methods=["POST"])
@jwt_required()
def add_bookmark():
    user = get_jwt_identity()["username"]
    data = request.get_json()
    data["username"] = user
    mongo.db.bookmarks.insert_one(data)
    return jsonify({"message": "Bookmark added"}), 201

@bookmarks_bp.route("/bookmarks/<isbn>", methods=["DELETE"])
@jwt_required()
def delete_bookmark(isbn):
    user = get_jwt_identity()["username"]
    mongo.db.bookmarks.delete_one({"username": user, "isbn": isbn})
    return jsonify({"message": "Bookmark removed"}), 200
