# MusicBox

MusicBox is a web application for managing and listening to music playlists. Users can create playlists, add songs, and explore compositions by different artists.

## Features
- User authentication with JWT tokens for secure login
- One-time code sent to email for account login
- Role-based access control
- Create, edit, and delete compositions and playlists
- Add songs to playlists
- Search for compositions and playlists
- View author details and compositions
- Receive notifications

## Installation

To set up the project locally, follow these steps:

### Backend (Django)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/musicbox.git
   cd musicbox
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate # On MacOS  
   venv\Scripts\activate # On Windows 
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```sh
   python manage.py migrate
   ```
5. Run the development server:
   ```sh
   python manage.py runserver
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```

## Required Packages

### Backend:
- Django
- Django REST Framework
- PostgreSQL
- django-cors-headers

### Frontend:
- React
- React Router
- Axios
- Material Tailwind

## Usage
Once the backend and frontend are running, open your browser and go to:
```
http://localhost:3000
```
From there, you can log in, create playlists, search for songs, and manage your music collection.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

