from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import random

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")
db = client["chatapp"]
messages_collection = db["messages"]


@app.route("/getmessages", methods=["GET"])
def get_messages():
    messages = messages_collection.find({}, {"_id": 0})
    return jsonify({"messages": list(messages)})


@app.route("/api/messages", methods=["POST"])
def add_message():
    try:
        data = request.json
        message = data.get("message").lower()
        messages_collection.insert_one({"message": message})
        print(f"Message stored: {message}")
        return jsonify({"success": True}), 201
    except Exception as e:
        print(f"Error inserting message: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
