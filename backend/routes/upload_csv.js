const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment')
const Event = require('../models/event_'); // Assuming you have a model for events



// Multer storage configuration
const storage = multer.memoryStorage();

// Multer file filter for accepting only CSV files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV files are allowed'), false);
    }
};

// Multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Define supported date formats
const dateFormats = [
    "MM/DD/YYYY",
    "DD-MM-YYYY",
    "DD/MM/YYYY",
    "DD.MM.YYYY",
    "DDMMYYYY",
    "YYYY/MM/DD",
    "YYYY-MM-DD",
    "YYYY.MM.DD",
    "DD MMM",
    "DD MMM, YYYY",
];

// Function to parse date with multiple formats
const parseDate = (dateString) => {
    for (const format of dateFormats) {
        const trimmedDateString = dateString.trim(); // Trim the date string
        const parsedDate = moment(trimmedDateString, format, true); // Use moment.js library for date parsing
        if (parsedDate.isValid()) {
            return parsedDate.toISOString(); // Convert to ISO format (YYYY-MM-DDTHH:mm:ss.SSSZ)
        }
    }
    return null; // Return null if none of the formats are valid
};

// POST route for uploading CSV file
router.post('/:email', upload.single('csvFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No CSV file uploaded' });
        }

        const email = req.params.email;
        const csvData = req.file.buffer.toString(); // Convert buffer to string

        const events = [];
        const invalidEvents = []; // Array to store invalid events

        // Parse the uploaded CSV data
        const rows = csvData.split('\n'); // Split by newline to get rows
        for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
            const row = rows[i];

            // Skip if the row is empty or contains only whitespace
            if (row.trim().length === 0) {
                continue; // Skip empty rows
            }

            const [title, start, end, describe] = row.split(','); // Assuming CSV columns are: title, start, end, describe
            // Parse dates with multiple formats
            const startDate = parseDate(start.trim());
            const endDate = parseDate(end.trim());
            console.log('Title:', title);
            console.log('Start:', startDate);
            console.log('End:', endDate);
            console.log('Describe:', describe);

            // Check if startDate or endDate are not valid dates
            if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
                
                if (!startDate || !endDate){
                    invalidEvents.push({ title }); // Store invalid event title
                    continue; // Skip this event
                }
            } else {

                events.push({
                    admin: email, // Using email as admin
                    title: title.trim(),
                    start: startDate,
                    end: endDate,
                    describe: describe.trim(),
                    uploaded: true
                });

                // Save events to the database
                await Event.insertMany(events);

                }

            }

        if (invalidEvents.length > 0) {
            // If there are invalid events, send them back to the frontend
            return res.status(400).json({ error: 'Invalid events with incorrect date formats', invalidEvents });
        }

        res.status(201).json({ message: 'Events uploaded successfully' })
    } catch (error) {
        console.error('Error uploading CSV file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
