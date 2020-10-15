const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
  console.log({
    status: 'OK',
    app: 'API RESTFUL SIGN-IN/OUT',
    company: 'BOLD',
    database: 'MongoDB',
  });
});
