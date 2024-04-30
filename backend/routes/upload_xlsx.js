const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment')
const Event = require('../models/event_'); // Assuming you have a model for events
const xlsx = require('xlsx');


// Multer storage configuration
const storage = multer.memoryStorage();

// Multer file filter for accepting only CSV files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(new Error('Only XLSX files are allowed'), false);
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

// POST route for uploading XLSX file
router.post('/:email', upload.single('excelFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No XLSX file uploaded' });
        }

        const email = req.params.email;
        const buffer = req.file.buffer; // Get file buffer

        let workbook;
        try {
            // Parse XLSX file
            workbook = xlsx.read(buffer, { type: 'buffer' });
        } catch (error) {
            console.error('Error parsing XLSX file:', error);
            return res.status(400).json({ error: 'Error parsing XLSX file' });
        }

        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        // Convert sheet to JSON data
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        const events = [];
        const invalidEvents = []; // Array to store invalid events

        // Iterate over rows starting from index 1 to skip header row
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];

            // Remove empty items and trim the row
            const trimmedRow = row.filter(cell => cell.trim() !== '');

            // Skip if the row is empty after trimming
            if (trimmedRow.length === 0) {
                continue; // Skip empty rows
            }

            const [title, start, end, describe] = trimmedRow;

            // Check for empty cells
            if (!title || !start || !end || !describe) {
                invalidEvents.push({ title: 'Missing fields' });
                continue;
            }

            // Parse dates with multiple formats
            const startDate = parseDate(start.trim());
            const endDate = parseDate(end.trim());

            // Check if startDate or endDate are not valid dates
            if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
                invalidEvents.push({ title }); // Store invalid event title
                continue; // Skip this event
            }

            events.push({
                admin: email, // Using email as admin
                title: title.trim(),
                start: startDate,
                end: endDate,
                describe: describe.trim(),
                uploaded: true
            });
            console.log(events)
        }

        // Save valid events to the database
        await Event.insertMany(events);

        if (invalidEvents.length > 0) {
            // If there are invalid events, send them back to the frontend
            return res.status(400).json({ error: 'Invalid events with incorrect date formats', invalidEvents });
        }

        res.status(201).json({ message: 'Events uploaded successfully' })
    } catch (error) {
        console.error('Error uploading XLSX file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
