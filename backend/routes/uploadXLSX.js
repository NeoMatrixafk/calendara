const router = require("express").Router();
const axios = require("axios");
const multer = require("multer");
const xlsx = require("xlsx");
const moment = require("moment");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post("/:userName", upload.single("excelFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file was uploaded.");
    }

    // Now you can access the Excel file data using req.file.buffer
    const excelFileData = req.file.buffer;

    const userName = req.params.userName;

    const workbook = xlsx.read(excelFileData, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const results = xlsx.utils.sheet_to_json(worksheet);

    const apiCalls = results.map(async (row) => {
        const title = row.Title;
        const startDate = moment(row.Start, "YYYY-MM-DD").format("YYYY-MM-DD");
        const endDate = moment(row.End, "YYYY-MM-DD").format("YYYY-MM-DD");
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
                    end: `${endDate}T00:00:30.000+00:00`,
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


module.exports = router;