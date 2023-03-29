from .db import db, environment, SCHEMA, add_prefix_for_prod


class CompleteCourse(db.Model):
    __tablename__ = "completed_courses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.String(1000), nullable=False)

    user = db.relationship('User', back_populates='completed')
    course = db.relationship('Course', back_populates='completed')

    def to_dict(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'user_id': self.user_id,
            'score': self.score,
            'feedback': self.feedback
        }