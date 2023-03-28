from flask import Blueprint, jsonify, request
from app.models import Favorite, db
from app.forms import FavoriteForm


favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/')
def get_favorites():
    favorites = Favorite.query.all()
    favorite_arr = []
    for favorite in favorites:
        favoriteDictionary = favorite.to_dict()
        favoriteDictionary['course'] = favorite.course.to_dict()
        favoriteDictionary['user'] = favorite.user.to_dict()
        favorite_arr.append(favoriteDictionary)
    return favorite_arr


@favorite_routes.route('/', methods=['POST'])
def add_to_favorites():
    res = request.get_json()
    form = FavoriteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        favorite = Favorite(
            course_id = res["course_id"],
            user_id = res["user_id"]
        )
        db.session.add(favorite)
        db.session.commit()
        return favorite.to_dict()

