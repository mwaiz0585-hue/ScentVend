export function generateCode() {
  const number = Math.floor(100000 + Math.random() * 900000);
  return `PV-${number}`;
}