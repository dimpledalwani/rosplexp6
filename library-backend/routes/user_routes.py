from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import mongo

user_bp = Blueprint("user", __name__)

@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = mongo.db.users.find_one({"username": current_user["username"]}, {"_id": 0, "password": 0})
    return jsonify(user), 200
