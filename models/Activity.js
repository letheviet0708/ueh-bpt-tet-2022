
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const activitySchema = new mongoose.Schema({
        title: String,
        lightPoint: Number,
        unit: Number,
        activityName: String,
        activityDescription: String,
        img: String,
        jsonContent: String
    },{ timestamps: true });

activitySchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

activitySchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Activity || mongoose.model('Activity', activitySchema);