from flask import Flask, render_template
import plotly.express as px
import json
import plotly
import pandas as pd
from data_parse import data_parse

app = Flask(__name__)


# data manipulation
data = data_parse() # gets data in dataframe
keys = list(set(data['COUNTY']))
cost_dict = dict.fromkeys(keys, 0)
for index, row in data.iterrows():
    if pd.notna(row['ASSESSEDIMPROVEDVALUE']):
        cost_dict[row['COUNTY']] += row['ASSESSEDIMPROVEDVALUE']
sorted_cost_dict = dict(sorted(cost_dict.items()))

# for fips data
counties = pd.read_csv('fids.csv')
counties_dict = counties.set_index('COUNTY')['FIPS'].to_dict()
counties_dict = dict(sorted(counties_dict.items()))
counties_dict = {key: f"0{value}" for key, value in counties_dict.items()}
actual_FIPS = []
for county, fips in counties_dict.items():
    if county in keys:
        actual_FIPS.append(fips)


@app.route('/')
def index():
    # Example data for counties in Los Angeles (replace with actual fire damage estimates)
    counties = sorted(list(data['COUNTY'].unique()))
    fire_damage_cost = list(sorted_cost_dict.values())  # Example fire damage cost estimates
    county_fips = actual_FIPS  # FIPS codes for counties

    # Create a Choropleth map (with built-in Plotly projections)
    fig = px.choropleth(
        data_frame=pd.DataFrame(data['COUNTY'].unique()),
        geojson="https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json",  # GeoJSON for counties
        locations=county_fips,  # County FIPS codes
        color=fire_damage_cost,  # Fire damage estimates (color scale)
        color_continuous_scale="Reds",  # Color scale for fire damages
        featureidkey="id",  # Make sure to use 'id' because the GeoJSON has FIPS as 'id'
        scope='usa',  # Scope set to USA
        hover_data=pd.DataFrame(data['COUNTY'].unique()), # Show county names on hover
    )

    # Customize the layout for zoom and pan
    fig.update_geos(
        visible=False,  # Hide the base map
        fitbounds="locations",  # Fit the map to the specified counties
    )

    fig.update_layout(
        title_text='Estimated Fire Damage Cost by County in Los Angeles',
        geo=dict(
            scope='usa',  # Focus on the USA
            showland=True,  # Show land
            landcolor="rgb(217, 217, 217)",  # Light grey land color
        ),
    )

    # Convert Plotly graph to JSON for embedding in the template
    graph_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return render_template('index.html', graph_json=graph_json)

if __name__ == '__main__':
    app.run(debug=True)