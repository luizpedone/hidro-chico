import os

from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__, static_folder='static', static_url_path='')


client = MongoClient(os.environ['DB_PORT_27017_TCP_ADDR'], 27017)
db = client.hidrochico


@app.route('/')
def map():
    return render_template('map.html')


@app.route('/api/stations')
def stations():
    query = {}
    if (request.args.get('stations')):
        query.update({'properties.origin': {'$in': request.args.get('stations').split(',')}})
    if (request.args.get('start_date')):
        query.update({'properties.date': {'$gte': int(request.args.get('start_date'))}})
    if (request.args.get('end_date')):
        query.update({'properties.date': {'$lte': int(request.args.get('end_date'))}})

    statement = db.stations.find(query, {'_id': False})
    stations = [station for station in statement]

    return jsonify(stations)


@app.route('/api/rivers')
def rivers():
    rivers = [river for river in db.rivers.find({}, {'_id': False})]
    return jsonify(rivers)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
