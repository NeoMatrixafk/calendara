const router = require("express").Router();
const csv = require('csv-parser');
const multer = require('multer');
const streamifier = require('streamifier');
const axios = require("axios");



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/:userName', upload.single('csvFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    // Now you can access the CSV file data using req.file.buffer
    const csvFileData = req.file.buffer.toString();
  
    const userName = req.params.userName;
  
      const results = [];
      const stream = streamifier.createReadStream(Buffer.from(csvFileData));

      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // Now, 'results' array contains objects with properties corresponding to headers
  
          // You can process each row and make API calls
          for (const row of results) {
            const title = row.Title;
/*            const startDate = row.StartDate;
            const endDate = row.EndDate;
            const describe = row.Describe;
*/            const startDate = "2024-02-25";
            const endDate = "2024-02-26";
            const describe = "";
  
            // Process the values as needed
            console.log(`Title: ${title}, StartDate: ${startDate}, EndDate: ${endDate}, Describe: ${describe}`);
  
            // Make an API call with the processed values
            try {

              const response = await axios.post(`http://localhost:55555/api/events`, {
                admin: userName,
                title: title,
                start: `${startDate}T00:00:00.000+00:00`,
                end: `${endDate}T00:00:00.000+00:00`,
                describe: describe,
                color: "#3174ad"
              })
  
              // Log the API response
              console.log('API Response:', response.data);
            } catch (error) {
              console.error('Error making API call:', error.message);
            }
          }
  
          res.json({ success: true, message: 'API calls completed.' });
        });

  });
module.exports = router;