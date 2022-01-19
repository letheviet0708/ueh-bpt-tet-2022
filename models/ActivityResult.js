
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const activityResultSchema = new mongoose.Schema({
        activityIndex: Number,
        images: [String],
        text: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        },
        state: Number
    },{ timestamps: true });

activityResultSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

activityResultSchema.plugin(mongoosePaginate)
module.exports =  mongoose.models['ActivityResult'] 
? mongoose.model('ActivityResult') : mongoose.model('ActivityResult', activityResultSchema);
//module.exports = mongoose.models.activityResultSchema || mongoose.model('ActivityResult', activityResultSchema);