from flask import jsonify,Flask, render_template, abort, url_for 
import json
import methods
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("//")
def home():
    news_offset=methods.get_news(None)
    # read file
    f = open ('xyz.json', "r") 
    data = json.loads(f.read()) 
    f.close() 
    data.append({"id":news_offset})
    return jsonify(data)

@app.route("/<string:name>/")
def index(name):
    if (name=="None"):
        news_offset=None
    else:
        news_offset=name
    news_offset=methods.get_news(news_offset)
    #read file
    f = open ('xyz.json', "r") 
    data = json.loads(f.read()) 
    f.close() 
    data.append({"id":news_offset})
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug="true")