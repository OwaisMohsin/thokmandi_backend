const prisma = require("../../config/db");

exports.getAllJobs = async () => {
  return await prisma.job.findMany();
};

exports.create = async (data) => {
  return await prisma.job.create({
    data,
  });
};

exports.getJobById = async (id) => {
  return await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.updateJobById = async (id, data) => {
  return await prisma.job.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteJobById = async (id) => {
  return await prisma.job.delete({
    where: {
      id: Number(id),
    },
  });
};
