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

const Thing = db.define('thing', {
  name: {
    type: STRING,
  },
});

// const Date = db.define('date', {
//   date: {
//     type: DATE,
//   },
//   validate: {
//     isDate: true,
//   },
// });

// est associations

Thing.belongsTo(People);
People.hasMany(Thing);
Place.belongsTo(People);
People.hasMany(Place);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [moe, lucy, larry] = await Promise.all(
    ['moe', 'lucy', 'larry'].map((name) => People.create({ name }))
  );
  const [NYC, Chicago, LA, Dallas] = await Promise.all(
    ['NYC', 'Chicago', 'LA', 'Dallas'].map((name) => Place.create({ name }))
  );
  const [foo, bar, bazz, quq] = await Promise.all(
    ['foo', 'bar', 'bazz', 'quq'].map((name) => Thing.create({ name }))
  );
  console.log('----DB CONNECTED!----');
};

module.exports = {
  syncAndSeed,
  models: {
    People,
    Place,
    Thing,
  },
};
