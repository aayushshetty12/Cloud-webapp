import dotenv from 'dotenv';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index.js';
import { Buffer } from 'buffer';

dotenv.config();
const request = supertest(app);

function encodeBasicAuth(username, password) {
  return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
}

describe('User Endpoint Integration Tests', () => {
  const testUsername = 'ann.doe@example.com';
  const testPassword = 'skdjfhskdfjhg';
  const newTestPassword = 'qwertyiou';

  it('Test 1 - Create an account and get it', async () => {
    try{
    const authHeader = encodeBasicAuth(testUsername, testPassword);

    await request.post('/v1/user').send({
      first_name: 'Jan',
      last_name: 'Doe',
      username: testUsername,
      password: testPassword,
    });

    const getResponse = await request.get('/v1/user/self').set('Authorization', authHeader);
    const responseBody = JSON.parse(getResponse.text);

    console.log(responseBody)

    expect(getResponse.statusCode).to.equal(200);
    expect(responseBody.username).to.equal(testUsername);
  }
  catch (error) {
        console.error('Test 1 failed:', error.message);
        process.exit(1);
        }
  });

  it('Test 2 - Update the account and get it', async () => {
    try{
    const authHeader = encodeBasicAuth(testUsername, testPassword);
    const updatePayload = {
      first_name: 'Jannie',
      last_name: 'Doey',
      password: newTestPassword,
    };

    const updateResponse = await request.put('/v1/user/self')
      .send(updatePayload)
      .set('Authorization', authHeader);

    expect(updateResponse.statusCode).to.satisfy((code) => code >= 200 && code < 300, 'Update failed');

    const newAuthHeader = encodeBasicAuth(testUsername, newTestPassword);
    const getResponse = await request.get('/v1/user/self').set('Authorization', newAuthHeader);

    expect(getResponse.statusCode).to.equal(200);

    const responseBody = JSON.parse(getResponse.text);

    console.log(responseBody)
  }
  catch (error) {
        console.error('Test 2 failed:', error.message);
        process.exit(1);
        }
  });

  after(() => {
    process.exit(0); 
  });
});