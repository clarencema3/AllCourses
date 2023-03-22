from flask import Blueprint, jsonify, session, request
from app.models import User, db, Course
from app.forms import CourseForm
from flask_login import current_user, login_user, logout_user, login_required

course_routes = Blueprint('course', __name__)


@course_routes.route('/')
def get_all_courses():
    courses = Course.query.all()
    course_arr = []
    for course in courses:
        courseDictionary = course.to_dict()
        courseDictionary['photos'] = [photo.to_dict() for photo in course.photos]
        courseDictionary['reviews'] = [review.to_dict() for review in course.reviews]
        course_arr.append(courseDictionary)
    return course_arr


@course_routes.route('/<int:id>')
def get_single_course(id):
    course = Course.query.get(id)
    courseDictionary = course.to_dict()
    courseDictionary['user'] = course.user.to_dict()
    courseDictionary['reviews'] = [review.to_dict() for review in course.reviews]
    courseDictionary['photos'] = [photo.to_dict() for photo in course.photos]
    return courseDictionary