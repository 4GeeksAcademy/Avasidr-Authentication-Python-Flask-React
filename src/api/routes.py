"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup_user():
    body = request.get_json()

    if body is None:
        raise APIException(
            "You need to specify the request body as a json object", status_code=400)

    if "email" not in body:
        raise APIException('You need to specify the email', status_code=400)

    if "password" not in body:
        raise APIException('You need to specify the password', status_code=400)

    
    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify("user signup ok"), 200

@api.route('/login', methods=['POST'])
def login_user():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify("User or password incorrect."), 400
    token = create_access_token(identity = user.id)

    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user: 
        return jsonify("User not authorized.")
    data = user.serialize()
    
    return jsonify(data), 200