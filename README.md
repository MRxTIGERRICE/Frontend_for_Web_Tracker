# ActivityTracker for eLitmus

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
     * run
       ```bash
         npm run start
       ```

4. Access the application at `http://localhost:3000`.

## Backend

The backend server for this application is hosted on Render. It provides the necessary APIs for the frontend to interact with the database and perform various operations.

### Accessing the Backend

The backend server is hosted on Render. You can access it at [backend-url]. Please note that you may need to authenticate or obtain access credentials to interact with the server.

## Additional Notes

- This repository only contains the frontend code for the application. The backend server code is hosted separately on Render.
- For any issues or feature requests related to the frontend, please [submit an issue](link-to-issue-tracker).
- For issues related to the backend server or for server-side support, please contact the administrator of the Render service.
