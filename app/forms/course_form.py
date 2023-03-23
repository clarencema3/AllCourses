from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, DecimalField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, URL, ValidationError
from app.models import Course


def course_exists(form, field):
    name = field.data
    course = Course.query.filter(Course.name == name).first()
    if course:
        raise ValidationError('Course already exists')


# def check_price(form, field):
#     price = field.data


class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired(), course_exists])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=5, max=1000, message="Description must be between 5 and 1000 characters")])
    price = DecimalField('Price', places=2, validators=[DataRequired(), NumberRange(min=1, message="Price cannot be 0 or negative")])
    type = StringField('Type', validators=[DataRequired()])
    latitude = FloatField('Latitude')
    longitude = FloatField('Longitude')
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    photo = URLField('Photo', validators=[DataRequired(), URL()])
    course_url = URLField('Course Website', validators=[DataRequired(), URL()])


