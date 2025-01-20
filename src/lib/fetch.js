"use client";
/**
 * GET
https://fakestoreapi.in/api/products
GET
https://fakestoreapi.in/api/products/1
GET
https://fakestoreapi.in/api/products?page=2
GET
https://fakestoreapi.in/api/products?limit=20
GET
https://fakestoreapi.in/api/products/category
GET
https://fakestoreapi.in/api/products/category?type=mobile
GET
https://fakestoreapi.in/api/products/category?type=tv&sort=desc
POST
https://fakestoreapi.in/api/products
PUT
https://fakestoreapi.in/api/products/5
PATCH
https://fakestoreapi.in/api/products/7
DELETE
https://fakestoreapi.in/api/products/3
 */

export const host = "https://fakestoreapi.in/api/products";

export const Fetch = async (route) => {
  var res = await fetch(host + route, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  res = res.json();
  return res;
};
