const ResultModal=require('../model/result_model')

exports.get_all_result=async(req,res)=>{
    try {
       const response= await ResultModal.find()
       if(response){
        
        return res
        .status(200)
        .json({ sucess: true, message: "Result data fetched",response });
    }
    else {
        return res.status(201).json({ success: false, msg: response });
      }
    } catch (error) {
        return res.status(500).send(error);
    }
}