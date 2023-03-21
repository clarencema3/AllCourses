from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text


def seed_photos():
    course1_photos=['https://i.imgur.com/QxTSCwf.jpg',
                    'https://i.imgur.com/jw3qQSp.jpg',
                    'https://i.imgur.com/UJxFAie.jpg']

    course2_photos=['https://i.imgur.com/XHHInbx.png',
                    'https://i.imgur.com/DIq2v9b.png',
                    'https://i.imgur.com/XvmPK5L.png']

    course3_photos=['https://i.imgur.com/GFkbxm7.png',
                    'https://i.imgur.com/Eoo5sZF.jpg',
                    'https://i.imgur.com/8naFJcZ.png']

    course4_photos=['https://i.imgur.com/QXyahhJ.png',
                    'https://i.imgur.com/trUyqoM.png',
                    'https://i.imgur.com/emqUb81.png']

    course5_photos=['https://i.imgur.com/2zsuosZ.png',
                    'https://i.imgur.com/TurhXd2.png',
                    'https://i.imgur.com/pL8kxCc.png']

    course6_photos=['https://i.imgur.com/nIt22wi.png',
                    'https://i.imgur.com/iAMtI03.png',
                    'https://i.imgur.com/98cb5ou.jpg']

    photoList = []
    for link in course1_photos:
        photo = Photo(
            course_id=1,
            url=link
        )
        photoList.append(photo)
    for link in course2_photos:
        photo = Photo(
            course_id=2,
            url=link
        )
        photoList.append(photo)
    for link in course3_photos:
        photo = Photo(
            course_id=3,
            url=link
        )
        photoList.append(photo)
    for link in course4_photos:
        photo = Photo(
            course_id=4,
            url=link
        )
        photoList.append(photo)
    for link in course5_photos:
        photo = Photo(
            course_id=5,
            url=link
        )
        photoList.append(photo)
    for link in course6_photos:
        photo = Photo(
            course_id=6,
            url=link
        )
        photoList.append(photo)
    
    db.session.add_all(photoList)
    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()