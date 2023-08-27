from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# header = w.Header()
# header.Add("Access-Control-Allow-Origin", "*")

# if r.Method == "OPTIONS" {
#     w.WriteHeader(http.StatusOK)
#     return
# }


# @app.route("/")
def hello_world():
    return "Hello, World!"


if __name__ == "__main__":
     app.run(host='0.0.0.0', port=4000)
