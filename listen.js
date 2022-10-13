const app = require('./api/app');

app.listen(process.env.PORT , () => {
  console.log('app listening');
})