'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'fakeImgReview1'
      },
      {
        reviewId: 2,
        url: 'fakeImgReview2'
      },
      {
        reviewId: 3,
        url: 'fakeImgReview3'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3] }
    })
  }
};
