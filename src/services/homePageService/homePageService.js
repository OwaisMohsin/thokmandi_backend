const homePageRepository = require('../../repositories/homePageRepository/homePageRepository');

exports.getContent = async () => {
    try {
        const {categories,faqs} = await homePageRepository.getHomePageContent();
        return {categories,faqs}
    } catch (error) {
        throw error;
    }
}