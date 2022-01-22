const activityResultSchema = require('./ActivityResult')

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const personSchema = new mongoose.Schema({
        name: String,
        mssv: String,
        clan: String,
        avatar: String,
        cls: String,
        phone: String,
        gen: String,
        email: String,
        uid: String,
        count: Number,
        result: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "ActivityResult"
        }],
        gifCharacter:String

    },{ timestamps: true });

personSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

personSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Person || mongoose.model('Person', personSchema);