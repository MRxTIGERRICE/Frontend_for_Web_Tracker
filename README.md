# ActivityTracker for eLitmus
Demo:[Click here for Demo Video](https://www.youtube.com/watch?v=qX8c6iyBikU)
This project is a web-extension which is used to monitor the user surfing data like
  * the amount of time spent on the browser
  * website specific metrics

## Frontend
The Frontend is done using vite and Reactjs which are well known and established javascript frameworks for any app/webb development projects, we have also included 
  * Chart.js
  * i18n.js
  * poly-webfill
and many more
### Setup Instructions

1. Clone the repository

2. Install dependencies:
  * Install nodejs if u havent installed it using 'https://nodejs.org/en/learn/getting-started/how-to-install-nodejs'
  *after installing nodejs, u need to install vite.
  * ```bas
    hnpm install vite
    ```
3. Start the development server:
  To run the extension, there are two ways.
  1. You can run it as an unpacked directory
     *open chrome and go to "chrome://extensions/"
     *toggle developer mode on the top-right
     *choose Loadunpacked on the left panel
     *browse to the project and select the dist directory
     and voila, u have a working extension! 
  2. You can run it as a vite app
     * ```bash
        npm run start
        ```
4. Accessing the application
   It will take u through the setup process and once you've installed it..it will be there in your extensions and one of your extension

## Backend-Ruby on Rails
The backend server for this application is hosted on Render. It provides the necessary APIs for the frontend to interact with the database and perform various operations.
you can find its repo here
### Accessing the Backend
To access the backend you can you can using my credentials as render supports team functionality, but its supposedly subscription based on money.
so, u can access it using my render credentials
## Additional Notes
I haveily took an exisiting application's front end which helped me focus on the backend more because i didnt know ruby at all..so learning ruby was a fun experience for me in this overall assignment.

