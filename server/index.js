// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const handleQuery = require('./coordinator');

// const app = express();

// app.use(cors()); // ✅ Enable CORS for all origins
// app.use(bodyParser.json());

// app.post('/api/ask', async (req, res) => {
//   const { query } = req.body;
//   const response = await handleQuery(query);
//   res.json(response);
// });

// app.listen(5000, () => console.log('Server running on port 5000'));
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const handleQuery = require('./coordinator');

app.post('/api/ask', async (req, res) => {
  const { query } = req.body;

  // ✅ Improved validation
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({
      summary: "❌ No valid query provided.",
      trace: [{
        role: "System",
        action: "Validation",
        result: "Empty or invalid query."
      }]
    });
  }

  try {
    const result = await handleQuery(query);
    res.json(result);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      summary: "Error occurred while processing your query.",
      error: error.message,
      trace: []
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
