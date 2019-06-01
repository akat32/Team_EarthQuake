import app from '../App'
const port: number = Number(process.env.PORT) || 3000;


app.listen(port, () => console.log(`Express server listening at ${port}`))
.on('error', err => console.error(err));