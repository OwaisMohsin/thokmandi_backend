const asyncHandler = require("../../utils/asyncHandler");
const jobService = require("../../services/jobService/jobService");

exports.getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.fetchAllJobs();
  if (jobs && jobs.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Jobs fetch successfully",
      data: { jobs },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No jobs found",
    data: { jobs: [] },
  });
});

exports.createJob = asyncHandler(async (req, res) => {
  const data = req.body;

  const job = await jobService.createJob(data);
  return res
    .status(201)
    .json({ status: true, message: "Job created successfully", data: { job } });
});

exports.updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const data = req.body;

  const job = await jobService.updateSingleJob(jobId, data);
  return res
    .status(200)
    .json({ status: true, message: "Job updated successfully", data: { job } });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  await jobService.deleteSingleJob(jobId);
  return res
    .status(200)
    .json({ status: true, message: "Job deleted successfully" });
});
