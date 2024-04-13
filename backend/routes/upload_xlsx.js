const router = require("express").Router();
const axios = require("axios");
const multer = require("multer");
const xlsx = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { parse, isValid, format } = require("date-fns");

// Function to parse date with multiple formats
function parseDate(dateString) {
    // Define an array of possible date formats
    const dateFormats = [
        "MM/dd/yyyy",
        "dd-MM-yyyy",
        "dd/MM/yyyy",
        "dd.MM.yyyy",
        "ddMMyyyy",
        "yyyy/MM/dd",
        "yyyy-MM-dd",
        "yyyy.MM.dd",
        "dd MMM",
        "dd MMM, yyyy",
    ];

    // Iterate over the formats and attempt to parse the date
    for (const formatStr of dateFormats) {
        const parsedDate = parse(dateString, formatStr, new Date());
        if (isValid(parsedDate)) {
            // Return the parsed date if it's valid
            return format(parsedDate, "yyyy-MM-dd");
        }
    }

    // If none of the formats match
    return null;
}

router.post("/:email", upload.single("excelFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file was uploaded.");
        }

        // Now you can access the Excel file data using req.file.buffer
        const excelFileData = req.file.buffer;

        const email = req.params.email;

        const workbook = xlsx.read(excelFileData, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const results = xlsx.utils.sheet_to_json(worksheet);

        let isError = false; // Flag to track if an error has occurred
        const errors = [];

        for (const row of results) {
            const title = row.Title;
            let startDate = parseDate(row.Start); // Parse start date
            let endDate = parseDate(row.End); // Parse end date
            const describe = row.Describe;

            // Check if startDate or endDate is null (indicating invalid date format)
            if (!startDate || !endDate) {
                const errorMessage = `Invalid date format for ${title}`;
                console.error(errorMessage);
                isError = true;
                // Collect errors
                errors.push({ title, message: errorMessage });
            } else {
                console.log(
                    `Title: ${title}, StartDate: ${startDate}, EndDate: ${endDate}, Describe: ${describe}`
                );
    
                try {
                    const response = await axios.post(
                        `http://localhost:55555/api/events`,
                        {
                            admin: email,
                            title: title,
                            start: `${startDate}T00:00:00.000+00:00`,
                            end: `${endDate}T01:00:00.000+00:00`,
                            describe: describe,
                            uploaded: true,
                        }
                    );
                    console.log(`API Response for ${title}:`, response.data);
                } catch (error) {
                    console.error(
                        `Error making API call for ${title}:`,
                        error.message
                    );
                    // Collect errors
                    errors.push({ title, message: error.message });
                }
            }
        }

        if (errors.length > 0) {
            // Send a single response containing all error messages
            res.status(400).json({ success: false, errors: errors });
        } else {
            res.json({ success: true, message: "API calls completed." });
        }
    } catch (error) {
        console.error("Error in processing:", error);
        res.status(400).json({
            success: false,
            message: "Error in processing.",
        });
    }
});


module.exports = router;
