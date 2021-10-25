const { response } = require('../app')

var db = require('../config/connection')
var collection = require('../config/collections')
const objectId = require('mongodb').ObjectId;
const bycript = require('bcrypt')

module.exports={

    adduser:(users)=>{
        
        return new Promise(async(resolve,reject)=>{

            users.newpass = await bycript.hash(users.newpass,10)
            users.isActive="Block"
            db.get().collection(collection.USERS_COLLECTION).insertOne(users).then((data)=>{
         
                resolve(data)
            })
        })
        
    },
    loginUser:(userData)=>{
        

        return new Promise(async(resolve,reject)=>{
            
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USERS_COLLECTION).findOne({newusername:userData.logusername})
            if(user){
                if(user.isActive=="Block"){

                    bycript.compare(userData.logpass,user.newpass).then((status)=>{
                        if(status){
                            console.log("Log success");
                            response.user = user
                            response.status = true
                            resolve(response)
                        }else{
                            console.log("Log failed");
                            resolve({status:false})
    
                        }
    
                    })
                }else{
                    console.log("user blocked")
                }
            }else{
                console.log("User Not Found");
                resolve({status:false})
            }
        })
    },

    getAllUsers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users = await db.get().collection(collection.USERS_COLLECTION).find().toArray()
            
            resolve(users)
            

        })
    },
    deleteUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.USERS_COLLECTION).deleteOne({ _id:objectId(userId)})
           resolve(users)
        })
    },
    blockUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USERS_COLLECTION).findOne({_id:objectId(userId)})

            if(user.isActive=="Block"){
                db.get().collection(collection.USERS_COLLECTION).updateOne({_id:objectId(userId)}, {$set:{isActive:"Unblock"}}).then(data=>{
                    resolve({blocked:true});
                }).catch(err=>{
                    reject(err);
                })
            }else{
                db.get().collection(collection.USERS_COLLECTION).updateOne({_id:objectId(userId)}, {$set:{isActive:"Block"}}).then(data=>{
                    resolve({blocked:false});
                }).catch(err=>{
                    reject(err);
                })
            }
        })
    },
    updateUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USERS_COLLECTION).updateOne({ _id:objectId(userId.id)}, {$set:{newname:userId.newname, newusername:userId.newusername,}})
            console.log(user);
            resolve(user)
        })
    }
}