import pandas as pd
from data_parse import data_parse
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GENAI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash",
            system_instruction="You are a data analyst predicting the cost of damage by fire in a certain area given relevant data in json format. Please analyze this data and provide insights, such as: summary of key statistics, patterns or trends, anomalies or outliers, and interesting insights."
    )
response = model.generate_content("What is the estimated cost of damage by fire? Here is the data in a json format: " + data_parse().to_json(orient='records'))
print(response.text)











