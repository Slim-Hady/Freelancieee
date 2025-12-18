import { JobFacade } from '../patterns/facade/JobFacade.js';

const jobFacade = new JobFacade();

export const createJob = async (req, res) => {
  try {
    const { title, description, budget, clientId } = req.body;

    if (!title || !description || !budget || !clientId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const result = await jobFacade.createJob(title, description, budget, clientId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const browseJobs = async (req, res) => {
  try {
    const criteria = {};
    if (req.query.status) criteria.status = req.query.status;
    if (req.query.minBudget) criteria.minBudget = parseFloat(req.query.minBudget);

    const result = await jobFacade.browseJobs(criteria);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.body;

    if (!jobId || !freelancerId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID and Freelancer ID are required'
      });
    }

    const result = await jobFacade.applyToJob(jobId, freelancerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const result = await jobFacade.getJobDetails(jobId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const assignJob = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.body;

    if (!jobId || !freelancerId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID and Freelancer ID are required'
      });
    }

    const result = await jobFacade.assignJobToFreelancer(jobId, freelancerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const completeJob = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.body;

    if (!jobId || !freelancerId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID and Freelancer ID are required'
      });
    }

    const result = await jobFacade.completeJob(jobId, freelancerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
