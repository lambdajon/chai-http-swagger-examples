const dotenv = require('dotenv')
const app = require('./src/app')
dotenv.config()

const PORT = process.env.PORT || 3000;

app.server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});