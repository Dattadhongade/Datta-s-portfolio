const { getPortfolioData, savePortfolioData, isDbConnected } = require('../config/db');

exports.getHealth = (req, res) => {
  res.json({
    status: 'ok',
    database: isDbConnected() ? 'MySQL Connected' : 'Persistent File Datastore (portfolio_data.json)',
    timestamp: new Date().toISOString()
  });
};

exports.getFullPortfolio = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({ success: true, data, dbStatus: isDbConnected() ? 'mysql' : 'json_file' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateFullPortfolio = async (req, res) => {
  try {
    const updated = req.body;
    const ok = await savePortfolioData(updated);
    if (ok) {
      res.json({ success: true, message: 'Portfolio data updated', data: updated });
    } else {
      res.status(500).json({ success: false, error: 'Failed to write data' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
