from flask import Flask, request
from flask import render_template
from threading import Thread
import TwitterCritic

app = Flask(__name__)

@app.route('/')
def projects():
    
    if "=" in request.url:
        TwitterCritic.main(['none', (request.url).split("=")[1]])

    return render_template("index.html", title = 'Spectral') 


if __name__ == '__main__':
    app.run(host='0.0.0.0')
