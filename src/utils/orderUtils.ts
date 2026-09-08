export function generateOrderNumber() {
  return "PCK-" + Math.floor(100000 + Math.random() * 900000).toString();
}
