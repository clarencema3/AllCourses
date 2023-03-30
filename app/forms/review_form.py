from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(message='Rating is required'), NumberRange(min=1, max=5)])
    review = TextAreaField('Review', validators=[DataRequired(message='Review is required'), Length(min=5,max=1000, message='Review must be between 5 and 1000 characters')])