from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class CompletedCourseForm(FlaskForm):
    score = IntegerField('Score', validators=[DataRequired(), NumberRange(min=1, max=150,message='Score must be between 1 and 150')])
    feedback = TextAreaField('Feedback', validators=[DataRequired(), Length(min=5,max=1000, message='Feedback must be between 5 and 1000 characters')])