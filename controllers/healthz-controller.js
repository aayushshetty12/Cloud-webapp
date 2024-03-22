import * as databaseService from '../services/database-service.js'
import Logger from "node-json-logger"

//const logger = new Logger()

import logger from '../logger.js'

export const checkHealthz = async (req, res) => {
    try{
        res.header('cache-control', 'no-cache');

        if(req.method !== 'GET') {
            logger.error({
                message: "Request method not allowed", 
                httpRequest: {
                  requestMethod: req.method,
                  requestUrl: req.originalUrl,
                  status: 405, 
                }
            })
            return res.status(405).send();
        }
        else if (req.headers['content-type'] || Object.keys(req.query).length > 0) {
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
            try {

                await databaseService.authenticate();
                logger.info({
                    message: "Connected to database successfully", 
                    httpRequest: {
                      requestMethod: req.method,
                      requestUrl: req.originalUrl,
                      status: 200, 
                    }
                })
                return res.status(200).send();

            } catch (err) {  
                console.log(res.statusCode)

                logger.error({
                    message: "Error while connecting to database", 
                    httpRequest: {
                      requestMethod: req.method,
                      requestUrl: req.originalUrl,
                      status: 503, 
                    }
                })

                return res.status(503).send();
            }
        }
    }
    catch(err){
        //console.log("err ", err)
        logger.error({
            message: "Technical error in database connectivity", 
            httpRequest: {
              requestMethod: req.method,
              requestUrl: req.originalUrl,
              status: 500, 
            }
        })
        return res.status(500).send();
    }
}

