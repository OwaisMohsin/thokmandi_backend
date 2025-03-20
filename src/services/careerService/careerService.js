const careerRepository = require("../../repositories/careerRepository/careerRepository");
const AppError = require("../../utils/AppError");

exports.fetchAllJobs = async () => {
  try {
    return await careerRepository.getAllJobs();
  } catch (error) {
    throw error;
  }
};

exports.fetchSingleJob = async (id) => {
  try {
    const job = await careerRepository.getJobById(id);
    if (!job) {
      throw new AppError("No job found with provided ID", 404);
    }
    return job;
  } catch (error) {
    throw error;
  }
};

exports.createJob = async (data) => {
  try {
    return await careerRepository.create(data);
  } catch (error) {
    throw error;
  }
};

exports.updateSingleJob = async (id, data) => {
  try {
    return await careerRepository.updateJobById(id, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteSingleJob = async (id) => {
  try {
    const job = await careerRepository.getJobById(id);
    if (!job) {
      throw new AppError("No job found with provided ID", 404);
    }
    return await careerRepository.deleteJobById(id);
  } catch (error) {
    throw error;
  }
};

exports.applyForVacancy = async (data) => {
  const updatedData = {
    ...data,
    job: { connect: { id: Number(data.jobId) } },
  };
  delete updatedData.jobId;

  const job = await careerRepository.getJobById(data.jobId);
  if (!job) {
    throw new AppError("No job found with provided ID", 404);
  }
  return await careerRepository.applyForJob(updatedData);
};

exports.fetchAllApplications = async () => {
  try {
    return await careerRepository.getAllApplications();
  } catch (error) {
    throw error;
  }
};
