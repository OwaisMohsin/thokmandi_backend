const asyncHandler = require("../../utils/asyncHandler");
const careerService = require("../../services/careerService/careerService");

exports.getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await careerService.fetchAllJobs();
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

exports.getSingleJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const job = await careerService.fetchSingleJob(jobId);
  return res
    .status(200)
    .json({ status: true, message: "Job fetched successfully", data: { job } });
});

exports.createJob = asyncHandler(async (req, res) => {
  const data = req.body;

  const job = await careerService.createJob(data);
  return res
    .status(201)
    .json({ status: true, message: "Job created successfully", data: { job } });
});

exports.updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const data = req.body;

  const job = await careerService.updateSingleJob(jobId, data);
  return res
    .status(200)
    .json({ status: true, message: "Job updated successfully", data: { job } });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  await careerService.deleteSingleJob(jobId);
  return res
    .status(200)
    .json({ status: true, message: "Job deleted successfully" });
});

exports.applyForJob = asyncHandler(async (req, res) => {
  const data = req.body;

  const application = await careerService.applyForVacancy(data);
  return res.status(201).json({
    status: true,
    message: "Applied successfully",
    data: { application },
  });
});

exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await careerService.fetchAllApplications();
  if (applications && applications.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Categories found",
      data: { applications },
    });
  }
  return res
    .status(200)
    .json({
      status: true,
      message: "No Data Found",
      data: { applications: [] },
    });
});
