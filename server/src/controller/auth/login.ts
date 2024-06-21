import { Response,NextFunction,Request } from "express";
import { UserRole, employeeModel} from "../../model";
import { resCustom  } from "../../utils";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../../constants";
import { comparePassword } from "../../utils/bcrypt";
import { generateAccessToken,generateRefreshToken } from "../../utils/token-genretor";
import { log } from "console";





const login =  async (req:Request,res:Response,next:NextFunction)=>{

    const {email,password} = req.body

    const user = await UserRole.findOne({email:email})
    if(!user){
        resCustom(res,HTTP_STATUS.NOT_FOUND,RESPONSE_MESSAGES.NOT_FOUND,null)
    }

    const userInfo:any =  await employeeModel.Employee.default.findOne({email:email})

    const passCompare =  comparePassword(password, userInfo?.password)

    if(!passCompare){
        resCustom(res,HTTP_STATUS.UNAUTHORIZED,RESPONSE_MESSAGES.UNAUTHORIZED,null)

    }
    
    const accessToken = generateAccessToken(userInfo._id)
    const refreshToken = generateRefreshToken(userInfo._id)  

    await 

    resCustom(res,HTTP_STATUS.OK,RESPONSE_MESSAGES.DATA_FETCHED,{access_token:accessToken,refresh_token:refreshToken,userInfo})













}

export default login
