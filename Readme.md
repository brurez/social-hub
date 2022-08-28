# F1 Social Hub app

## How to run the application
- Create a venv environment. Windows example: “python3 -m venv venv”
- Activate the venv environment.
- Install required libraries: “pip install -r requirements.txt”
- Start a Redis instance using Redis default port: “docker run -p 6379:6379 -d redis:5”
- Start the Django application by typing: “python manage.py runserver”
- Visit “http://127.0.0.1:8000/”

it’s not necessary to run the Vite framework to bundle the Javascript files or run a NodeJS server to use the application. This Javascript files were already bundled by executing “npm run bundle” inside the “client” folder. The bundled files are present on the ‘static/dist” folder.

If you want to package the Javascript files do the following:
- Inside the “client” folder run: “npm i –force”
- Execute “npm run build”

If you want to run the Vite’s  development tool:	
- Comment line 8 on “client/vite.config.js”
- Run “npm run vite”
- Visit “http://127.0.0.1:5173/”

## How to run unit tests

Execute: “python manage.py test”


## Superuser credentials
user: admin
email: admin@email.com
password: 1234