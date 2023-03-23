from flask import Blueprint, jsonify, session, request
from app.models import User, db, Course
from app.forms import CourseForm
from flask_login import current_user, login_user, logout_user, login_required

course_routes = Blueprint('course', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@course_routes.route('/')
def get_all_courses():
    courses = Course.query.all()
    course_arr = []
    for course in courses:
        courseDictionary = course.to_dict()
        courseDictionary['reviews'] = [review.to_dict() for review in course.reviews]
        course_arr.append(courseDictionary)
    return course_arr


@course_routes.route('/<int:id>')
def get_single_course(id):
    course = Course.query.get(id)
    courseDictionary = course.to_dict()
    courseDictionary['user'] = course.user.to_dict()
    courseDictionary['reviews'] = [review.to_dict() for review in course.reviews]
    return courseDictionary


@course_routes.route('/', methods=["POST"])
def add_new_course():
    res = request.get_json()
    print('res in backend \n\n\n\n\n', res)
    form = CourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        course = Course(
            name=res["name"],
            description=res["description"],
            price=res["price"],
            type=res["type"],
            latitude=res["latitude"],
            longitude=res["longitude"],
            address=res["address"],
            city=res["city"],
            state=res["state"],
            country=res["country"],
            course_url=res["course_url"],
            photo=res['photo'],
            user_id=res["user_id"]
        )
        db.session.add(course)
        db.session.commit()
        print('course dict \n\n\n\n\n', course.to_dict())
        return course.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401