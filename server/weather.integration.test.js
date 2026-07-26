import test from 'node:test';
import assert from 'node:assert';

test('GET /api/weather returns weather data for a valid city', async () => {
  const res = await fetch('http://localhost:8000/api/weather?city=Tel Aviv');
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.ok(data.wind);
  assert.ok(data.main);
  assert.strictEqual(typeof data.main.temp, 'number');
});

test('GET /api/weather returns 404 for an invalid city', async () => {
  const res = await fetch('http://localhost:8000/api/weather?city=asdfghjkl');

  assert.strictEqual(res.status, 404);
});


