// createOrder
export function createOrder(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// updateOrder
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// fetchAllOrders
export function fetchAllOrder(sort, pagination) {
  // pagination = {_page:1,_limit=10} // _page=1&_limit=10
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
    // console.log("Sort queryString ", queryString);
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    const totalOrder = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrder } });
  });
}
