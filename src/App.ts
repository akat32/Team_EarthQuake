import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as path from 'path'
import * as multer from 'multer'
import * as randomstring from 'randomstring'
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: (req: express.Request,file,cb)=>{
      cb(null, '/home/ubuntu/Team_EarthQuake/src/public/photo/'); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
    },
    filename: (req: express.Request,file,cb)=>{
      var newStr = randomstring.generate(33);
      newStr = newStr + ".PNG"
      cb(null, newStr);
    },
    limits: {
      fileSize: 5 * 1024 * 1024
    }
})
const upload = multer({storage : storage});

import { auth, donate } from './routes'

app.post('/signin', auth.signin)
app.post('/signup', auth.signup)
app.post('/donationlist', auth.donationlist)
app.post('/biddinglist', auth.biddinglist)
app.post('/requestList', auth.requestlist)

app.post('/newdonation', upload.single('photo'), donate.newDonate)

app.post('/donateList', donate.loadList)
app.post('/loadDonate', donate.loadDonate)
export default app
