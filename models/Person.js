
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const personSchema = new mongoose.Schema({
        name: String,
        mssv: String,
        clan: String,
        avatar: String,
        gen: String,
        sex: String,
        phone: String,
        mail: String,
        uid: String,
        activity: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity"
        }]
    },{ timestamps: true });

personSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

personSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Person || mongoose.model('Person', personSchema);