from .db import db, environment, SCHEMA, add_prefix_for_prod


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("courses.id")), nullable=False)
    url = db.Column(db.String(1000), nullable=False)

    course = db.relationship("Course", back_populates="photos")


    def to_dict(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'url': self.url
        }