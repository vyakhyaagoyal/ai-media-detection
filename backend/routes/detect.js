const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
  console.log("🔥 Detect route hit");

  // Take filePath (should be Cloudinary URL) from frontend request
  const filePath = req.body.filePath;
  if (!filePath) {
    return res.status(400).json({ error: "filePath (Cloudinary URL) is required" });
  }

  const scriptPath = path.join(__dirname, '..', '..', 'ml-api', 'test_image.py');
  console.log("👉 Running Python script at:", scriptPath, "with file:", filePath);

  const python = spawn('python', [scriptPath, filePath]);

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`Python script finished with code ${code}`);
    try {
      const lines = result.trim().split("\n");
      const lastLine = lines[lines.length - 1];

      const parsed = JSON.parse(lastLine);
      res.json(parsed);
    } catch (err) {
      console.error("❌ Failed to parse Python output:", result);
      res.status(500).json({ error: "Invalid output from Python" });
    }
  });
});


module.exports = router;
