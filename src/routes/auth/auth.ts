import { Response, Request, NextFunction } from 'express'

import { Users } from '../../DB'
import * as randomstring from 'randomstring'
const auth = {
    signin: async (req: Request, res: Response, next: NextFunction) => {
        let result = await Users.findOne(req.body)
        if(result) return res.status(200).json(result)
        else return res.status(404).json({message : "Users Not Found!"})
    },
    signup: async (req: Request, res: Response, next: NextFunction) => {
        let new_user = new Users({
            email: req.body.email,
            passwd: req.body.passwd,
            token: randomstring.generate(25),
            isCompany: req.body.isCompany
        })
        try {
            let result = await new_user.save()
        }catch ( e ) {
            return res.status(400).json({message : "ERR!"})
        }
        return res.status(200).json({user : new_user})
    },
    donationlist: async (req: Request, res: Response)=> {
        let result = await Users.findOne({token : req.body.token})
        if(!result) return res.status(404).json({message: "Not Found!"})
        else return res.status(200).json({list : result.myDonate})
    },
    biddinglist: async (req: Request, res: Response)=> {
        let result = await Users.findOne({token : req.body.token})
        if(!result) return res.status(404).json({message: "Not Found!"})
        else return res.status(200).json({list : result.myBidding})
    },
    requestlist: async (req: Request, res: Response)=> {
        let result = await Users.findOne({token : req.body.token})
        if(!result) return res.status(404).json({message: "Not Found!"})
        else return res.status(200).json({list : result.myRequest})
    }
}

export { auth }