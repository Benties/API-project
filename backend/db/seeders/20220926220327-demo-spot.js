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
      {
        ownerId: 5,
        address: '42nd Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 38.23423,
        lng: -70.14214,
        name: 'Times Square Building',
        description: 'Located in Times Square',
        price: 1210
      },
      {
        ownerId: 5,
        address: '229 Spring Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 38.5122,
        lng: -70.124124,
        name: 'Manhattan Skyline',
        description: 'Located in Downtown Manhattan',
        price: 1450
      },
      {
        ownerId: 5,
        address: '300 Spring Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 35.5122,
        lng: -71.124,
        name: 'Freedom Towers',
        description: 'Located in Downtown Manhattan',
        price: 2050
      },
      {
        ownerId: 5,
        address: '229 Apple Street',
        city: 'Brooklyn',
        state: 'NY',
        country: 'USA',
        lat: 38.5122,
        lng: -70.124124,
        name: 'Brooklyn Hangers',
        description: 'Located in Downtown Brooklyn',
        price: 1650
      },
      {
        ownerId: 5,
        address: '57 Maple Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 48.5122,
        lng: -52.124124,
        name: 'Tree Towers',
        description: 'Located in Downtown Manhattan',
        price: 1950
      },
      {
        ownerId: 5,
        address: '19 Broad Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 38.5122,
        lng: -70.124124,
        name: 'ChinaTown Square',
        description: 'Located in Chinatown',
        price: 2450
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
