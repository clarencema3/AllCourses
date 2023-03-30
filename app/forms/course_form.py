from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, TextAreaField, DecimalField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, URL, ValidationError
from app.models import Course
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def course_exists(form, field):
    name = field.data
    course = Course.query.filter(Course.name == name).first()
    if course:
        raise ValidationError('Course already exists')


# def check_price(form, field):
#     price = field.data


class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired(message='Name is required'), course_exists])
    description = TextAreaField('Description', validators=[DataRequired(message='Description is required'), Length(min=5, max=1000, message="Description must be between 5 and 1000 characters")])
    price = DecimalField('Price', places=2, validators=[DataRequired(message='Price is required'), NumberRange(min=1, message="Price cannot be 0 or negative")])
    type = StringField('Type', validators=[DataRequired(message='Type is required')])
    latitude = FloatField('Latitude')
    longitude = FloatField('Longitude')
    address = StringField('Address', validators=[DataRequired(message='Address is required')])
    city = StringField('City', validators=[DataRequired(message='City is required')])
    state = StringField('State', validators=[DataRequired(message='State is required')])
    country = StringField('Country', validators=[DataRequired(message='Country is required')])
    # photo = URLField('Photo', validators=[DataRequired(), URL()])
    photo = FileField("Photo", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    course_url = URLField('Course Website', validators=[DataRequired(message='Course website is required'), URL()])
    



