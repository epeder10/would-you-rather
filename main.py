import logging
import os
import json
import jinja2

from google.cloud import datastore
from flask import (Flask, render_template, send_file, jsonify, request)

app = Flask("__main__")
project_id = "portfolio-300417"
client = datastore.Client(project_id)

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

def add_question(question):
    """
    Fetches all questions.
    """
    query = client.query(kind="Questions")
    questions = list(query.fetch())
    questions_json = {"questions": []}

    for question in questions:
        question = json.loads(json.dumps(question))
        questions_json['questions'].append(question)

    return questions_json

def get_questions():
    """
    Fetches all questions.
    """
    query = client.query(kind="Questions")
    questions = list(query.fetch())
    questions_json = {"questions": []}

    for question in questions:
        question = json.loads(json.dumps(question))
        questions_json['questions'].append(question)

    return questions_json

def get_users():
    """
    Fetches all users.
    """
    query = client.query(kind="Users")
    users = list(query.fetch())
    users_json = {"users": []}

    for user in users:
        user = json.loads(json.dumps(user))
        users_json['questions'].append(user)

    return users_json

@app.route("/")
def my_index():   
    index_file = "{0}/index.html".format(os.path.dirname(__file__))
    return send_file(index_file)
    
@app.route('/questions', methods=['GET', 'POST'])
def questions():
    """Returns a list of questions added by the current Firebase user."""
    if request.method == 'GET':
        questions = get_questions()
        return jsonify(questions)
    elif request.method == 'POST':
        question = add_question(request.form)
        return jsonify(question)


@app.route('/users', methods=['GET'])
def users():
    """Returns a list of users added by the current Firebase user."""

    questions = get_questions()

    return jsonify(questions)

@app.route('/answers', methods=['POST'])
def answers():
    """Returns a list of users added by the current Firebase user."""

    questions = get_questions()

    return jsonify(questions)

