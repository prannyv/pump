from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import openai

# openai.api_key = os.getenv("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")
openai.api_key_path = "key.txt"


def generateMeal(recipe):
    mealVar= openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
            "role": "system",
            "content": "You are a meal preparation helper and given an inputted meal, generate a recipe and list of necessary ingredients and amounts in grams or kilograms for all items (convert from cups or tablespoons to grams)"
            },
            {
            "role": "user",
            "content": "The meal is" + str(recipe)
            },
            
        ],
        temperature=1,
        max_tokens=512,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["Note"]
    )

    # file = open('ingredients.txt', "w")
    # text = mealVar['choices'][0]["message"]["content"]
    # file.write(text)

    return mealVar

app = Flask(__name__)
cors = CORS(app)

# header = w.Header()
# header.Add("Access-Control-Allow-Origin", "*")

# if r.Method == "OPTIONS" {
#     w.WriteHeader(http.StatusOK)
#     return
# }


@app.route("/")
def hello_world():
    return "hi"


@app.route("/test", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        data = request.get_data()
        meal = generateMeal(data)
        print(meal['choices'][0]["message"]["content"])
        return meal['choices'][0]["message"]["content"]
    return json.dumps({'success': True}), 200, {'ContentType': 'text/plain'}

if __name__ == "__main__":
     app.run(host='0.0.0.0', port=4000)
