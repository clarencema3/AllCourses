from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, NumberRange, URL, ValidationError
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class PhotoForm(FlaskForm):
    photo = FileField("Photo", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS), message='Files must be .png, .jpg, or .jpeg')])