/*
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "antd";
import {
  getProductsAction,
  buyProductAction,
  applyCouponAction,
} from "../../actions/shopActions";
import Shop from "../../components/shop/shop";
import { useNavigate } from "react-router-dom";
import responseTypes from "../../constants/responseTypes";
import { FAILURE_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages";

const ShopContainer = (props) => {
  const { accessToken, getProducts, buyProduct } = props;
  const navigate = useNavigate();

  const [hasErrored, setHasErrored] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isCouponFormOpen, setIsCouponFormOpen] = useState(false);

  useEffect(() => {
    const callback = (res, data) => {
      if (res !== responseTypes.SUCCESS) {
        Modal.error({
          title: FAILURE_MESSAGE,
          content: data,
        });
      }
    };
    getProducts({ callback, accessToken });
  }, [accessToken, getProducts]);

  const handleBuyProduct = (product) => {
    const callback = (res, data) => {
      if (res === responseTypes.SUCCESS) {
        Modal.success({
          title: SUCCESS_MESSAGE,
          content: data,
          onOk: () => navigate("/past-orders"),
        });
      } else {
        Modal.error({
          title: FAILURE_MESSAGE,
          content: data,
        });
      }
    };
    buyProduct({ callback, accessToken, productId: product.id });
  };

  const handleOffsetChange = (offset) => {
    const callback = (res, data) => {
      if (res !== responseTypes.SUCCESS) {
        Modal.error({
          title: FAILURE_MESSAGE,
          content: data,
        });
      }
    };
    getProducts({ callback, accessToken, offset });
  };

  const handleFormFinish = (values) => {
    const callback = (res, data) => {
      if (res === responseTypes.SUCCESS) {
        setIsCouponFormOpen(false);
        Modal.success({
          title: SUCCESS_MESSAGE,
          content: data,
        });
      } else {
        setHasErrored(true);
        setErrorMessage(data);
      }
    };
    props.applyCoupon({
      callback,
      accessToken,
      ...values,
    });
  };

  return (
    <Shop
      onBuyProduct={handleBuyProduct}
      isCouponFormOpen={isCouponFormOpen}
      setIsCouponFormOpen={setIsCouponFormOpen}
      hasErrored={hasErrored}
      errorMessage={errorMessage}
      onFinish={handleFormFinish}
      onOffsetChange={handleOffsetChange}
      {...props}
    />
  );
};

const mapStateToProps = ({
  userReducer: { accessToken, prevOffset, nextOffset },
}) => {
  return { accessToken, prevOffset, nextOffset };
};

const mapDispatchToProps = {
  getProducts: getProductsAction,
  buyProduct: buyProductAction,
  applyCoupon: applyCouponAction,
};

ShopContainer.propTypes = {
  accessToken: PropTypes.string,
  getProducts: PropTypes.func,
  buyProduct: PropTypes.func,
  applyCoupon: PropTypes.func,
  nextOffset: PropTypes.number,
  prevOffset: PropTypes.number,
  onOffsetChange: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer);
