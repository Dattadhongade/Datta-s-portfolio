const express = require('express');
const router = express.Router();
const projectsController = require('../controller/projectsController');
const upload = require('../middlewares/uploadMiddleware');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.get('/', projectsController.getProjects);
router.post('/', protectAdmin, projectsController.createProject);
router.put('/:id', protectAdmin, projectsController.updateProject);
router.delete('/:id', protectAdmin, projectsController.deleteProject);
router.post('/upload', protectAdmin, upload.single('image'), projectsController.uploadImage);

module.exports = router;
