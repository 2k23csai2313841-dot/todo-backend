const mongoose=require('mongoose');

const todoItemSchema=new mongoose.Schema({
  task:{
    type:String,
    required:true
  },
  date:Date,
  completed:{
    type:Boolean,
    default:false
  },
},
    {timeStamp:true}
);

module.exports=mongoose.model("TodoItem",todoItemSchema);