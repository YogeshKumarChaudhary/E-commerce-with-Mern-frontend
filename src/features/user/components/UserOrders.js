import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export default function UserOrders() {
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  return <div>{orders && orders.map((item) => <div key={item.id}>{item.id}</div>)}</div>;
}
