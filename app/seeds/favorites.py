from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():
    favorite1 = Favorite(
        course_id=2,
        user_id=1
    )
    favorite2 = Favorite(
        course_id=1,
        user_id=2
    )
    favorite3 = Favorite(
        course_id=3,
        user_id=1
    )

    db.session.add_all([favorite1, favorite2, favorite3])
    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()