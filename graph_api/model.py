import pandas as pd
from data_parse import data_parse
import google.generativeai as genai
import os

# drought data
drought = pd.read_csv('countyDroughtdata.csv')
filtered_drought = drought[drought['State'] == 'CA']
filtered_drought.drop(['None', 'StatisticFormatID', 'MapDate', 'ValidStart', 'ValidEnd'], axis=1, inplace=True)

genai.configure(api_key=os.getenv("GENAI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash",
            system_instruction="You are a data analyst predicting the cost of damage by fire as well as other metrics such as drought level and how that determines cause of a fire in a certain area given relevant data in json format. Here is the specification for the drought level data: D0 is abnormally dry and possible impacts include: Going into drought: short-term dryness slows growth of crops/pastures. Coming out of drought: some lingering water deficits; drops/pastures not fully recovered. D1 is Moderate Drought and possible effects include: Some damage to crops/pastures; streams, reservoirs, or wells are low with some water shortages developing or imminent; voluntary water-use restrictions requested. D2 is severe drought and possible effects include: Crop/pasture losses are likely; water shortages are common and water retrictions are imposed. D3 is extreme drought and possible effects include: Major crop/pasture losses; widespread water shortages or restrictions. D4 is exceptional drought and possible effects include: Exceptional and widespread crop/pasture losses; shortages of water in reservoirs, streams, and wells creating water emergencies. Please analyze this data and provide insights, such as: summary of key statistics, patterns or trends, anomalies or outliers, and interesting insights."
    )
response = model.generate_content("What is the number of buildings in the data set and percentage of buildings that has different level of damaage? What is the level of drought, D0, D1, D2, D3, D4? You do not need to find correlation between building damage and drought level. Here is the building damage data in a json format: " + data_parse().to_json(orient='records') + " and here is the drought level data in a json format with the FIPS codes of the counties available in the label \"FIPS\": " + filtered_drought.to_json(orient='records') + "Give me very simple stats. No large explanations.")
print(response.text)











