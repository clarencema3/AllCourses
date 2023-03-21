from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, DecimalField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, URL


class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=1000, message="Description cannot exceed 1000 characters")])
    price = DecimalField('Price', places=2, validators=[DataRequired(), NumberRange(min=0, message="Price cannot be 0 or negative")])
    type = StringField('Type', validators=[DataRequired()])
    latitude = FloatField('Latitude')
    longitude = FloatField('Longitude')
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    course_url = URLField('Course Website', validators=[DataRequired(), URL()])


