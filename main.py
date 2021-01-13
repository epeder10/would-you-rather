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
    Creates a new question.
    """
    kind = "wyr_questions"
    name = question['id']
    question_key = client.key(kind, name)
    question_entity = datastore.Entity(key=question_key)
    question_entity.update(question)

    client.put(question_entity)

def get_questions():
    """
    Fetches all questions.
    """
    query = client.query(kind="wyr_questions")
    questions = list(query.fetch())
    questions = json.loads(json.dumps(questions, default=str, sort_keys=True))
    questions_json = {}

    for question in questions:
        questions_json[question['id']] = question

    return questions_json

def update_answer(payload):
    """
    Add the answer to the user answer section and the questions
    """
    user_query = client.query(kind="wyr_users")
    user_query = user_query.add_filter('id', '=', payload['authedUser'])
    user = user_query.fetch()
    user = json.loads(json.dumps(user, default=str, sort_keys=True))
    user.answers[payload['qid']] = payload['answer']
    client.put(user)

    question_query = client.query(kind="wyr_questions")
    question_query = question_query.add_filter('id', '=', payload['qid'])
    question = question_query.fetch()
    question = json.loads(json.dumps(question, default=str, sort_keys=True))
    question[payload['answer']]['votes'].append(payload['authedUser'])
    client.put(question)

def get_users():
    """
    Fetches all users.
    """
    query = client.query(kind="wyr_users")
    users = list(query.fetch())
    users = json.loads(json.dumps(users, default=str, sort_keys=True))
    users_json = {}

    for user in users:
        users_json[user['id']] = user

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
        question = request.get_json()
        add_question(request.get_json())
        return jsonify(question)


@app.route('/users', methods=['GET'])
def users():
    """Returns a list of users added by the current Firebase user."""

    users = get_users()

    return jsonify(users)

@app.route('/answer', methods=['POST'])
def answer():
    """Returns a list of users added by the current Firebase user."""

    update_answer(request.get_json())

