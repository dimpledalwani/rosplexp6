from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "supersecretkey"  # Change this in production
jwt = JWTManager(app)

client = MongoClient("mongodb://localhost:27017/")
db = client.elibrary

# 🔐 User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if db.users.find_one({"username": data["username"]}):
        return jsonify({"message": "User already exists"}), 409
    db.users.insert_one(data)
    return jsonify({"message": "User registered successfully"}), 201

# 🔓 User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = db.users.find_one({"username": data["username"], "password": data["password"]})
    if user:
        access_token = create_access_token(identity=data["username"])
        return jsonify({"access_token": access_token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# 📚 Create a Book (Protected)
@app.route("/books", methods=["POST"])
@jwt_required()
def add_book():
    data = request.get_json()
    db.books.insert_one(data)
    return jsonify({"message": "Book added successfully!"}), 201

# 📖 Get All Books (Protected)
@app.route("/books", methods=["GET"])
@jwt_required()
def get_books():
    books = list(db.books.find({}, {"_id": 0}))
    return jsonify(books)

# 🔍 Get a Book by ISBN (Protected)
@app.route("/books/<isbn>", methods=["GET"])
@jwt_required()
def get_book(isbn):
    book = db.books.find_one({"isbn": isbn}, {"_id": 0})
    if book:
        return jsonify(book)
    return jsonify({"message": "Book not found"}), 404

# ✏️ Update a Book by ISBN (Protected)
@app.route("/books/<isbn>", methods=["PUT"])
@jwt_required()
def update_book(isbn):
    data = request.get_json()
    result = db.books.update_one({"isbn": isbn}, {"$set": data})
    if result.matched_count > 0:
        return jsonify({"message": "Book updated successfully!"})
    return jsonify({"message": "Book not found"}), 404

# 🗑️ Delete a Book by ISBN (Protected)
@app.route("/books/<isbn>", methods=["DELETE"])
@jwt_required()
def delete_book(isbn):
    result = db.books.delete_one({"isbn": isbn})
    if result.deleted_count > 0:
        return jsonify({"message": "Book deleted successfully!"})
    return jsonify({"message": "Book not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
