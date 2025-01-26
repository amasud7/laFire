from flask import Flask, render_template
import plotly.express as px
import json
import plotly
from data_parse import data_parse

app = Flask(__name__)

data = data_parse() # gets data in dataframe

@app.route('/')
def index():
    # Example data for counties in Los Angeles (replace with actual fire damage estimates)
    counties = list(data['COUNTY'].unique())
    fire_damage_cost = [50000000, 10000000, 7500000, 30000000, 15000000]  # Example fire damage cost estimates
    county_fips = ['06037', '06059', '06111', '06071', '06065']  # FIPS codes for counties

    # Create a Choropleth map (with built-in Plotly projections)
    fig = px.choropleth(
        geojson="https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json",  # GeoJSON for counties
        locations=county_fips,  # County FIPS codes
        color=fire_damage_cost,  # Fire damage estimates (color scale)
        color_continuous_scale="Reds",  # Color scale for fire damages
        featureidkey="id",  # Make sure to use 'id' because the GeoJSON has FIPS as 'id'
        scope='usa'  # Scope set to USA
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

