export function log(level, message) {
  const entry = { timestamp: new Date().toISOString(), level, message };
  console.log(JSON.stringify(entry));
}

