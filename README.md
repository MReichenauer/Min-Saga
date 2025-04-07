# Min-Saga
**Note:** I will continue to develop this project, this includes making sure the client aligns within WCAG 2.1 standards (minimum), configurate the interactions with GPT model and replace Dalle with Stable Diffusion. If you want to contribute in anyway feel free to contact me.

## Project Overview
Full-stack web application where users can create, save, and read story tales.
Story tales are generated based on user’s choices, including:
•	Main character’s name.
•	Type of the main character (e.g. a princess).
•	Environment in which it should play out (e.g. a magical forest).
•	Targeted age of the audience (so the language is appropriate).
All story tales contain five short chapters, including a title, content and an image reflecting the chapter.
When reading a story tale, it is displayed in a 3D animated book that enhances the feeling of reading a “real” book. 

### Front-end
Developed in React 18 with React Hook Form to manage form states, Axios for API requests, Tanstack Query to manage data, EmailJS for integrated email service, and Firebase Authentication for user authentication.

### Back-end
Developed in Node.js integrated with OpenAI’s (GPT & Dalle models) to generate stories and images, Firebase (Storage & Database) to store the images and story objects.

### Tech stack
React, TypeScript, React Hook Form, React Router, Tanstack Query, Firebase (Authentication, Storage, Database), Node.js, Express

## How to run project locally
1. Clone reprository.
2. Create a .env in the server folder _follow the structure of .env.example with your own credentials_.
3. Create a .env in the client folder _follow the structure of .env.example with your own credentials_.
4. Run `npm i` in the root of the server folder to install the necessary dependencies. 
5. Run `npm i` in the root of the client folder to install the necessary dependencies. 
6. Run `npm run devServer` in the root of the server folder to start the server locally.
7. Run `npm run dev` in the root of the client folder to start the client locally.
 
