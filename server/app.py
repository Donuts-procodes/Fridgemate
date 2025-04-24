from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

from dotenv import load_dotenv
import os

load_dotenv()

cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app)


@app.route("/api/foods/<user_id>", methods=["GET", "POST"])
def handle_foods(user_id):
    if request.method == "GET":
        docs = db.collection(user_id).stream()
        food_list = [{**doc.to_dict(), "id": doc.id} for doc in docs]
        return jsonify(food_list)

    if request.method == "POST":
        data = request.json
        db.collection(user_id).add(data)
        return jsonify({"message": "Food item added"}), 201


@app.route("/api/foods/<user_id>/<item_id>", methods=["DELETE", "PUT"])
def modify_food(user_id, item_id):
    ref = db.collection(user_id).document(item_id)
    if request.method == "DELETE":
        ref.delete()
        return jsonify({"message": "Item deleted"})
    if request.method == "PUT":
        data = request.json
        ref.update(data)
        return jsonify({"message": "Item updated"})


if __name__ == "__main__":
    app.run(debug=True)
