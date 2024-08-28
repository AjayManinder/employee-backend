// const mongoose = require('mongoose');
// const Employee = require('../models/employeeModel');
// require('dotenv').config();

// const protocol = process.env.DB_PROTOCOL;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const cluster = process.env.DB_CLUSTER;
// const dbName = process.env.DB_NAME;

// async function updateExistingEmployees() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect("mongodb+srv://ajay:ajay@cluster0.n2tvqbm.mongodb.net/employeesDB", {
      
//     });
//     console.log('Connected to MongoDB');

   
//     // Find all existing employees
//     const employees = await Employee.find({});

//     // Iterate over each employee document
//     for (const employee of employees) {
//       // Check if employeeBioDetails field is missing
//       if (!employee.employeeBioDetails) {
//         // Add employeeBioDetails with default values
//         employee.employeeBioDetails = {
//           level: 'Graduate',
//           class: 'Not Provided',
//           status: 'Active',
//           employeeType: 'Masters - Graduate',
//           residency: 'International',
//           campus: 'Not Provided',
//           firstTermAttended: 'Fall 2021',
//           matriculatedTerm: 'Not Provided',
//           lastTermAttended: 'Fall 2022',
//           leaveOfAbsence: 'Not Provided',
//         };
//       }

//       // Check if curriculumPrimary field is missing
//       if (!employee.curriculumPrimary) {
//         // Add curriculumPrimary with default values
//         employee.curriculumPrimary = {
//           degree: 'Master of Science',
//           studyPath: 'Not Provided',
//           level: 'Graduate',
//           program: 'MS Computer Science',
//           college: 'Health, Science and Technology',
//           major: 'Computer Science',
//           department: 'Computer Science',
//           concentration: 'Not Provided',
//           minor: 'Not Provided',
//           admitType: 'Standard',
//           admitTerm: 'Fall 2021',
//           catalogTerm: 'Fall 2021',
//         };
//       }

//       // Save the updated employee document
//       await employee.save();
//     }

//     console.log('Migration completed successfully.');

//     // Close MongoDB connection
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');

//   } catch (error) {
//     console.error('Error during migration:', error.message);
//   }
// }

// // Run the migration function
// updateExistingEmployees();
