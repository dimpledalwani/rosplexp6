from flask import Flask
from extensions import mongo, jwt
from auth import auth_bp
from books import books_bp
from bookmarks import bookmarks_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/elibrary"
app.config["JWT_SECRET_KEY"] = "super-secret-key"

mongo.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(books_bp)
#app.register_blueprint(bookmarks_bp)

if __name__ == "__main__":
    app.run(debug=True)
