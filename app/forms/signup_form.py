from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email("Provide valid email"), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, message="Password must be at least 6 characters")])
    profile_picture = URLField('profile picture', validators=[URL()])