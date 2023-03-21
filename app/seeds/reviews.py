from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=1,
        course_id=2,
        rating=5,
        review="I was lucky enough to jump on with the fiancé at the Fleming nine hole at TPC Harding Park the day after Christmas. Tough scores in the end for a par 30 ( 6-par3s & 3-par4s) but we enjoyed the beautiful Monterey cypresses, plush green fairways, and the manicured rolling greens."
    )
    review2 = Review(
        user_id=1,
        course_id=3,
        rating=3,
        review="My first time ever playing at Tilden, I wanted to cry. The fairway is really narrow and the people playing there can be mean but that's not the courses fault at all! I had a 8:30am tee time and was playing in wet muddy grass (I slipped twice) plus the fog made it extremely hard to see where I was hitting.",
    )
    review3 = Review(
        user_id=2,
        course_id=1,
        rating=5,
        review="We started our round on the back 9 (not sure why), but finishing via 9 or 18 was fine by us--both are nice holes. Course was in decent shape, but a lot of maintenance crews were out and about. The rough is unpleasant. Challenging, for sure, so read up on your golf tips before you arrive. Greens were very fun, and some real doozies in the mix."
    )
    review4 = Review(
        user_id=3,
        course_id=1,
        rating=4,
        review="The greens and fairways are in great shape only because the entire golf course of cart path only.  The place is super busy but the place is nice for a municipal course in a major city.  Lake on the course which looks great and then Bart and homeless in another view."
    )

    db.session.add_all([review1, review2, review3, review4])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
