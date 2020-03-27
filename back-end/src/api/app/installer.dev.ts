import app, { connectToDb } from './installer';

connectToDb();

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
