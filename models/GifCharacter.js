
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const gifCharacterSchema = new mongoose.Schema({
        activityIndex: Number,
        images: [String],
        text: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        },
        state: Number
    },{ timestamps: true });

gifCharacterSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

gifCharacterSchema.plugin(mongoosePaginate)
module.exports =  mongoose.models['GifCharacter'] 
? mongoose.model('GifCharacter') : mongoose.model('GifCharacter', gifCharacterSchema);
//module.exports = mongoose.models.gifCharacterSchema || mongoose.model('GifCharacter', gifCharacterSchema);