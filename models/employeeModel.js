const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  empNo: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // percentage: Number,
  // branch: String,
  imageUrl: {
    type: String,
   
  },
  // subjectIds: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Subject',
  //   },
  // ],
  // yearSemIds: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'YearSem',
  // }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // employeeBioDetails: {
  //   type: {
  //     level: {
  //       type: String,
  //       default: 'N/A',
  //     },
  //     class: {
  //       type: String,
  //       default: 'Graduate',
  //     },
  //     status: {
  //       type: String,
  //       default: 'Active',
  //     },
  //     employeeType: {
  //       type: String,
  //       default: 'Masters - Graduate',
  //     },
  //     residency: {
  //       type: String,
  //       default: 'International',
  //     },
  //     campus: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //     firstTermAttended: {
  //       type: String,
  //       default: 'Fall 2021',
  //     },
  //     matriculatedTerm: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //     lastTermAttended: {
  //       type: String,
  //       default: 'Fall 2022',
  //     },
  //     leaveOfAbsence: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //   },
  //   required: false,
  // },
  // curriculumPrimary: {
  //   type: {
  //     degree: {
  //       type: String,
  //       default: 'Master of Science',
  //     },
  //     studyPath: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //     level: {
  //       type: String,
  //       default: 'Graduate',
  //     },
  //     program: {
  //       type: String,
  //       default: 'MS Computer Science',
  //     },
  //     college: {
  //       type: String,
  //       default: 'Health, Science and Technology',
  //     },
  //     major: {
  //       type: String,
  //       default: 'Computer Science',
  //     },
  //     department: {
  //       type: String,
  //       default: 'Computer Science',
  //     },
  //     concentration: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //     minor: {
  //       type: String,
  //       default: 'Not Provided',
  //     },
  //     admitType: {
  //       type: String,
  //       default: 'Standard',
  //     },
  //     admitTerm: {
  //       type: String,
  //       default: 'Fall 2021',
  //     },
  //     catalogTerm: {
  //       type: String,
  //       default: 'Fall 2021',
  //     },
  //   },
  //   required: false,
  // },
}, {
  timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
