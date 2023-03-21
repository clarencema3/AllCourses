from app.models import db, CompleteCourse, environment, SCHEMA
from sqlalchemy.sql import text


def seed_completed_course():
    completed1 = CompleteCourse(
        course_id=1,
        user_id=2,
        score=81,
        feedback="Challenging, but very fun to play"
    )
    completed2 = CompleteCourse(
        course_id=3,
        user_id=1,
        score=95,
        feedback="Don't play in the mornings because the fog makes it very difficult"
    )
    completed3 = CompleteCourse(
        course_id=2,
        user_id=1,
        score=45,
        feedback="Very nice scenery, but difficult course"
    )

    db.session.add_all([completed1, completed2, completed3])
    db.session.commit()


def undo_complete_course():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.completed_courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM completed_courses")

    db.session.commit()