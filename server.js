const { syncAndSeed } = require('./db');

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.lister(port, () => console.log(`listening on port ${port}`));
    console.log('ready');
  } catch (error) {
    next(error);
  }
};

init();
