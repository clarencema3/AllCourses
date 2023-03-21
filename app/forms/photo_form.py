from flask_wtf import FlaskForm
from wtforms import URLField
from wtforms.validators import DataRequired, URL


class PhotoForm(FlaskForm):
    url = URLField('Photo URL', validators=[DataRequired(), URL()])