const express = require('express');
const Recruiter = require('../models/recruiterModel');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recruiters
 *   description: API endpoints for managing recruiters
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recruiter:
 *       type: object
 *       properties:
 *         recruiterID:
 *           type: string
 *         recruiterName:
 *           type: string
 *         subjectIds:
 *           type: array
 *           items:
 *             type: string
 *         user_id:
 *           type: string
 *       required:
 *         - recruiterID
 *         - recruiterName
 */


/**
 * @swagger
 * /recruiters:
 *   post:
 *     summary: Create a new recruiter
 *     tags: [Recruiters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recruiter'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recruiter'
 */

// Create a new recruiter
router.post('/recruiters', async (req, res) => {
  try {
    const { recruiterID, recruiterName, userId } = req.body; // subjectIds,

    // Ensure required properties are provided
    if (!recruiterID || !recruiterName || !userId)
      //  || !subjectIds 
       {
      return res.status(400).json({ message: 'Please provide recruiterID, recruiterName, and userId' }); // subjectIds,
    }

    const newRecruiter = await Recruiter.create({
      recruiterID,
      recruiterName,
     // subjectIds,
      user_id: userId,
    });

    res.status(201).json(newRecruiter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /recruiters:
 *   get:
 *     summary: Get all Recruiters
 *     tags: [Recruiters]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recruiter'
 */


// Get all recruiters
router.get('/recruiters', async (req, res) => {
  try {
    const recruiters = await Recruiter.find({})
    //.populate('subjectIds')
    .populate({
      path: 'user_id',
      populate: {
        path: 'role_id',
        model: 'Role',
      },
    });
    res.status(200).json(recruiters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a recruiter by ID
router.get('/recruiters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findById(id)
    //.populate('subjectIds')
    .populate({
      path: 'user_id',
      populate: {
        path: 'role_id',
        model: 'Role',
      },
    });
    
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a recruiter by ID
router.put('/recruiters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(id, req.body, { new: true })
    //.populate('subjectIds')
    .populate({
      path: 'user_id',
      populate: {
        path: 'role_id',
        model: 'Role',
      },
    });
    
    if (!updatedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json(updatedRecruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a recruiter by ID
router.delete('/recruiters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecruiter = await Recruiter.findByIdAndDelete(id);
    
    if (!deletedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({ message: 'Recruiter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
