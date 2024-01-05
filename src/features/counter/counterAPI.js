export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000");
    const data = response.json();
    resolve({ data });
  });
}
