const mongoose=require('mongoose')
const Schema=mongoose.Schema
const multipleChoiceSchema=new Schema({
    question:{
        type:String,
        
    },
    choiceA:{
        type:String,
        
    },
    choiceB:{
        type:String,
        
    },
    choiceC:{
        type:String,
        
    },
    correct:{
        type:String,
       
    },
    generatedCode:{
        type:String,
    },
    date:{
        type:String
    },
    topic:{
        type:String
    }

})
const identicationChoiceSchema=new Schema({
    question:{
        type:String,
       
    },

    correct:{
        type:String,
       
    },
    generatedCode:{
        type:String,
    },
    date:{
        type:String
    },
    topic:{
        type:String
    }

})
const questionSchema=new Schema({
    questionNumber:{
        type:String,
        required:true
    },
    multipleChoice:[multipleChoiceSchema],
    identicationChoice:[identicationChoiceSchema]
})
const QuestionModal=mongoose.model('Question',questionSchema)
module.exports=QuestionModal