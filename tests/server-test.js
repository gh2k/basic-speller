var request = require('supertest');

describe('speller API server', function() {
  var server;
  // reload the web server between tests
  beforeEach(function () {
    server = require('../server');
  });
  afterEach(function () {
    server.close();
  });

  // test basic html functionality and that we're serving the correct
  // static files
  it('responds to / with html', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('responds to /speller.css with css', function(done) {
    request(server)
      .get('/speller.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });
  it('responds to /speller.js with javascript', function(done) {
    request(server)
      .get('/speller.js')
      .expect('Content-Type', /javascript/)
      .expect(200, done);
  });
  it('responds 404 to an unknown url', function(done) {
    request(server)
      .get('/blorg')
      .expect(404, done);
  });

  // tests that the spelling API works and returns correct
  // results for spelling errors
  it('responds to /spelling/ with json', function(done) {
    request(server)
      .get('/spelling/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('returns true for a known word', function(done) {
    request(server)
      .get('/spelling/house')
      .expect('Content-Type', /json/)
      .expect(200, {"valid": true}, done);
  });
  it('returns false for an unknown word', function(done) {
    request(server)
      .get('/spelling/bamsplat')
      .expect('Content-Type', /json/)
      .expect(200, {"valid": false}, done);
  });

});
