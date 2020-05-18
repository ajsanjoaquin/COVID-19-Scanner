import flask
import json
from flask import request
from flask import jsonify

import os

from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

UPLOAD_FOLDER = './uploaded_images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == "POST":
        data = dict(request.files)
        images = []
        for key in data.keys():
            images.append(data[key])
        for file in images:
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        
        result = []
        for file in images:
            result.append({"image": file.filename, "result": "90%"})
        
        return jsonify(predictions=result)

app.run()