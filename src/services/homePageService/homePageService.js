const homePageRepository = require('../../repositories/homePageRepository/homePageRepository');

exports.getContent = async () => {
    try {
        const {categories} = await homePageRepository.getHomePageContent();
        return {categories}
    } catch (error) {
        throw error;
    }
}