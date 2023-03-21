from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    course = db.relationship("Course", back_populates="favorites")
    user = db.relation("User", back_populates="favorites")


    def to_dict(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'user_id': self.user_id
        }