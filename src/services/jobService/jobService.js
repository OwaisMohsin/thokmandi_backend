const jobRepository = require("../../repositories/jobRepository/jobRepository");
const AppError = require("../../utils/AppError");

exports.fetchAllJobs = async () => {
  try {
    return await jobRepository.getAllJobs();
  } catch (error) {
    throw error;
  }
};

exports.createJob = async (data) => {
  try {
    return await jobRepository.create(data);
  } catch (error) {
    throw error;
  }
};

exports.updateSingleJob = async (id, data) => {
  try {
    return await jobRepository.updateJobById(id, data);
  } catch (error) {
    throw error;
  }
};


exports.deleteSingleJob = async (id) => {
    try {
        const job = await jobRepository.getJobById(id);
        if(!job){
            throw new AppError("No job found with provided ID",404);
        }
        return await jobRepository.deleteJobById(id);
    } catch (error) {
        throw error;
    }
}