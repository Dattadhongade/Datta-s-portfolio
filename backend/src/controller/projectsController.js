const { getPortfolioData, savePortfolioData } = require('../models/portfolioModel');

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({
      success: true,
      data: data.projects || [],
      categories: data.projectCategories || ["All", "Full Stack", "AI / SaaS", "Frontend"]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE new project
exports.createProject = async (req, res) => {
  try {
    const data = await getPortfolioData();
    const newProject = {
      id: Date.now(),
      status: 'Published',
      tags: [],
      highlights: [],
      ...req.body
    };
    data.projects = [newProject, ...(data.projects || [])];
    await savePortfolioData(data);
    res.status(201).json({ success: true, message: 'Project created', data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.projects = (data.projects || []).map((p) => (p.id === id ? { ...p, ...req.body } : p));
    await savePortfolioData(data);
    res.json({ success: true, message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.projects = (data.projects || []).filter((p) => p.id !== id);
    await savePortfolioData(data);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPLOAD project image
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  const host = req.get('host');
  const protocol = req.protocol;
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: fileUrl
  });
};
