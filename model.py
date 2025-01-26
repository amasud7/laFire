import pandas as pd
from data_parse import data_parse
import google.generativeai as genai

genai.configure(api_key="AIzaSyCEqhPm_XqTkMCtD2SgNEnRTY9xEnaOu6U")
model = genai.GenerativeModel("gemini-1.5-flash",
            system_instruction="You are a data analyst predicting the cost of damage by fire in a certain area given relevant data in json format. Please analyze this data and provide insights, such as: summary of key statistics, patterns or trends, anomalies or outliers, and interesting insights."
    )
response = model.generate_content("What is the estimated cost of damage by fire? Here is the data in a json format: " + data_parse().to_json(orient='records'))
print(response.text)












# import openai

# openai.api_key = "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"

# data = data_parse() # get data
# data_json = data.to_json(orient='records') # convert to json format


# response = openai.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[
#         {"role": "analyst", "content": "You are a data analyst predicting the cost of damage by fire in a certain area given relevant data."},
#         {
#             "role": "user",
#             "content": "Please tell me what data science is?"
#         }
#     ]
# )

# print(response.choices[0].message)