from flask import Blueprint, jsonify, session, request
from app.models import Review
from app.forms import ReviewForm

reviews_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@reviews_routes.route('/', methods=['POST'])
def create_new_review():
    res = request.get_json()
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review(
            rating = res["rating"],
            review = res["review"],
            course_id = res["course_id"],
            user_id = res["user_id"],
            timestamp = res["timestamp"]
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401