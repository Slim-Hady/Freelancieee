import Job from '../../models/Job.js';
import User from '../../models/User.js';

// Subsystem for posting jobs
class JobPoster {
  async postJob(jobData) {
    const job = new Job(jobData);
    await job.save();
    return job;
  }
}

// Subsystem for browsing jobs
class JobBrowser {
  async getAllJobs() {
    return await Job.find().populate('clientId', 'name email');
  }

  async getJobById(jobId) {
    return await Job.findById(jobId).populate('clientId', 'name email');
  }

  async searchJobs(criteria) {
    const query = {};
    if (criteria.status) query.status = criteria.status;
    if (criteria.minBudget) query.budget = { $gte: criteria.minBudget };
    return await Job.find(query).populate('clientId', 'name email');
  }
}

// Subsystem for applying to jobs
class JobApplicator {
  async applyToJob(jobId, freelancerId) {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    // Check if already applied
    const alreadyApplied = job.applicants.some(
      app => app.freelancerId.toString() === freelancerId.toString()
    );

    if (alreadyApplied) {
      throw new Error('Already applied to this job');
    }

    job.applicants.push({ freelancerId });
    await job.save();
    return job;
  }

  async getApplicants(jobId) {
    const job = await Job.findById(jobId).populate('applicants.freelancerId', 'name email');
    return job ? job.applicants : [];
  }
}

// Subsystem for approving work
class WorkApprover {
  async approveWork(jobId, freelancerId) {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    job.status = 'completed';
    job.assignedTo = freelancerId;
    await job.save();
    return job;
  }

  async assignJob(jobId, freelancerId) {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    job.assignedTo = freelancerId;
    job.status = 'in-progress';
    await job.save();
    return job;
  }
}

// Facade class that coordinates all subsystems
class JobFacade {
  constructor() {
    this.jobPoster = new JobPoster();
    this.jobBrowser = new JobBrowser();
    this.jobApplicator = new JobApplicator();
    this.workApprover = new WorkApprover();
  }

  // Simplified method to create a job
  async createJob(title, description, budget, clientId) {
    const jobData = { title, description, budget, clientId };
    const job = await this.jobPoster.postJob(jobData);
    return {
      success: true,
      message: 'Job created successfully',
      job
    };
  }

  // Simplified method to browse jobs
  async browseJobs(criteria = {}) {
    let jobs;
    if (criteria && Object.keys(criteria).length > 0) {
      jobs = await this.jobBrowser.searchJobs(criteria);
    } else {
      jobs = await this.jobBrowser.getAllJobs();
    }
    return {
      success: true,
      jobs
    };
  }

  // Simplified method to apply to a job
  async applyToJob(jobId, freelancerId) {
    const job = await this.jobApplicator.applyToJob(jobId, freelancerId);
    return {
      success: true,
      message: 'Application submitted successfully',
      job
    };
  }

  // Simplified notification method (delegates to notification system)
  async notify(userId, message, notificationType = 'email') {
    // This will be connected to the Strategy pattern
    return {
      success: true,
      message: 'Notification sent',
      details: { userId, message, notificationType }
    };
  }

  // Additional helper methods
  async getJobDetails(jobId) {
    const job = await this.jobBrowser.getJobById(jobId);
    return {
      success: true,
      job
    };
  }

  async assignJobToFreelancer(jobId, freelancerId) {
    const job = await this.workApprover.assignJob(jobId, freelancerId);
    return {
      success: true,
      message: 'Job assigned successfully',
      job
    };
  }

  async completeJob(jobId, freelancerId) {
    const job = await this.workApprover.approveWork(jobId, freelancerId);
    return {
      success: true,
      message: 'Job completed successfully',
      job
    };
  }
}

export { JobFacade, JobPoster, JobBrowser, JobApplicator, WorkApprover };
