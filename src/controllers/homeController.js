const asyncHandler = require("../utils/asyncHandler");
const homePageService = require('../services/homePageService/homePageService');

exports.getHomePageContent = asyncHandler(async (req,res) => {
    const {categories} = await homePageService.getContent();
    return res.status(200).json({status:true,message:"Data found",data:{
categories
    }})
})