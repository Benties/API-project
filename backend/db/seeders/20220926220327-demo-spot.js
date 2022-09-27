'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '90 5th Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy Hq',
        description: 'Place where web developers are created',
        price: 1200
      },
      {
        ownerId: 2,
        address: '501 Athol Avenue',
        city: 'Baltimore',
        state: 'Maryland',
        country: 'USA',
        lat: 39.289444,
        lng: -76.615278,
        name: 'Omars Spot',
        description: 'Come at your own risk',
        price: 95
      },
      {
        ownerId: 3,
        address: '60 Water St Apartments',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 40.289444,
        lng: -74.14786,
        name: 'Dumbo Condos',
        description: 'Beautiful views placed right next to the Brooklyn Bridge',
        price: 700
      },
      {
        ownerId: 4,
        address: '15 Hudson Yards',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 41.289444,
        lng: -72.14786,
        name: 'Vessel Condos',
        description: 'Luxury condo in Hundson Yards',
        price: 1000
      },
      {
        ownerId: 5,
        address: '225 Cherry Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 38.289444,
        lng: -70.14786,
        name: 'One Manhattan Square',
        description: 'Located in Downtown Manhattan waterfront',
        price: 800
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Spots',{
      ownerId: { [Op.in]: [1,2,3,4,5] }
    }, {})
  }
};
