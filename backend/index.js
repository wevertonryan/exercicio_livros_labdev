import express from "express";
import cors from "cors";
import routes from "./routes/route.js"

const app = express();

app.use(express.json())

app.use(cors(
    {credentials: true, origin: "https://fictional-zebra-x5979qrrw4vxhwww-5173.app.github.dev"}
))

const ipsRequest = new Map();
const timeout = 60000;
const requestLimit = 30;

function IPRequest(ip){
    if(ipsRequest.has(ip)){
        const requestsNumber = ipsRequest.get(ip);
        if(requestLimit > requestsNumber) {
            ipsRequest.set(ip, requestsNumber + 1)
            return {message: ip + " Request Allowed!", isAllowed: true};
        }
    } else {
        ipsRequest.set(ip, 1);
        setTimeout(()=>{
            ipsRequest.delete(ip);
        }, timeout)
        return {message: ip + " Request Allowed!", isAllowed: true};
    }
    return {message: ip + " Request Refused!", isAllowed: false}
}

app.use((req, res, next) => {
    let isFinded = false;
    let ip = undefined;
    for(const rawHeader of req.rawHeaders){
        if(isFinded){
            ip = rawHeader
            break;
        } 
        if(rawHeader == "X-Real-IP"){
            isFinded = true;
        }
    }
    const result = IPRequest(ip);
    if(!result.isAllowed){
        res.status(429).json({message: "Você fez muitas requisições! tente novamente mais tarde.", status: "failed"});
        return;
    }
    next();
})

app.use("/biblioteca", routes);

app.listen(5000);
console.log("To ouvindo");