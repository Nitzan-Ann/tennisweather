import test from 'node:test';
import assert from 'node:assert';
import { decideCourtType } from './decision.js';
//מייבא את הפונקציה עצמה שרוצים לבדוק, מהקובץ decision.js.


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
  // ריזולט הוא בדיוק האובייקט הזה שהפונקציה החזירה
  assert.strictEqual(result.recommendation, "indoor");
  //בודק ספציפית את השדה recommendation בתוך האובייקט הזה - לא את כל האובייקט, רק את החלק הזה ממנו
});

test('recommends outdoor when conditions are good', () => {
  const weather = { wind: { speed: 5 }, weather: [{ main: "Clear" }], main: { temp: 22, humidity: 50 } };
  const result = decideCourtType(weather);
  assert.strictEqual(result.recommendation, "outdoor");
});