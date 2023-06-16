const mongoose =  require('mongoose');

const DiseaseSchema =  mongoose.Schema({
    diseaseName :  {
        type : String,
        required  : true,
        trim  :  true
    },
    photo : String,
    description : {
        type : String,
        default: "" 
    },
    date_created : {
        type : Date,
        default : Date.now()
    },
    created_by :  {
        type:  mongoose.Schema.ObjectId,
        ref :  "User"
    },
    ratings :  String
})

DiseaseSchema.pre(/^find/, function(next){
    this.populate({
        path : 'created_by',
        select : '-__v  -password'
    })

    next()
})

const Disease =   mongoose.model('Disease', DiseaseSchema);

module.exports =  Disease;