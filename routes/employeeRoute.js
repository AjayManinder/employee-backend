const express = require('express');
// const { performance } = require('perf_hooks');
const Employee = require('../models/employeeModel'); // Adjust the path based on your project structure
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
// const mongoose = require('mongoose');
require('dotenv').config();


/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API endpoints for managing Employees
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         empNo:
 *           type: number
 *         name:
 *           type: string
 *         percentage:
 *           type: number
 *         branch:
 *           type: string
 *         subjectIds:
 *           type: array
 *           items:
 *             type: string
 *         yearSemIds:
 *           type: array
 *           items:
 *             type: string
 *         user_id:
 *           type: string
 *       required:
 *         - empNo
 *         - name
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */

// Create a new employee
router.post('/employees', async (req, res) => {
  try {
    // Extract employee details from the request body
    const { empNo, name, 
      // percentage, 
      // branch, 
      // subjectIds, yearSemIds, 
      userId } = req.body;

    // Create the employee record
    const newEmployee = await Employee.create({
      empNo,
      name,
      // percentage,
      // branch,
      // subjectIds,
      // yearSemIds,
      user_id: userId, // Assign the user's ID to the employee record
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add subjects to a employee's record
// router.post('/employees/:empNo/subjects', async (req, res) => {
//   try {
//     const { empNo } = req.params;
//     const { subjectId } = req.body;

//     // Find the employee by empNo
//     const employee = await Employee.findOne({ empNo });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Add the subjectId to the employee's subjectIds array
//     employee.subjectIds.push(subjectId);

//     // Save the updated employee record
//     await employee.save();

//     res.status(200).json({ message: 'Subject added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all Employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */


// Get all employees with population
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({})
      // .populate('subjectIds')
      // .populate('yearSemIds')
      .populate({
        path: 'user_id',
        populate: {
          path: 'role_id',
          model: 'Role',
        },
      })
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({})
      // .populate('subjectIds')
      // .populate('yearSemIds')
      .populate({
        path: 'user_id',
        select: 'name email', // specify the fields you want to populate
        populate: {
          path: 'role_id',
          model: 'Role',
        },
      });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get a employee by empNo with population
router.get('/employees/:empNo', async (req, res) => {
  try {
    const { empNo } = req.params;
    const employee = await Employee.findOne({ empNo })
      // .populate('subjectIds')
      // .populate('yearSemIds')
      .populate({
        path: 'user_id',
        populate: {
          path: 'role_id',
          model: 'Role',
        },
      })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a employee by empNo with population
router.put('/employees/:empNo', async (req, res) => {
  try {
    const { empNo } = req.params;
    const updatedEmployee = await Employee.findOneAndUpdate({ empNo }, req.body, { new: true })
      // .populate('subjectIds')
      // .populate('yearSemIds')
      .populate({
        path: 'user_id',
        populate: {
          path: 'role_id',
          model: 'Role',
        },
      })

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete a employee by Roll No
router.delete('/employees/:empNo', async (req, res) => {
  try {
    const { empNo } = req.params;
    const deletedEmployee = await Employee.findOneAndDelete({ empNo });
    
    if (!deletedEmployee) {
      return res.status(404).json({ message: `Cannot find any employee with empNo ${empNo}` });
    }

    res.status(200).json(deletedEmployee); // <-- Corrected line
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
// Upload employee profile image

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: AWS_REGION // Specify the AWS region where your S3 bucket is located
});

const s3 = new AWS.S3();
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Route for uploading employee profile image
router.put('/employees/upload-image/:empNo', upload.single('image'), async (req, res) => {
  try {
    console.log("call started");
    const { empNo } = req.params;
    const employee = await Employee.findOne({ empNo });
    console.log(empNo);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if file data is provided
    if (!req.file) {
      console.log("file not found");
      return res.status(400).json({ error: 'File data not provided' });
    }
   
    const file = req.file; // Access the uploaded file

    // Configure parameters for uploading image to S3
    const params = {
      Bucket: 'collegeportal',
      Key: `${empNo}-${Date.now()}-image.jpg`,
      Body: file.buffer, // Access the file buffer
      ACL: 'public-read'
    };

    // Upload image to S3
    const data = await s3.upload(params).promise();

    // Update the employee's imageUrl with the S3 object URL
    employee.imageUrl = data.Location;

    // Save the updated employee record
    await employee.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add subjects to a employee's record
// router.post('/employees/:empNo/subjects', async (req, res) => {
//   try {
//     const { empNo } = req.params;
//     const { subjectId } = req.body;

//     // Find the employee by empNo
//     const employee = await Employee.findOne({ empNo });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Add the subjectId to the employee's subjectIds array
//     employee.subjectIds.push(subjectId);

//     // Save the updated employee record
//     await employee.save();

//     res.status(200).json({ message: 'Subject added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.delete('/employees/:empNo/subjects/:subjectId', async (req, res) => {
//   try {
//     const { empNo, subjectId } = req.params;

//     // Find the employee by empNo
//     const employee = await Employee.findOne({ empNo });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Check if the subjectId exists in the employee's subjectIds array
//     const index = employee.subjectIds.indexOf(subjectId);
//     if (index === -1) {
//       return res.status(404).json({ message: 'Subject not found for this employee' });
//     }

//     // Remove the subjectId from the employee's subjectIds array
//     employee.subjectIds.splice(index, 1);

//     // Save the updated employee record
//     await employee.save();

//     res.status(200).json({ message: 'Subject deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

//old
// Delete employee profile image
// router.delete('/employees/delete-image/:empNo', async (req, res) => {
//   try {
//     const { empNo } = req.params;
//     const employee = await Employee.findOne({ empNo });


//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     if (employee.imageUrl) {
//       // Delete image file
//       fs.unlinkSync(employee.imageUrl);

//       // Reset imageUrl to default
//       employee.imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
//       await employee.save();
//     }

//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;