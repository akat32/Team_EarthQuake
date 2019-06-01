import { Response, Request, NextFunction } from 'express'

import { Users, Donate } from '../../DB'
import * as randomstring from 'randomstring'

const donate = {
    newDonate: async (req: Request, res: Response)=> {
        let newDonate = new Donate({
            title: req.body.title,
            explanation: req.body.explanation,
            address: req.body.address,
            x: req.body.x,
            y: req.body.y,
            userEmail: req.body.userEmail,
            token: randomstring.generate(30),
            photoUrl: 'url' + req.file.filename,
            damage: req.body.damage
        })
        try {
            let result = await newDonate.save()  
            let Uresult = await Users.update({token : req.body.token}, {
                $push: { myRequest: {        
                    title: req.body.title,
                    photoUrl : 'url' + req.file.filename,
                    address: req.body.address,
                    token: newDonate.token,
                    damage: req.body.damage
                }}
            })        

        }catch(e) {
            return res.status(500).json({message : "ERR!"})
        }
        return res.status(200).json({message : "success!"})
    },
    bidding: async (req: Request, res: Response)=>{

    },
    donate: async (req: Request, res: Response)=> {

    },
    loadList: async(req: Request, res: Response)=> {
        let result = await Donate.find()
        return res.statsu(200).json({list : result})
    },
    loadDonate: async(req: Request, res: Response)=> {
        let result = await Donate.findOne({token : req.body.donateToken})
        if(!result) return res.status(404).json({message : "Not Found!"}) 
        else return res.status(200).json({donate : result})   
    }
}

export { donate }