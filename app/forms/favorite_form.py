from flask_wtf import FlaskForm
from wtforms import SubmitField


class FavoriteForm(FlaskForm): 
    submit = SubmitField('Submit')