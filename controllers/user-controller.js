import * as userServices from "../services/user-service.js"
import logger from "../logger.js";

const usernameExistCheck = async (username) => {
    try {
        const users = await userServices.searchForUsername(username)
    
        return users.length > 0;
      } catch (error) {

        console.error('Error checking users:', error);
        return false; 
      }
}


export const getUser = async (req, res) => {
    res.header('cache-control', 'no-cache');

    const username = req.username//"jan.doe@example.com"
    if (req.headers['content-type'] || Object.keys(req.query).length > 0) {
      logger.error({
        message: "Payload not allowed", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 400, 
        }
      })
      return res.status(400).send();
    }
    else{
      const user = await userServices.searchToGet(username)
      if(user){
        const userResponse = JSON.stringify(user, null, 2);
        logger.info({
          message: "User data fetched successfully", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 200, 
          }
        })
        res.status(200).send(userResponse)
      }
      else{
        logger.warn({
          message: "User not found", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 400, 
          }
        })
        res.status(400).send({message: "User not found"})
      }
    } 

}

export const updateUser = async (req, res) => {

  const username = req.username//"jan.doe@example.com"
  res.header('cache-control', 'no-cache');

  if (req.body.hasOwnProperty('uuid') || req.body.hasOwnProperty('account_created') || req.body.hasOwnProperty('account_updated') || req.body.hasOwnProperty('username')) {
    logger.error({
      message: "Invalid field/s used in payload", 
      httpRequest: {
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        status: 400, 
      }
    })
    return res.status(400).json();
  }
  else{
    try {
      const user = await userServices.searchToUpdate(username)
      
        user.set({...user.dataValues, ...req.body})

        await user.save();
        logger.info({
          message: "User data updated successfully", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 204, 
          }
        })
        return res.status(204).json();
      
    } catch (error) {
      console.error('Error updating user:', error);
      logger.error({
        message: "Error while updating user data", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 500, 
        }
    })
      return res.status(500).json();
    }
  }
}

export const createUser = async (req, res) => {

  res.header('cache-control', 'no-cache');

  const username = req.body.username
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(username)) {
    logger.error({
      message: "Invalid username format", 
      httpRequest: {
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        status: 400, 
      }
    })
    return res.status(400).json()
  }
  else{
    if (req.body.hasOwnProperty('uuid') || req.body.hasOwnProperty('account_created') || req.body.hasOwnProperty('account_updated') || 
    !req.body.hasOwnProperty('first_name') || !req.body.hasOwnProperty('last_name') ||
    !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') ||
    req.body.first_name === '' || req.body.last_name === '' || 
    req.body.username === '' || req.body.password === '') {

      logger.warn({
        message: "Invalid payload fields or values", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 400, 
        }
      })  
      
      return res.status(400).json();
}
      else{  
        const userExists = await usernameExistCheck(username)

        if(userExists){
          logger.warn({
            message: "Username already exists!", 
            httpRequest: {
              requestMethod: req.method,
              requestUrl: req.originalUrl,
              status: 400, 
            }
          })
            res.status(400).send({
              message: "Username already exists!"
            })
        }
        else{
            try{
              const user = await userServices.addUser(req.body);
              logger.info({
                message: "User created successfully", 
                httpRequest: {
                  requestMethod: req.method,
                  requestUrl: req.originalUrl,
                  status: 201, 
                }
              })
              return res.status(201).send(user)
            }
            
            catch(err){
              logger.error({
                message: "Error while creating user", 
                httpRequest: {
                  requestMethod: req.method,
                  requestUrl: req.originalUrl,
                  status: 400, 
                }
              })
              return res.status(400).json();
            }
        }
    }
    
  }
}