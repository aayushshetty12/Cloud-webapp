import User from "../models/user.js"
import bcrypt from 'bcrypt'
import logger from "../logger.js"

const checkAuth = async (req, res, next) => {
    if (!req.get('Authorization')) {
      let err = new Error('Not Authenticated!')
      logger.warn({
        message: "User not authenticated", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 401, 
        }
      })
      res.status(401).set('WWW-Authenticate', 'Basic')
      next(err)
    }
    else {
      let credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        .toString()
        .split(':')
  
      let username = credentials[0]
      let password = credentials[1]
        
      const user =  await User.findOne({
        where: {
          username,
        },
        
      });

      if(user){
        //const userObject = user[0];
        let dbpassword = user.dataValues.password;
  
        bcrypt.compare(password, dbpassword, (err, result) => {
            if(err){
                console.log(err)
                logger.error(err)
                next(err)
            }
            if(result){
                console.log("success")
                //res.status(200)
                
                logger.info({
                  message: "Authenticated successfully", 
                  httpRequest: {
                    requestMethod: req.method,
                    requestUrl: req.originalUrl,
                    status: 200, 
                  }
              })

                req.username = username
              // Continue the execution
              next()
            }
            else{
                console.log("unsucces")

                logger.warn({
                  message: "Wrong username or password!", 
                  httpRequest: {
                    requestMethod: req.method,
                    requestUrl: req.originalUrl,
                    status: 401, 
                  }
              })

                res.status(401).send({
                    message: "Wrong username or password!"
                  })
                }
          })
      }
      else{
        logger.warn({
          message: "Username doesn't exit", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 400, 
          }
        })

        logger.debug({
          message: `Username used is ${username}`, 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 100, 
          }
        })

        res.status(400).send({
          message: "Username doesn't exit"
        })
      }
      
    }
  }

export default checkAuth