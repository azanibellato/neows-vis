# Near Earth Objects Monitoring Visualisation

This is a sample project of Data Visualisation made for a Code Challenge interview.
The data is retrieved from NASA NeoWs (Near Earth Object Web Service) service at [https://api.nasa.gov/](https://api.nasa.gov/).

## Prerequisites

- MySQL / MariaDB
- NodeJS v.16 or higher

## Installation and configuration

1. Clone this project with ```git clone https://github.com/azanibellato/neows-vis.git```
2. Insert the db configuration in 'neows-vis-backend/config/db.config.js'
3. Create the table by running `neows-setup.sql` in your database
3. Set your API key for NASA  in ...
4. Install the node packages for the backend ...
4. Install the node packages for the frontend ...

## Run

To run the backend, from the terminal go into the `neows-vis-backend` folder and type
``` npm start ```

To run the frontend, in another terminal go into the `neows-vis-folder` folder and type
``` npm run dev ```

Frontend should run on http://localhost:5173, the backend API at http://localhost:3000.
