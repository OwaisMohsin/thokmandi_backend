const prisma = require("../../config/db");

exports.getHomePageContent = async () => {
  const [categories,faqs] = await prisma.$transaction([
    prisma.category.findMany({
      where: {
        parentId: null, // Get only main categories
      },
      include: {
        subcategories: {
          include: {
            subcategories: true,
          },
        },
      },
    }),
    prisma.faq.findMany(),
  ]);

  return { categories ,faqs};
};
