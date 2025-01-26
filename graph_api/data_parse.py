import requests
import pprint
import pandas as pd



def data_parse():
# this is query url for API
    url = "https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0/query?where=1%3D1&outFields=Latitude,Longitude,DAMAGE,COUNTY,STRUCTURETYPE,STRUCTURECATEGORY,SITEADDRESS,ASSESSEDIMPROVEDVALUE&outSR=4326&f=json"
    payload = { # parameters for POST request
        'where': '1=1',
        'outFields': 'Latitude,Longitude,DAMAGE,COUNTY,STRUCTURETYPE,STRUCTURECATEGORY,SITEADDRESS,ASSESSEDIMPROVEDVALUE',
        'outSR': '4326',
        'f': 'json'
    }

    response = requests.post(url, data=payload) # sending post request
    if response.status_code == 200:
        data = response.json()
    else:
        print("Error:", response.status_code)

    # features is a list of dictionaries of each entry
    # attributes is a list of dictionaries of each consisting of each data point (within feature dict)
    # geometry is a list of dictionaries of coordinates (within feature dict)

    features = data['features']
    attributes_list = [feature['attributes'] for feature in features]

    df = pd.DataFrame(attributes_list)

    return df
    # pd.set_option('display.max_columns', None) # to view non truncated columns
    # print(df.head())
    # pprint.pprint(attributes_list)


data = data_parse()
keys = list(set(data['COUNTY']))
values = []

cost_dict = dict.fromkeys(keys, 0)

for index, row in data.iterrows():
    if pd.notna(row['ASSESSEDIMPROVEDVALUE']):
        cost_dict[row['COUNTY']] += row['ASSESSEDIMPROVEDVALUE']


counties = pd.read_csv('fips.csv')
counties_dict = counties.set_index('COUNTY')['FIPS'].to_dict()
counties_dict = dict(sorted(counties_dict.items()))
counties_dict = {key: f"0{value}" for key, value in counties_dict.items()}
actual_FIPS = []
for county, fips in counties_dict.items():
    if county in keys:
        actual_FIPS.append(fips)

print(cost_dict)
print(actual_FIPS)
print(sorted(keys))

