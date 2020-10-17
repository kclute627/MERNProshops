import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import {
  Image,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { listProductDetials } from "../actions/productActions";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetials(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const productDetials = useSelector((state) => state.productDetials);
  const { loading, error, product } = productDetials;
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        {" "}
        Go Back{" "}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' children={error} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup varient='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}{" "}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    {product.countInStock > 0 ? (
                      <Button className='btn-block' type='button' onClick={addToCartHandler}  
                      >
                        {" "}
                        Add To Cart
                      </Button>
                    ) : (
                      <Button disabled className='btn-block' type='button'>
                        {" "}
                        Add To Cart
                      </Button>
                    )}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}{" "}
      :
    </>
  );
};

export default ProductScreen;
