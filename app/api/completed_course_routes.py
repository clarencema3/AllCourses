from flask import Blueprint, jsonify, session, request
from app.models import CompleteCourse, db
from app.forms import CompletedCourseForm
from flask_login import current_user

completed_course_routes = Blueprint('completed_course', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@completed_course_routes.route('/')
def get_completed_courses():
    completed = CompleteCourse.query.filter(CompleteCourse.user_id == current_user.id)
    completed_arr = []
    for course in completed:
        courseDict = course.to_dict()
        courseDict['course'] = course.course.to_dict()
        completed_arr.append(courseDict)
    return completed_arr


@completed_course_routes.route('/new', methods=['POST'])
def add_to_completed():
    res = request.get_json()
    form = CompletedCourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        completed = CompleteCourse(
            course_id = res["course_id"],
            user_id = res["user_id"],
            score = res["score"],
            feedback = res["feedback"]
        )
        db.session.add(completed)
        db.session.commit()
        return completed.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@completed_course_routes.route('/<int:id>', methods=['DELETE'])
def delete_completed(id):
    course = CompleteCourse.query.get(id)

    if course:
        db.session.delete(course)
        db.session.commit()
        return {"Response": f"Successfully deleted course."}
    