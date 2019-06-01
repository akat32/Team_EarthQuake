import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));

import { auth } from './routes'

app.get('/signin', auth.signin)

export default app
