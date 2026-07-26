import test from 'node:test';
import assert from 'node:assert';

test('GET /api/courts returns an array of courts', async () => {
  const res = await fetch('http://localhost:8000/api/courts');
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(data));
  assert.ok(data.length > 0);
});

test('GET /api/courts filtered by city returns only that city', async () => {
  const res = await fetch('http://localhost:8000/api/courts?city=Tel Aviv');
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  data.forEach(court => {
    assert.strictEqual(court.city, 'Tel Aviv');
  });
});

