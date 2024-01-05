import React from "react";
import Navbar from "../features/navbar/Navbar";
import Product from "../features/product/components/Product"

export default function Home() {
  return (
    <div>
      <Navbar>
        <Product></Product>
      </Navbar>
    </div>
  );
}
