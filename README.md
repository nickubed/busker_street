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

#### 1. Clone this repository, but name it anything but auth_boilerplate

```
git clone <repo_link> <new_name>
```

#### 2. Install node modules from the package.json

```
npm install
```

#### 3. Customize with new project name!

Remove defaulty type stuff, things that make this look boring and default. You know the stuff.

* But if you don't, maybe try changing the title? That's in layout.ejs.
* Logo in Navbar
* Description / Repo link within the package.json file.
* Remove boilerplate's readme content. Yes, all of this. Replace it with your new project's readme!

#### 4. Create a brand new shiny db name

```
createdb <new_db_name> (Make it relevant to the context of the project. Cmon.)
```

#### 5. Update config.json

* Change the database name (reference the database you just made.)
* Other settings are likely the same. But check username, password, and dialect.

#### 6. Check the models and migrations for relevance. Trim 'em up.

For example, if your project doesn't require a birthdate field, then maybe remove that.
Delete from model AND migration.