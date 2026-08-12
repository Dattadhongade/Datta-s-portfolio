const { getPortfolioData, savePortfolioData } = require('../config/db');

// GET Profile & About details
exports.getProfile = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({
      success: true,
      data: {
        profile: data.profile || {},
        stats: data.stats || [],
        techPills: data.techPills || [],
        capabilities: data.capabilities || [],
        lifestyle: data.lifestyle || []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE Profile
exports.updateProfile = async (req, res) => {
  try {
    const data = await getPortfolioData();
    data.profile = { ...(data.profile || {}), ...req.body };
    await savePortfolioData(data);
    res.json({ success: true, message: 'Profile updated successfully', data: data.profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE Tech Pills
exports.updateTechPills = async (req, res) => {
  try {
    const data = await getPortfolioData();
    data.techPills = req.body.techPills || data.techPills;
    await savePortfolioData(data);
    res.json({ success: true, message: 'Tech pills updated', data: data.techPills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE Stats
exports.updateStats = async (req, res) => {
  try {
    const data = await getPortfolioData();
    data.stats = req.body.stats || data.stats;
    await savePortfolioData(data);
    res.json({ success: true, message: 'Stats updated', data: data.stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
