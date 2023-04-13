from flask import Blueprint, jsonify, session, request
from app.models import User, db, Course
from app.forms import CourseForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3


course_routes = Blueprint('course', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@course_routes.route('/')
def get_all_courses():
    courses = Course.query.all()
    course_arr = []
    for course in courses:
        courseDictionary = course.to_dict()
        courseDictionary['user'] = course.user.to_dict()
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
    # res = request.get_json()
    form = CourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
   
    if form.validate_on_submit():
        photo = form.data['photo']
        photo.filename = get_unique_filename(photo.filename)
        upload = upload_file_to_s3(photo)
        if "url" not in upload:
            errors['photo'] = 'Error in uploading your photo'
            return jsonify({ 'errors': errors }), 400
            
        course = Course(
            name=form.data["name"],
            description=form.data["description"],
            price=form.data["price"],
            type=form.data["type"],
            latitude=form.data["latitude"],
            longitude=form.data["longitude"],
            address=form.data["address"],
            city=form.data["city"],
            state=form.data["state"],
            country=form.data["country"],
            course_url=form.data["course_url"],
            photo=upload["url"],
            user_id=current_user.id
        )
        db.session.add(course)
        db.session.commit()
        return course.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@course_routes.route('/<int:id>', methods=["DELETE"])
def delete_a_course(id):
    course = Course.query.get(id)

    if course:
        db.session.delete(course)
        db.session.commit()
        return {"Response": f"Successfully deleted course."}


@course_routes.route('/<int:id>', methods=["PUT"])
def edit_a_course(id):
    course = Course.query.get(id)
    res = request.get_json()
    if course:
        course.name=res["name"]
        course.description=res["description"]
        course.price=res["price"]
        course.type=res["type"]
        course.latitude=res["latitude"]
        course.longitude=res["longitude"]
        course.address=res["address"]
        course.city=res["city"]
        course.state=res["state"]
        course.country=res["country"]
        course.course_url=res["course_url"]
        course.photo=res['photo']
        db.session.commit()
        return course.to_dict()
        