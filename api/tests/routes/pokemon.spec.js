/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  height: 10,
  weight: 10,
  speed: 25,
  hp:30,
  attack: 50,
  defense:22
};

describe('Pokemon routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon))
  );

  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons')
      .expect(200)
    );

    it()
  });
});
