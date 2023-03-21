from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_courses():
    course1 = Course(
        name='TPC Harding Park',
        description='Set against the cypress tree-lined Lake Merced, the improved Harding Park Course layout features soft bunkers and graceful undulating fairways. An additional 400 yards was also added to the course to make it a championship-caliber golf facility ready for PGA TOUR action. The course also underwent a greens renovation in December 2013 re-opened in 2014',
        price=121.00,
        type=18,
        latitude=37.7248,
        longitude=122.4932,
        address='99 Harding Rd',
        city='San Francisco',
        state='California',
        country='United States of America',
        course_url='https://tpc.com/hardingpark/course-overview/',
        user_id=1
    )
    course2 = Course(
        name='Fleming 9 Course',
        description='The Fleming 9 is a nine-hole golf course in San Francisco named after former city golf caretaker Jack Fleming. This nine-hole golf course was added to the interior of the Harding Park Course in 1961. This challenging, par-30 golf course measures 2,165 yards from the member tees and 1,865 yards from the forward tees.',
        price=36.00,
        type=9,
        latitude=37.7248,
        longitude=122.4932,
        address='99 Harding Rd',
        city='San Francisco',
        state='California',
        country='United States of America',
        course_url='https://tpc.com/hardingpark/fleming-course/',
        user_id=1
    )
    course3 = Course(
        name='Tilden Park Golf Course',
        description=' This 6,294-yard championship course designed by William Park Bell Jr. features rolling tree-lined fairways, contoured greens and a setting inside a natural park that will make you feel like you are miles from civilization. From our challenging layout to our elegantly-adorned banquet facility and first-rate service, Tilden Park Golf Course—awarded Best Golf Course for Oakland and the East Bay in 2010 by the SF Guardian’s Best of the Bay—is an exceptional setting for a round of unforgettable golf, or an outstanding tournament or special event.',
        price=37.00,
        type=18,
        latitude=37.8878,
        longitude=122.2433,
        address='10 Golf Course Drive',
        city='Berkeley',
        state='California',
        country='United States of America',
        course_url='https://www.tildenparkgc.com/',
        user_id=2
    )
    course4 = Course(
        name='Sharp Park Golf Course',
        description='Sharp Park Golf Course is an historic seaside links, designed by the preeminent architect Alister MacKenzie, who also designed Augusta National (home of the Masters Tournament), Cypress Point, and many of the world’s most esteemed courses. Sharp Park is one of MacKenzie’s rare public links.',
        price=51.00,
        type=18,
        latitude=37.623897414208,
        longitude=-122.4910844096,
        address='1 Sharp Park Rd',
        city='Pacifica',
        state='California',
        country='United States of America',
        course_url='https://sfrecpark.org/Facilities/Facility/Details/Sharp-Park-Golf-Course-42',
        user_id=2
    )
    course5 = Course(
        name='Pebble Beach Golf Links',
        description='Welcome to Pebble Beach Golf Links, unanimously rated the No. 1 Public Course in the Country. Pebble Beach hosted its sixth U.S. Open in 2019, more than any other course over the last 50 years. Eight future championships will be hosted including: a first U.S. Women’s Open in 2023 plus three additional Women’s Opens in 2035, 2040 and 2048, and four future U.S. Opens in 2027, 2032, 2037 and 2044. Every February, the PGA TOUR visits for the AT&T Pebble Beach Pro-Am, a tradition that began in 1947.',
        price=595.00,
        type=18,
        latitude=36.5697,
        longitude=121.9498,
        address='1700 17 Mile Dr',
        city='Pebble Beach',
        state='California',
        country='United States of America',
        course_url='https://www.pebblebeach.com/golf/pebble-beach-golf-links/',
        user_id=3
    )
    course6 = Course(
        name='Lincoln Park Golf Course',
        description='Lincoln Park, located in the northwestern corner of the San Francisco Peninsula, was dedicated to President Abraham Lincoln in 1909. In 1902, a three-hole course was built by local golf lovers. By 1914, the golf course expanded to 14 holes and then to a full 18 holes in 1917. As a public golf course, Lincoln Park is accessible to all, whether you are a city dweller or a tourist who loves golf.',
        price=52.00,
        type=18,
        latitude=37.7823,
        longitude=122.4944,
        address='300 34th Ave',
        city='San Francisco',
        state='California',
        country='United States of America',
        course_url='http://www.lincolnparkgolfcourse.com/',
        user_id=3
    )
    

    db.session.add_all([course1, course2, course3, course4, course5, course6])
    db.session.commit()
    


# Uses a raw SQL query to TRUNCATE or DELETE the courses table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))
        
    db.session.commit()