const { getPortfolioData, savePortfolioData, saveContactMessage } = require('../models/portfolioModel');

// SEND contact inquiry
exports.sendContact = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, description } = req.body;
    if (!firstName || !email || !description) {
      return res.status(400).json({ success: false, error: 'First name, email, and description are required' });
    }

    const data = await getPortfolioData();
    const newMessage = {
      id: Date.now(),
      firstName,
      lastName: lastName || '',
      mobileNumber: mobileNumber || '',
      email,
      subject: `Inquiry from ${firstName} ${lastName || ''}`.trim(),
      description,
      time: 'Just now',
      unread: true
    };

    data.messages = [newMessage, ...(data.messages || [])];
    await savePortfolioData(data);
    await saveContactMessage(newMessage);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET messages
exports.getMessages = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({ success: true, data: data.messages || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// MARK as read
exports.markAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.messages = (data.messages || []).map((m) => (m.id === id ? { ...m, unread: false } : m));
    await savePortfolioData(data);
    res.json({ success: true, message: 'Message marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE message
exports.deleteMessage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.messages = (data.messages || []).filter((m) => m.id !== id);
    await savePortfolioData(data);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
