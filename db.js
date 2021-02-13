const Sequelize = require('sequelize');
const { STRING, DATE } = Sequelize;

const db = new Sequelize('postgres://localhost/people_places_things_db');

//DEFINE MODELS
const People = db.define('person', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
});

const Place = db.define('place', {
  name: {
    type: STRING,
  },
});

const Date = db.define('date', {
  date: {
    type: DATE,
  },
  validate: {
    isDate: true,
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
  console.log('----DB CONNECTED!----');
};
