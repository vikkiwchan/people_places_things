const {
  syncAndSeed,
  models: { People, Place, Thing },
} = require('./db');
const express = require('express');
const html = require('html-template-tag');
const path = require('path');

const app = express();
const error = 'ahh';

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  try {
    const [people, places, things] = await Promise.all([
      People.findAll(),
      Place.findAll(),
      Thing.findAll(),
    ]);
    res.send(
      html`<html>
        <head>
          <title>People, Places, Things</title>
          <link rel="stylesheet" href="/public/styles.css" />
        </head>
        <body>
          <h1>People, Places, Things</h1>
          <div id="container">
            <div id="list">
              <div>
                <h2>People</h2>
                <ul>
                  ${people.map((person) => html` <li>${person.name}</li> `)}
                </ul>
              </div>
              <div>
                <h2>Places</h2>
                <ul>
                  ${places.map((place) => html` <li>${place.name}</li> `)}
                </ul>
              </div>
              <div>
                <h2>Things</h2>
                <ul>
                  ${things.map((thing) => html` <li>${thing.name}</li> `)}
                </ul>
              </div>
            </div>
            <div id="form">grggughddid</div>
          </div>
        </body>
      </html>`
    );
  } catch (error) {
    console.error(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
    console.log('ready');
  } catch (error) {
    console.error(error);
  }
};

init();
