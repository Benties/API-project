# !BnB
![splash](https://i.imgur.com/4r8TJra.png)
## Airbnb Clone
!BnB is full stack application inspired by Airbnb. This application mimics all the features you can find on Airbnb. Visit this [link](https://ben-bnb-api.herokuapp.com/) to explore !BnB and book a spot for a vacation you'll never go to.
## Instructions to start my app
- Clone this repository
- Run npm install in the backend then in the frontend directory
- In the backend, rename the .envexample file to .env
- Make sure to have a browser open
- Run npm start in the backend and the frontend directory
- You must have both backend and front end servers running at the same time
- A tab in your browser will open with localhost:3000
- You can now fully access my application and all of its features
## Contact me
<div>
  <a href="https://www.linkedin.com/in/bennjamin-thai-6a1285127/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
</div>

## [ApiDocs](https://github.com/Benties/API-project/tree/main/backend#readme)
Here you can see the database schema and documentation of API routes that interact with the backend.
## [Feature List](https://github.com/Benties/API-project/wiki/Feature-List)
A list of features implemented in this app
## [Redux Store Shape](https://github.com/Benties/API-project/wiki/Redux-Store-Shape)
A map of the Redux Store for the features implemented
## Built With
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
## Checkout these features
- On the splash page there is a profile drop down with a log in button that'll render a log in modal on click
- Click the 'Demo Log In' button that'll log you in as a demo user
![Login](https://i.imgur.com/IUN1rCi.png)
- Each spot card is an indivisual link to that spots details page. Click on any spot to check it out.
- On the spot details page if you are logged in you'll see a 'Leave Review' button that leave a review and rating on the current spot.
![Review](https://i.imgur.com/p3il9zd.png)
- A delete button for that review will render if that review belongs to the current User
![DeleteReview](https://i.imgur.com/rAba6Ew.png)
- Click the Switch to hosting button to redirect to the Create a Spot Form. Use this form to create a new spot in the database.
- Here you'll also see a testing button that'll auto create a new spot for you with a default image.
- Once you click post with valid data you'll be redirected to the home page where you can see your newly created spot.
- Errors will render if entries are not valid explaining what data entries are valid
![CreateSpot](https://i.imgur.com/kjFG6zC.png)
- In the profile drop down youll now see a your name, username, and two buttons if you're logged in.
- The logout button will log you out
- The 'Manage Listings' button will take you to the currents users listing management page.
- Here youll see a 'Edit Spot' button and 'Remove Spot' button
![ManageListings](https://i.imgur.com/hZvrwLp.png)
- If you clicked on the 'Edit Spot' button you'll be redirected to the edit spot form where you can edit that spot.
- A successful edit will redirect you to the spot's details page
![EditSpot](https://i.imgur.com/ir4hxdg.png)
## RoadMap
- Next on the agenda is bookings for spots!
