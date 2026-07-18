import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res,next)=>{
    //taking all the fields from the frontend 
    const{fullName,email,username,password}=req.body

    //validation
    if(
        [fullName,email,username,password].some((ele)=>ele?.trim()==="")
    )
    { 
        throw new ApiError(400, "All fields required")
    }
    //checks if user already exists
    let existedUser= await User.findOne({
        $or: [{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User already exists")
    }
    //handling files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.lenth()>0) {
        coverImageLocalPath=req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar image required");
    }
    //Uploading the file on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400,"avatar is required")
    }
    //Create a user
    const user= await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    //check if user has been created
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //error handling
    if(!createdUser){
        throw new ApiError(500,"Something went wrong")
    }
    //Sending responce
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export {registerUser}