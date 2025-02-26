const { DivisionType } = require("@prisma/client");
const prisma = require("../config/db");

exports.addCountry = async (req, res) => {
  const { name, has_subdivision,counties, provinces } = req.body;
  try {
    const country = await prisma.country.create({
        data:{
            name,
            has_subdivision,
        }
    });


    if(has_subdivision){
        if(counties && counties.length > 0){
            for(const county of counties){
                await prisma.subDivision.create({
                    data:{
                        name:county.name,
                        type:DivisionType.COUNTY,
                        country:{connect:{id:country.id}}
                    }
                })
            }
        }
        if(provinces && provinces.length > 0){
            for(const province of provinces){
                await prisma.subDivision.create({
                    data:{
                        name:province.name,
                        type:DivisionType.PROVINCE,
                        country:{connect:{id:country.id}}
                    }
                })
            }
        }
    }

    return res
      .status(201)
      .json({
        status: true,
        message: "country created successfully!",
        data: { country },
      });
  } catch (error) {
    console.log(error);
  }
};


exports.getCountries = async (req,res) => {
    try {
        const countries = await prisma.country.findMany({
            include:{
                SubDivision:true
            }
        });

        return res.status(200).json({status:true,message:"Countries found", data:{countries}})
    } catch (error) {
        console.log(error);
        
    }
}
