const { syncAndSeed, models: {People, Place, Thing} } = require('./db');
const express = require('express');
//const html = require('html-template-tag');
const app = express()
const error = 'ahh'
app.get('/', async(req, res, next) => {
  try {
    const [people, places, things] = await Promise.all([
      People.findAll(),
      Place.findAll(),
      Thing.findAll()
    ])
    res.send(
      `<html>
        <head>
          <title>People, Places, Things</title>
        </head>
        <body>
          <h1>People, Places, Things</h1>
          <div>
            <h2>People</h2>
            <ul>
              ${people.map(
                (person) => `
                  <li>
                    ${person.name}
                  </li>
                `
              ).join('')}
            </ul>
          </div>
          </body>
          </html>`
    )
  }
  catch (error) {
    console.error(error)
  }
})


const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
    console.log('ready');
  } catch (error) {
    console.error(error)
  }
};

init();
