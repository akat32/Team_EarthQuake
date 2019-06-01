import { Response, Request, NextFunction } from 'express'

import { Users } from '../../DB'
import randomstring from 'randomstring'
const auth = {
    signin: async (req: Request, res: Response, next: NextFunction) => {
        let result = await Users.findOne(req.body)
        if(result) return res.status(200).json(result)
        else return res.status(404).json({message : "Users Not Found!"})
    },
    signup: async (req: Request, res: Response, next: NextFunction) => {
        let new_user = new Users({
            id: req.body.id,
            passwd: req.body.passwd,
            token: randomstring.generate(25)
        })
        try {
            let result = await new_user.save()
        }catch ( e ) {
            return res.status(400).json({message : "ERR!"})
        }
        return res.status(200).json({user : new_user})
    }
}

export { auth }