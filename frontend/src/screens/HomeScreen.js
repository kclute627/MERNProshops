import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from '../Components/Message';
import Loader from '../Components/Loader'

import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message varient='danger' children={error}/>
      ) : (
        <Row>
          {products.map((product, i) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
