'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'fakeImgSpot1',
        preview: true
      },
      {
        spotId: 2,
        url: 'fakeImgSpot2',
        preview: false
      },
      {
        spotId: 3,
        url: 'fakeImgSpot3',
        preview: true
      },
      {
        spotId: 4,
        url: 'fakeImgSpot4',
        preview: false
      },
      {
        spotId: 5,
        url: 'fakeImgSpot5',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5]}
    }, {})
  }
};
