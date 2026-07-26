import test from 'node:test';
import assert from 'node:assert';

test('GET /api/recommendation returns valid data ', async () => {
  const res = await fetch('http://localhost:8000/api/recommendation?city=Tel Aviv&windThreshold=25&humidityThreshold=85&minTemp=5&maxTemp=35');
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.ok(data.decision.recommendation);
  assert.ok(data.decision.reason);
  assert.ok(Array.isArray(data.courts));
});

test('GET /api/recommendation returns 404 for an invalid city', async () => {
  const res = await fetch('http://localhost:8000/api/recommendation?city=asdfghjkl&windThreshold=25&humidityThreshold=85&minTemp=5&maxTemp=35');

  assert.strictEqual(res.status, 404);
});
