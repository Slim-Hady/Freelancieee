import express from 'express';
import { 
  createJob, 
  browseJobs, 
  applyToJob, 
  getJobDetails,
  assignJob,
  completeJob 
} from '../controllers/jobController.js';

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', browseJobs);
router.get('/jobs/:jobId', getJobDetails);
router.post('/jobs/apply', applyToJob);
router.post('/jobs/assign', assignJob);
router.post('/jobs/complete', completeJob);

export default router;
