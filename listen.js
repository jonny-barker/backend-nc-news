const app = require('./api/app');

app.listen(process.env.PORT || 9090, () => {
  console.log('app listening');
})