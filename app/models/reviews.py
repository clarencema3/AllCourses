from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("courses.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow(),nullable=False)

    user = db.relationship("User", back_populates="reviews")
    course = db.relationship("Course", back_populates="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'rating': self.rating,
            'review': self.review,
            'timestamp': self.timestamp,
            'reviewer_first_name': self.user.first_name,
            'reviewer_last_name': self.user.last_name
        }
    
