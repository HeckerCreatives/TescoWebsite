const QuestionModal=require('../model/question_model')

exports.create_question=async(req,res)=>{
 try{  
    const response= new QuestionModal({
        questionNumber:req.body.questionNumber,
        multipleChoice:req.body.multipleChoice,
        identicationChoice:req.body.identicationChoice
    })
    if(response){
        await response.save();
        return res
        .status(200)
        .json({ sucess: true, message: "Question data added" });
    }
    else {
        return res.status(201).json({ success: false, msg: response });
      }
}
    catch(error){
        return res.status(500).send(error);
    }
}
exports.getall_question=async(req,res)=>{
  try{
    const response=await QuestionModal.find()
    if(response){
        
        return res
        .status(200)
        .json({ sucess: true, message: "Question data fetched",response });
    }
    else {
        return res.status(201).json({ success: false, msg: response });
      }

  }catch(error){
    return res.status(500).send(error);
  }
    
}