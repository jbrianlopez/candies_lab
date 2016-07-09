/* globals describe it before */
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an array', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body).to.be.an('array');
        done();
      });
  });
  it('should return all the records in the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body.length).to.equal(4);
        done();
  })
});

// trying to do get IDs
describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('should return an object that has a field called "name" and "color"', (done) => {
      api.get('/candies/1')
        .set('Accept', 'application/json')
        .end((error, response) => {
          expect(error).to.be.a('null');
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('color');
          done();
        });
    });
  })

  // ATTEMPT AT POST

describe('POST /candies', () => {

  it('should return a 200 response', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'name': 'cheese',
        'color': 'gold'
      })
      .expect(200, done);
    });

  it('should add a new candy to the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .send({
        'name': 'honkhonk',
        'color': 'white'
      })
      .end((error, response) => {
        expect(error).to.be.a('null');
        // expect(response.body.length).to.equal.(5);
        expect(response.body[response.body.length - 1].name).to.equal('cheese');
        done();
      });
  });

    it('should return a 422 response if the field color is wrong', (done) => {
      api.post('/candies')
        .set('Accept', 'application/json')
        .send({
          'name': 'thesix',
          'color': 'haha'
        }).expect(422, done);
    });

    it('should return an error message if the color field is wrong', (done) => {
      api.post('/candies')
        .set('Accept', 'application/json')
        .send({
          'name': 'googoo',
          'color': 'haha'
        })
        .end((error, response) => {
          // expect(error).to.not.be.a('null');
          //console.log(response.body)
          expect(response.body.message).to.equal('Wrong color')
          done();
        })
    });

});//close describe

// ATTEMPT AT PUT
describe('PUT /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/2')
      .set('Accept', 'application/json')
      .expect(200, done);
    });
  it('should update a candy document', (done) => {
    api.put('/candies/2')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.message).to.equal('updated')
      done();
    })
})
})
// Attempt at delete
describe('DELETE /candies/:id', () => {
  it('should remove a candy document', (done) => {
    api.delete('/candies/3')
    .end((error, response) => {
      expect(error).to.be.a('null');
      console.log(response.body.message)
      expect(response.body.message).to.equal('deleted')
      done();
    })
})
})
})
