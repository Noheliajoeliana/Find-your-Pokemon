const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({
          height:10
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Pokemon.create({})
          .then(()=>done('It should have created'))
          .catch(()=>done());
      });
    });

    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Pokemon.create({
          name: 'Pikachu'
        })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });

      // it('should work when its a valid Height', () => {
      //   Pokemon.create({ name: 'Pikachu' });
      // });
    });
  });
});
