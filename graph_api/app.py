from flask import Flask, render_template
import plotly.express as px
import json
import plotly
import pandas as pd
from data_parse import data_parse
from plotly.subplots import make_subplots
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# data manipulation
data = data_parse() # gets data in dataframe
keys = list(set(data['COUNTY']))
cost_dict = dict.fromkeys(keys, 0)
for index, row in data.iterrows():
    if pd.notna(row['ASSESSEDIMPROVEDVALUE']):
        cost_dict[row['COUNTY']] += row['ASSESSEDIMPROVEDVALUE']
sorted_cost_dict = dict(sorted(cost_dict.items()))

# for fips data
counties = pd.read_csv('fips.csv')
counties_dict = counties.set_index('COUNTY')['FIPS'].to_dict()
counties_dict = dict(sorted(counties_dict.items()))
counties_dict = {key: f"0{value}" for key, value in counties_dict.items()}

actual_FIPS = []
for county, fips in counties_dict.items():
    if county in keys:
        actual_FIPS.append(fips)


@app.route('/damages_graph')
def index():
    # Example data for counties in Los Angeles (replace with actual fire damage estimates)
    fire_damage_cost = list(sorted_cost_dict.values())  # Example fire damage cost estimates
    county_fips = actual_FIPS  # FIPS codes for counties

    # Create a Choropleth map (with built-in Plotly projections)
    fig = px.choropleth(
        geojson="https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json",  # GeoJSON for counties
        locations=county_fips,  # County FIPS codes
        color=fire_damage_cost,  # Fire damage estimates (color scale)
        locationmode="geojson-id",
        color_continuous_scale="Reds",  # Color scale for fire damages
        featureidkey="id",  # Make sure to use 'id' because the GeoJSON has FIPS as 'id'
    )

    # Customize the layout for zoom and pan
    fig.update_geos(
        visible=True,  # Hide the base map
        fitbounds="locations",  # Fit the map to the specified counties
    )

    fig.update_layout(
    geo_scope='usa',  # Set the map scope to USA
    )

    fig.update_layout(
        title_text='Estimated Fire Damage Cost by County in Los Angeles',
        geo=dict(
            scope='usa',  # Focus on the USA
            showland=True,  # Show land
            landcolor="rgb(217, 217, 217)",  # Light grey land color
        ),
    )

    # Adds custom hover data
    fig.update_traces(
        hovertemplate='<b>%{customdata}</b><br>Damage: %{z}<extra></extra>',
        customdata=[next((k for k, v in counties_dict.items() if v == county), 'Unknown') for county in county_fips],
        selector=dict(type='choropleth'))

    # Convert Plotly graph to JSON for embedding in the template
    graph_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return graph_json
    # return render_template('index.html', graph_json=graph_json)


if __name__ == '__main__':
    app.run(debug=True)