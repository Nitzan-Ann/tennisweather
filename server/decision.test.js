import test from 'node:test';
import assert from 'node:assert';
import { decideCourtType } from './decision.js';



test('recommends indoor when raining', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Rain" }], main: { temp: 20, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "indoor");
});

test('recommends indoor when wind exceeds threshold', () => {
  const weather = { wind: { speed: 30 }, weather: [{ main: "Clear" }], main: { temp: 20, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "indoor");
});

test('recommends indoor when humidity too high', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Clear" }], main: { temp: 22, humidity: 90 } };
  const result = decideCourtType(weather);

  assert.strictEqual(result.recommendation, "indoor");

});

test('recommends outdoor when conditions are good', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Clear" }], main: { temp: 22, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "outdoor");
});

test('recommends indoor when temperature is below minTemp', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Clear" }], main: { temp: 2, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "indoor");
});

test('recommends indoor when temperature is above maxTemp', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Clear" }], main: { temp: 40, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "indoor");
});


