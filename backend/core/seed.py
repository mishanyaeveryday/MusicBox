from django_seed import Seed
from core.models import Playlist, Composition, User
import random
from datetime import timedelta


def seed_data():
    seeder = Seed.seeder()

    users = User.objects.all()

    if not users:
        print("There are no users, we are creating test ones.")
        for _ in range(5):
            User.objects.create_user(
                email=f"user{_}@example.com",
                password="password",
                username=f"user{_}",
                name=f"User{_}",
                surname=f"Surname{_}"
            )
        users = User.objects.all()

    seeder.add_entity(Composition, 50, {
        'name': lambda x: seeder.faker.sentence(nb_words=3),
        'user_id': lambda x: random.choice(users),
        'time': lambda x: timedelta(minutes=random.randint(2, 5)),
        'text': lambda x: seeder.faker.text(),
        'category': lambda x: seeder.faker.word(),
        'style': lambda x: seeder.faker.word(),
        'audio_file': lambda x: 'audio/default_audio.mp3',
    })

    seeder.add_entity(Playlist, 10, {
        'name': lambda x: seeder.faker.word(),
        'description': lambda x: seeder.faker.text(),
    })

    inserted_pks = seeder.execute()
    composition_ids = list(inserted_pks[Composition])
    playlist_ids = list(inserted_pks[Playlist])

    for playlist_id in playlist_ids:
        playlist = Playlist.objects.get(pk=playlist_id)
        random_compositions = random.sample(
            composition_ids, random.randint(5, 15))
        playlist.compositions.add(*random_compositions)

    print("The database has been successfully filled!")
