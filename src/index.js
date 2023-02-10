const express = require('express');
const routes = require('./routes');
const config = require('./config');
const setupViewEnigne = require('./config/viewEngine');
const initDatabase = require('./config/dataBaseinit');


const app = express();
setupViewEnigne(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

initDatabase()
.then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
.catch((err) => console.log(err.message));

