# Near Earth Objects Monitoring Visualisation

This is a sample project of Data Visualisation made for a Code Challenge interview.
The data is retrieved from NASA NeoWs (Near Earth Object Web Service) service at [https://api.nasa.gov/](https://api.nasa.gov/).

## Prerequisites

- MySQL / MariaDB
- NodeJS v.16 or higher

## Installation and configuration

1. Clone this project with ```git clone https://github.com/azanibellato/neows-vis.git```.
2. Insert the db configuration in `neows-vis-backend/config/db.config.js`.
3. Create the table by running `neows-setup.sql` in your database.
4. Set your API key for NASA  in `neows-vis-backend/config/api.config.js`
5. Install the node packages for the backend: from the terminal go into the `neows-vis-backend` folder and type
``` npm install ```.
6. Install the node packages for the frontend: from the terminal go into the `neows-vis-frontend` folder and type
``` npm install ```.
7. Run the script `neows-vis-backend/bin/daily_fetch` to populate the database from NASA API.

## Run

To run the backend, from the terminal go into the `neows-vis-backend` folder and type
``` npm start ```.

To run the frontend, in another terminal go into the `neows-vis-frontend` folder and type
``` npm run dev ```.

Frontend should run on `http://localhost:5173`, the backend API at `http://localhost:3000`.

The script to update the database daily, can be run as `neows-vis-backend/bin/daily_fetch`. This script should be put into a daily cron job.
