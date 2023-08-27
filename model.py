import os
import openai

openai.api_key = os.getenv("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")
openai.api_key_path = "key.txt"



# response = openai.Completion.create(
#   model="text-davinci-003",
#   prompt="Given a simple meal, generate a list of all necessary ingredients and amounts needed to purchase. The food is spaghetti & meatballs"
# )


def generateMeal(recipe):
    return openai.ChatCompletion.create(
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


response = generateMeal("Chicken Tacos")
file = open("return.json", "w")
# file.write(response)
# print(response)
# print(response.type())



 
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins = ["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# @app.get('/get-result')
# async def getResult(msg: str):
#     return classifyMessage(msg)