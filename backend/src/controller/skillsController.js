const { getPortfolioData, savePortfolioData } = require('../models/portfolioModel');

// GET all skills & resume data
exports.getSkillsData = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({
      success: true,
      skills: data.skills || {},
      educations: data.educations || [],
      certifications: data.certifications || []
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ADD Skill
exports.addSkill = async (req, res) => {
  try {
    const { category, skill } = req.body;
    const data = await getPortfolioData();
    data.skills = data.skills || {};
    data.skills[category] = [...(data.skills[category] || []), skill];
    await savePortfolioData(data);
    res.status(201).json({ success: true, message: 'Skill added', data: data.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE Skill
exports.deleteSkill = async (req, res) => {
  try {
    const { category, index } = req.params;
    const data = await getPortfolioData();
    if (data.skills && data.skills[category]) {
      data.skills[category] = data.skills[category].filter((_, idx) => idx !== Number(index));
      await savePortfolioData(data);
    }
    res.json({ success: true, message: 'Skill deleted', data: data.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE Skill
exports.updateSkill = async (req, res) => {
  try {
    const { category, index } = req.params;
    const updatedSkill = req.body;
    const data = await getPortfolioData();
    if (data.skills && data.skills[category] && data.skills[category][Number(index)] !== undefined) {
      data.skills[category][Number(index)] = { ...data.skills[category][Number(index)], ...updatedSkill };
      await savePortfolioData(data);
    }
    res.json({ success: true, message: 'Skill updated', data: data.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ADD Skill Category (empty category)
exports.addSkillCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category || !category.trim()) return res.status(400).json({ success: false, error: 'Category name required' });
    const data = await getPortfolioData();
    data.skills = data.skills || {};
    if (!data.skills[category.trim()]) {
      data.skills[category.trim()] = [];
      await savePortfolioData(data);
    }
    res.status(201).json({ success: true, message: 'Category added', data: data.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// SAVE ALL Skills (bulk update entire skills object)
exports.saveAllSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills || typeof skills !== 'object') return res.status(400).json({ success: false, error: 'skills object required' });
    const data = await getPortfolioData();
    data.skills = skills;
    await savePortfolioData(data);
    res.json({ success: true, message: 'All skills saved', data: data.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// EDUCATIONS CRUD
exports.addEducation = async (req, res) => {
  try {
    const data = await getPortfolioData();
    const newEdu = { id: Date.now(), ...req.body };
    data.educations = [...(data.educations || []), newEdu];
    await savePortfolioData(data);
    res.status(201).json({ success: true, message: 'Education added', data: newEdu });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.educations = (data.educations || []).map((e) => (e.id === id ? { ...e, ...req.body } : e));
    await savePortfolioData(data);
    res.json({ success: true, message: 'Education updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.educations = (data.educations || []).filter((e) => e.id !== id);
    await savePortfolioData(data);
    res.json({ success: true, message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
