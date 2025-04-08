from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from extensions import mongo
from functools import wraps

auth_bp = Blueprint("auth", __name__)

# 🔐 Role-based access decorator
def role_required(required_role):
    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user = get_jwt_identity()
            user = mongo.db.users.find_one({"username": current_user})
            if user and user.get("role") == required_role:
                return func(*args, **kwargs)
            return jsonify({"message": "Access denied"}), 403
        return wrapper
    return decorator

# 📝 Register Route
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or not data.get("username") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "Missing fields"}), 400

    if mongo.db.users.find_one({"username": data["username"]}):
        return jsonify({"message": "User already exists"}), 409

    hashed_password = generate_password_hash(data["password"])
    user = {
        "username": data["username"],
        "password": hashed_password,
        "role": data["role"],
        "bookmarks": []
    }
    mongo.db.users.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 201

# 🔐 Login Route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = mongo.db.users.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token, "role": user["role"]}), 200
