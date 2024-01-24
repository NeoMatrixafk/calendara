const router = require("express").Router();
const csv = require("csv-parser");
const multer = require("multer");
const streamifier = require("streamifier");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/:userName", upload.single("csvFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file was uploaded.");
    }

    // Now you can access the CSV file data using req.file.buffer
    const csvFileData = req.file.buffer.toString();

    const userName = req.params.userName;

    const results = [];
    const stream = streamifier.createReadStream(Buffer.from(csvFileData));

    stream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
            const apiCalls = results.map(async (row) => {
                const title = row.Title;
                const startDate = row.Start;
                const endDate = row.End;
                const describe = row.Describe;

                console.log(
                    `Title: ${title}, StartDate: ${startDate}, EndDate: ${endDate}, Describe: ${describe}`
                );

                try {
                    const response = await axios.post(
                        `http://localhost:55555/api/events`,
                        {
                            admin: userName,
                            title: title,
                            start: `${startDate}T00:00:00.000+00:00`,
                            end: `${endDate}T01:00:00.000+00:00`,
                            describe: describe,
                            color: "#3174ad",
                        }
                    );
                    console.log(`API Response for ${title}:`, response.data);
                } catch (error) {
                    console.error(
                        `Error making API call for ${title}:`,
                        error.message
                    );
                }
            });

            try {
                await Promise.all(apiCalls);
                res.json({ success: true, message: "API calls completed." });
            } catch (error) {
                console.error("Error in Promise.all:", error);
                res.status(500).json({
                    success: false,
                    message: "Error in API calls.",
                });
            }
        });
});
module.exports = router;
