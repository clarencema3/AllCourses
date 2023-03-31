from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_courses():
    course1 = Course(
        name='TPC Harding Park',
        description='Set against the cypress tree-lined Lake Merced, the improved Harding Park Course layout features soft bunkers and graceful undulating fairways. An additional 400 yards was also added to the course to make it a championship-caliber golf facility ready for PGA TOUR action. The course also underwent a greens renovation in December 2013 re-opened in 2014',
        price=121.00,
        type=18,
        latitude=37.7216512,
        longitude=-122.489086,
        address='99 Harding Rd',
        city='San Francisco',
        state='California',
        country='United States of America',
        course_url='https://tpc.com/hardingpark/course-overview/',
        photo='https://i.imgur.com/QxTSCwf.jpg',
        user_id=1
    )
    course2 = Course(
        name='Fleming 9 Course',
        description='The Fleming 9 is a nine-hole golf course in San Francisco named after former city golf caretaker Jack Fleming. This nine-hole golf course was added to the interior of the Harding Park Course in 1961. This challenging, par-30 golf course measures 2,165 yards from the member tees and 1,865 yards from the forward tees.',
        price=36.00,
        type=9,
        latitude=37.7216512,
        longitude=-122.489086,
        address='99 Harding Rd',
        city='San Francisco',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/XHHInbx.png',
        course_url='https://tpc.com/hardingpark/fleming-course/',
        user_id=1
    )
    course3 = Course(
        name='Tilden Park Golf Course',
        description=' This 6,294-yard championship course designed by William Park Bell Jr. features rolling tree-lined fairways, contoured greens and a setting inside a natural park that will make you feel like you are miles from civilization. From our challenging layout to our elegantly-adorned banquet facility and first-rate service, Tilden Park Golf Course—awarded Best Golf Course for Oakland and the East Bay in 2010 by the SF Guardian’s Best of the Bay—is an exceptional setting for a round of unforgettable golf, or an outstanding tournament or special event.',
        price=37.00,
        type=18,
        latitude=37.888111909909,
        longitude=-122.2440828158,
        address='10 Golf Course Drive',
        city='Berkeley',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/GFkbxm7.png',
        course_url='https://www.tildenparkgc.com/',
        user_id=2
    )
    course4 = Course(
        name='Sharp Park Golf Course',
        description='Sharp Park Golf Course is an historic seaside links, designed by the preeminent architect Alister MacKenzie, who also designed Augusta National (home of the Masters Tournament), Cypress Point, and many of the world’s most esteemed courses. Sharp Park is one of MacKenzie’s rare public links.',
        price=51.00,
        type=18,
        latitude=37.6243804,
        longitude=-122.4894192,
        address='1 Sharp Park Rd',
        city='Pacifica',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/QXyahhJ.png',
        course_url='https://sfrecpark.org/Facilities/Facility/Details/Sharp-Park-Golf-Course-42',
        user_id=2
    )
    course5 = Course(
        name='Pebble Beach Golf Links',
        description='Welcome to Pebble Beach Golf Links, unanimously rated the No. 1 Public Course in the Country. Pebble Beach hosted its sixth U.S. Open in 2019, more than any other course over the last 50 years. Eight future championships will be hosted including: a first U.S. Women’s Open in 2023 plus three additional Women’s Opens in 2035, 2040 and 2048, and four future U.S. Opens in 2027, 2032, 2037 and 2044. Every February, the PGA TOUR visits for the AT&T Pebble Beach Pro-Am, a tradition that began in 1947.',
        price=595.00,
        type=18,
        latitude=36.568806,
        longitude=-121.950624,
        address='1700 17 Mile Dr',
        city='Pebble Beach',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/2zsuosZ.png',
        course_url='https://www.pebblebeach.com/golf/pebble-beach-golf-links/',
        user_id=3
    )
    course6 = Course(
        name='Lincoln Park Golf Course',
        description='Lincoln Park, located in the northwestern corner of the San Francisco Peninsula, was dedicated to President Abraham Lincoln in 1909. In 1902, a three-hole course was built by local golf lovers. By 1914, the golf course expanded to 14 holes and then to a full 18 holes in 1917. As a public golf course, Lincoln Park is accessible to all, whether you are a city dweller or a tourist who loves golf.',
        price=52.00,
        type=18,
        latitude=37.782265,
        longitude=-122.494354,
        address='300 34th Ave',
        city='San Francisco',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/nIt22wi.png',
        course_url='http://www.lincolnparkgolfcourse.com/',
        user_id=3
    )
    course7 = Course(
        name='Baylands Golf Links',
        description='Opened in 1956, Palo Alto Municipal GC adjacent the Palo Alto Airport was re-designed by renowned architect Forrest Richardson and reopened as Baylands GL in 2018. With a fresh look, including the removal of 400 non-native trees, the 6,680-yard walkable layout features five par 3s, five par 5s and 55 acres of native Baylands vegetation and wetlands areas through which the San Fransisquito Creek, a historic waterway, runs acting as a major flood conveyance stream',
        price=115.00,
        type=18,
        latitude=37.4536930743,
        longitude=-122.116007682,
        address='1875 Embarcadero Rd',
        city='Palo Alto',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/biEfwls.jpg',
        course_url='https://baylandsgolflinks.com/',
        user_id=1
    )
    course8 = Course(
        name='Pasatiempo Golf Course',
        description='Less than an hour’s drive north from the Monterey Peninsula, Pasatiempo GC (1929) was designed by Alister MacKenzie (Augusta National, Cypress Point). It was considered the renowned Scottish architect’s favorite 18-hole creation and where his American home still borders the sixth fairway. Consistently ranked among America’s top public golf courses, this historic 6,495-yard championship venue is a must-play on the Bay Area’s golf bucket list.',
        price=345.00,
        type=18,
        latitude=37.004394,
        longitude=-122.025796,
        address='20 Clubhouse Rd',
        city='Santa Cruz',
        state='California',
        country='United States of America',
        photo='https://i.imgur.com/jZSN1Nv.jpg',
        course_url='https://www.pasatiempo.com/',
        user_id=1
    )
    course9 = Course(
        name = 'Hiddenbrooke Golf Club',
        description='A former host to the LPGA’s Samsung World Championships of Golf (2000-2002), the acclaimed an Arnold Palmer Signature golf course is nestled in a scenic secluded valley just north of San Francisco. At 6,619 yards with dramatic elevation changes, large challenging greens and water on 14 of the 18 holes, the award-winning (4.5-star rating from Golf Digest) Hiddenbrooke GC provides five sets of tees to accommodate beginning to advanced golfers.',
        price=49.00,
        type=18,
        latitude=38.1556349,
        longitude=-122.179357,
        address='1095 Hiddenbrooke Pkwy',
        city='Vallejo',
        state='California',
        country='United States of America',
        photo= 'https://i.imgur.com/qVR03IO.png',
        course_url='https://www.hiddenbrookegolf.com/',
        user_id=2
    )
    course10 = Course(
        name = 'Pelican Hill Golf Club',
        description = 'Located in Newport Beach, Pelican Hill features two courses with stunning ocean views and challenging layouts. The North Course has hosted multiple professional tournaments.',
        price = 195.00, 
        type= 18,
        latitude = 33.6044, 
        longitude = -117.8378, 
        address = '22701 S Pelican Hill Rd', 
        city = 'Newport Beach',
        state = 'California',
        country = 'USA',
        photo = 'https://i.imgur.com/1kq7tYh.png',
        course_url = 'https://www.golfpelicanhill.com/',
        user_id = 2
    )
    course11 = Course(
        name="Olympic Club Golf Course",
        description="Located in San Francisco, the Olympic Club has hosted multiple U.S. Opens and other major tournaments. The course features challenging hills and tight fairways.",
        price=300.00, 
        latitude=37.7176, 
        longitude=-122.4945, 
        address="599 Skyline Blvd", 
        city="San Francisco", 
        state="California", 
        country="USA", 
        photo='https://i.imgur.com/kjhyZol.jpg',
        course_url="https://www.olyclub.com/golf/",
        user_id = 3
    )
    course12 = Course(
        name="La Quinta Resort & Club",
        description="Located in Palm Springs, La Quinta Resort features five courses designed by famous architects such as Pete Dye and Jack Nicklaus. The Mountain Course has hosted the PGA Tour's CareerBuilder Challenge.", 
        price=155.00, 
        latitude=33.6965, 
        longitude=-116.3109, 
        address="49-499 Eisenhower Dr", 
        city="La Quinta", 
        state="California", 
        country="USA",
        photo='https://i.imgur.com/xQyD2Gi.png', 
        course_url="https://www.laquintaresort.com/golf/",
        user_id = 3
    )

    db.session.add_all([course1, course2, course3, course4, course5, course6, course7, course8, course9, course10, course11, course12])
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