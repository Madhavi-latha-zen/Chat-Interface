from flask import Flask, request, jsonify
import requests
from pymongo import MongoClient
from datetime import datetime
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["bardapi_database"]
collection = db["chat_responses"]

GOOGLE_API_KEY = "AIzaSyAMW83h45cu6AaeLEQA97xtpNWivMztwtM"
GOOGLE_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText"

logging.basicConfig(level=logging.INFO)


def sanitize_input(message):
    return message.strip()


@app.route("/", methods=["GET"])
def welcome():
    return "Welcome to the Chat API"


@app.route("/api", methods=["POST"])
def api_post():
    data = request.get_json()
    message = sanitize_input(data.get("message", ""))
    bot_response = f"You said: {message}"

    if not message or len(message) > 500:
        logging.warning("Invalid or excessively long message provided")
        return jsonify({"error": "Invalid message"}), 400

    logging.info(f"Received message: {message}")

    payload = {
        "prompt": {
            "text": message,
        },
    }

    try:
        response = requests.post(
            GOOGLE_API_ENDPOINT,
            json=payload,
            params={"key": GOOGLE_API_KEY},
        )

        if response.status_code != 200:
            logging.error(f"Google API Error: {response.status_code}")
            return jsonify({"error": f"Google API Error: {response.status_code}"}), 500

        response_data = response.json()

        if "candidates" not in response_data or not response_data["candidates"]:
            logging.error("Invalid response: 'candidates' key missing or empty")
            return (
                jsonify(
                    {"error": "Invalid response: 'candidates' key missing or empty"}
                ),
                500,
            )

        first_candidate = response_data["candidates"][0]

        if "output" not in first_candidate:
            logging.error("Invalid response: 'output' key missing")
            return jsonify({"error": "Invalid response: 'output' key missing"}), 500

        response_text = first_candidate["output"]

        logging.info(f"Response received: {response_text}")

        document = {
            "user_message": message,
            "bot_response": response_text,
            "timestamp": datetime.utcnow(),
        }

        collection.insert_one(document)

        return jsonify({"response": response_text}), 200

    except requests.exceptions.RequestException as e:
        logging.error(f"Request error: {e}")
        return jsonify({"error": f"Request error: {e}"}), 500

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": f"Unexpected error: {e}"}), 500


@app.route("/api/data", methods=["GET"])
def api_get():
    try:

        documents = list(collection.find({}))

        result = []
        for doc in documents:
            result.append(
                {
                    "id": str(doc["_id"]),
                    "user_message": doc["user_message"],
                    "bot_response": doc["bot_response"],
                    "timestamp": doc["timestamp"],
                }
            )

        return jsonify({"data": result}), 200

    except Exception as e:
        logging.error(f"Error retrieving data: {e}")
        return jsonify({"error": f"Error retrieving data: {e}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
