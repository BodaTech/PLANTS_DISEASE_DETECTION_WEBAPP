
# About The Project

Welcome to the Online Quiz Maker project! This application allows users to create, and take quizzes online. this platform provides a user-friendly interface for quiz creation and administration.

# Technologies Used

- Backend: Django, Django REST Framework
- Frontend: React
- Database: Mysql
- Authentication: JSON Web Tokens (JWT: access / refresh token)

# Setup

## Backend (Django)

1. Clone the repository to your local machine:

    <code>git clone https://github.com/BodaTech/REACT_DJANGO_ONLINE_QUIZ_MAKER_PROJECT.git</code>

2. Navigate to the backend directory:

    <code>cd Backend</code>

3. Virtual environment
    - create a virtual environment <code>py -m venv venv</code>
    - activate it <code>venv/Scripts/activate</code> ( <code>source venv/bin/activate</code> in macOS/Linux)

4. Install dependencies:

    <code>pip install -r requirements.txt</code>

5. Apply migrations:
    
    config your database in <code>core/settings.py</code>

    <code>py manage.py migrate</code>

6. Run the Django development server:

    <code>py manage.py migrate</code>

## Frontend (React)
1. Navigate to the frontend directory:

    <code>cd frontend</code>

2. Install dependencies:

    <code>npm install</code>

3. Start the development server:

    <code>npm start</code>


