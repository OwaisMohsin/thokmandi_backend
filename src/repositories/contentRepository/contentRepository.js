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

exports.getServiceTerms = async () => {
  return await prisma.termService.findMany();
};

exports.upsertServiceTerms = async (data) => {
  return prisma.termService.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getProductGuidelines = async () => {
  return await prisma.productGuideline.findMany();
};

exports.upsertProductGuidelines = async (data) => {
  return prisma.productGuideline.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};

exports.getPhotographGuidelines = async () => {
  return await prisma.photographGuideline.findMany();
};

exports.upsertPhotographGuidelines = async (data) => {
  return prisma.photographGuideline.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      ...data,
    },
  });
};
