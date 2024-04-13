const router = require("express").Router();
const axios = require("axios");
const csv = require("csv-parser");
const streamifier = require("streamifier");
const multer = require("multer");
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

router.post("/:email", upload.single("csvFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file was uploaded.");
    }

    // Now you can access the CSV file data using req.file.buffer
    const csvFileData = req.file.buffer.toString();

    const email = req.params.email;

    const stream = streamifier.createReadStream(Buffer.from(csvFileData));

    let isError = false; // Flag to track if an error has occurred
    const errors = [];

    stream
        .pipe(csv())
        .on("data", async (row) => {
            const title = row.Title;
            let startDate = parseDate(row.Start);
            let endDate = parseDate(row.End);
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
        })
        .on("end", async () => {
            // If there are errors, send a response with the errors
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors: errors,
                });
            }
            
            // If no errors occurred, send a success response
            res.json({
                success: true,
                message: "API calls completed.",
            });
        });

    })


module.exports = router;
