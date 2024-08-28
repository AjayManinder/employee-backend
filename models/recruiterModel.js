const mongoose = require('mongoose');

const recruiterSchema = mongoose.Schema({
  recruiterID: {
    type: String,
    required: true,
  },
  recruiterName: {
    type: String,
    required: true,
  },
  // subjectIds: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Subject',
  //   },
  // ],
   user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
