const { getPortfolioData, savePortfolioData } = require('../config/db');

// GET all experiences
exports.getExperiences = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({ success: true, data: data.experiences || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ADD organization
exports.addExperience = async (req, res) => {
  try {
    const data = await getPortfolioData();
    const newExp = {
      id: Date.now(),
      badge: 'Current Employer',
      roles: [],
      ...req.body
    };
    data.experiences = [newExp, ...(data.experiences || [])];
    await savePortfolioData(data);
    res.status(201).json({ success: true, message: 'Experience added', data: newExp });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE organization
exports.deleteExperience = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.experiences = (data.experiences || []).filter((e) => e.id !== id);
    await savePortfolioData(data);
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
