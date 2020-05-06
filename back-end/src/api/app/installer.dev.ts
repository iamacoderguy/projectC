import app, { connectToDb } from './installer';

connectToDb();

const port = 3000;
app.listen(port, () => console.info(`Buzz backend is listening on port ${port}!`));
