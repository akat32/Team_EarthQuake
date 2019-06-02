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
            photoUrl: '/home/ubuntu/Team_EarthQuake/src/public/photo/' + req.file.filename,
            damage: req.body.damage
        })
        try {
            let result = await newDonate.save()  
            let Uresult = await Users.update({token : req.body.token}, {
                $push: { myRequest: {        
                    title: req.body.title,
                    photoUrl : '/home/ubuntu/Team_EarthQuake/src/public/photo/' + req.file.filename,
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
        let donate = await Donate.findOne({token : req.body.donateToken})
        if(donate.price > req.body.price){
            try {    
                let result = await Donate.update({token : req.body.donateToken}, {
                    $set: {price : req.body.price}
                })
                result = await Users.update({token : donate.token},{
                    $pop: {myBidding : { token : req.body.donateToken}}
                })
                result = await Donate.update({token : req.body.donateToken}, {
                    $set: {biddingCompany : req.body.token}
                })
                result = await Users.update({token : req.body.token},{
                    $push: {myBidding : {                   
                        photoUrl : donate.photoUrl,
                        donate: donate.donate,
                        address: donate.address,
                        price: req.body.price,
                        damage: donate.damage,
                        token : req.body.donateToken
                    }}
                })
            }catch(e) {
                return res.status(400).json({message : "ERR!"})
            }
        }
        return res.status(200).json({message : "success!"})
    },
    donate: async (req: Request, res: Response)=> {
        let donate = await Donate.findOne({token : req.body.donateToken})
        try {
            let result = await Donate.update({token : req.body.donateToken},{
                $set: {donate : donate.donate + req.body.donate}
            })
            result = await Users.update({token : req.body.token},{
                $push: { myDonate : {
                    title: donate.title,
                    photoUrl : donate.photoUrl,
                    donate: donate.donate + req.body.donate,
                    address: donate.address,
                    price: donate.price,
                    token: donate.token,
                    damage: donate.damage
                }}
            })
        }catch(e){
            return res.status(400).json({message : "ERR!"})
        }
        return res.status(200).json({message : "success!"})
    },
    loadList: async(req: Request, res: Response)=> {
        let result = await Donate.find()
        return res.status(200).json({list : result})
    },
    loadDonate: async(req: Request, res: Response)=> {
        let result = await Donate.findOne({token : req.body.donateToken})
        if(!result) return res.status(404).json({message : "Not Found!"}) 
        else return res.status(200).json({donate : result})   
    }
}

export { donate }