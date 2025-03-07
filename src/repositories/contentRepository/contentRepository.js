const prisma = require("../../config/db");

exports.getFinancialTerms = async () => {
  return await prisma.finTerm.findMany();
};

exports.upsertFinancialTerms = async (data) => {
  return prisma.finTerm.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getVendorTerms = async () => {
  return await prisma.vendorTerm.findMany();
};

exports.upsertVendorTerms = async (data) => {
  return prisma.vendorTerm.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getBuyerTerms = async () => {
  return await prisma.buyerTerm.findMany();
};

exports.upsertBuyerTerms = async (data) => {
  return prisma.buyerTerm.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getPrivacyPolicy = async () => {
  return await prisma.privayPolicy.findMany();
};

exports.upsertPrivacyPolicy = async (data) => {
  return prisma.privayPolicy.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getRefundPolicy = async () => {
  return await prisma.refundPolicy.findMany();
};

exports.upsertRefundPolicy = async (data) => {
  return prisma.refundPolicy.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};
