from plotly.subplots import make_subplots
import plotly.graph_objects as go
import plotly.express as px

df = px.data.iris()
fig1 = px.scatter(df, x="sepal_width", y="sepal_length", color='species')
fig2 = px.scatter(df, x="sepal_width", y="petal_width")

fig = make_subplots(
    rows=1, cols=2,
    shared_xaxes=True,
    vertical_spacing=0.02
    )

# add each trace (or traces) to its specific subplot
for i in fig1.data :
    fig.add_trace(i, row=1, col=1)

for i in fig2.data :    
    fig.add_trace(i, row=1, col=2)

fig.show()