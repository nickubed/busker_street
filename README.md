# Busker Street

Welcome to Busker Street! The app that allows you to track the locations of all your favorite buskers throughout the United States.

## Let's talk features!

* Glorious SQL Database controlling such exotic tables as: User, Busker, Location, and even BuskerLocation!
* Real-life hashing (yep, that's BCrypt!), authentication, and session-use!
* You wanted to know what we used to build this baby? Can you say "Express"? Can you say "JavaScript"? Can you say "Otorhinolaryngologist"? Neither can I!
* Features, features, features!


#### User Stories

As a user, I want to be able to:
- View a map of located buskers in my city
- Add a busker to the map when I find one
- Add characteristics to the found busker, including a description, photo, type of music being played, and a rating.
- Rating logic: display = sum of rating total / rating.length
- View a list of all buskers, and visit a page dedicated to each added busker.
- Leave a review on other people’s added buskers.



### So tell me, how do I get started?

#### 1. ONE STEP AND ONE STEP ONLY! Visit sunny https://busker-street.herokuapp.com/ !

...Oh, you wanted to know how to actually get your teeth into this...? Fine. Fork this repository and...

```
git clone <whateva you want to clone it as>
```
Clone it!

#### 2. Install node modules from the package.json

```
npm install
```


### The Process

> Development on Social Life Simulator started on **January 4th, 2020** while enrolled in General Assembly's SEI program.
Day one development included wireframing and scoping of the project, then establishing authentication and rudimentary routing to get around what would become the app.

> On **January 5th, 2020** SQL Database was created, then polished. Required a bit of back-and-forth to decide exactly the information that would be found and accessed in the final version.

> On **January 6th, 2020** MapBox was implemented, but only so that the user could see the MapBox. More importantly, the join table functionality was corrected so that it would properly populate when a busker was added to the database.

> On **January 7th, 2020** Added geocode functionality, which made it so that when a busker was added, the geocode would kick on and translate the address of the busker's location into coordinates, usable by MapBox! This was a VERY exciting day.

> On **January 8th, 2020** Geocode functionality met up with MapBox to actually display buskers on the US map!!

> On **January 9th, 2020** Delete route was added to remove a busker, as well as a put route to update busker information! Deployment was handled this day, production database settings were implemented, and finally, styling was applied.

### If I had more time I would...

> Add more routes to view buskers in even more obscure and specific ways. Specifically a page to view all buskers of similar musical types, a page to view all buskers that belong to a particular user, etc.

> Polish my CSS more, make mobile-compatibility better.

> Implement click-functions for the map markers, allowing users to see which busker they're looking at in a particular location.

> Do more MapBox research, so that coordinate data could be more reliable.

### Author

**Nick Quandt** - Developer, busker sculptor.

### Acknowledgements
1. SEI28 instructors, I would be lost at sea without their guidance.
2. My partner, again, who allowed me to completely fall into the rabbit hole of express, mapbox, and Sequelize, supporting me as I added busker upon busker to my database!
3. My SEI28 classmates, for their words of encouragement and support throughout the process!




#### Summary

... So you've made it this far and wanted to know why I made this app, huh?

I'll give it to you straight. My neighbors are street musicians, and they're loud. And sometimes a bit annoying. With Busker Street, I can wholly AVOID street musicians, by seeing where they tend to frequent, thus allowing me just a bit more peace and quiet through my day.

