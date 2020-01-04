# Express Auth

This is some boilerplate code for projects. Super simple node / express app with local user authentication.
This exists so that I don't have to start froms scratch each time I build a project that requires authentication.

## *slaps hood of app* you know how many features you can fit in one of these babies?

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport - local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS layouts
* Features, features, features!

### User Model
| Column Name | Data Type | Notes |
| ----------------- | ---------------- | ------------------------|
| id | Integer | Serial Primary Key |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |
| firstName | String | NO NULL |
| lastname | String | - |
| username | String | - |
| email | String | Must be unique / used for login |
| password | String | Stored as Hash |
| photoUrl | String | Profile Picture |
| admin | boolean | Default to False |
| bio | Text | - |
| birthday | Date | - |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ------------------- | ------------------ | ---------------------- |
| GET | / | index.js | Homepage |
| GET | * | index.js | Render 404 Page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates user |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | profile.js | Regular User Profile |
| GET | /profile/admin | profile.js | Admin user profile |

### Steps To Use