const express = require('express');
const router = express.Router();
const projectsController = require('../controller/projectsController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', projectsController.getProjects);
router.post('/', projectsController.createProject);
router.put('/:id', projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);
router.post('/upload', upload.single('image'), projectsController.uploadImage);

module.exports = router;
