const express = require('express');
const cors = require('cors');
const server = express();
const { connect } = require('mongoose');
const routes = require('./routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

(async () => {
  await connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
})();

server.listen(process.env.PORT || 3333, () => {
  console.log({
    status: 'OK',
    app: 'API RESTFUL SIGN-IN/OUT',
    company: 'BOLD',
    database: 'MongoDB',
  });
});
