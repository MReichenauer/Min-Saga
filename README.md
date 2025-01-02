# Min-Saga
`Still under development`
This is an application where a user can create a ai generated children story that is tailored by the users input. Each story created will have 5 chapters and each chapter will have a describing title, the chapter text itself and an image based on the chapter. When a user reads a story they have created, it is displayed in a digital book where they can "swipe" to change page. This is to enchanse the feeling of reading a physical book. All of the storys a user has created is saved for the user to read at a later point in time. This application requires an account to use and there are 2 choises, eather a user can log in via their google account or they can create a new account on the applicaton (in this scenario they will need to validate their account via a link sent to their email of choise).

The input a user has to enter to create a story is the following: 
 * Name of main character E.g Sonja 
 * Type of main character: E.g A Princess 
 * The enviorment of the story: E.g a magical forest 
 * The age of the child the story is created for: E.g 3

## To do
* Finalize the text generated for a story
* Change ai model to generate images for a story
* Enter a limit of how many stories a user can create for free
* Add payment method for upgrading account to increase limit of how many stories a user can create
* Add functionality for a user to delete a story
* Add functionality for a user to share their story with everyone
* Add functionality for a user to mark a story as favorite
* Add filter functionality to filter stories when browsing
* Add search functionality to be able to search for specific stories


### How to run this repo
* Clone repo
* Create a .env inside `client` folder accordingly to the example.env inside the `client` folder
* Create a .env inside `server` folder accordingly to the example.env inside the `server` folder
* Enter the `server` folder via the terminal and run `npm run devServer`
* Enter the `client` folder via the terminal and run `npm run dev`
