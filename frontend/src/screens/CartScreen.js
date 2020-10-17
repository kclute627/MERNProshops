import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { addToCart } from "../actions/cartAction";
import Message from "../Components/Message";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  console.log(productId, "ProductID");

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
};

export default CartScreen;
