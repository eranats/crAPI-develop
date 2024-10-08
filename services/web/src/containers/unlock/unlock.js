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

import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Unlock from "../../components/unlock/unlock";
import { unlockUserAction } from "../../actions/userActions";
import responseTypes from "../../constants/responseTypes";
import { useNavigate } from "react-router-dom";

const UnlockContainer = (props) => {
  const navigate = useNavigate();
  const { unlockUser } = props;

  const [hasErrored, setHasErrored] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const callback = (res, data) => {
    if (res === responseTypes.SUCCESS) {
      navigate("/dashboard");
    } else {
      setHasErrored(true);
      setErrorMessage(data);
    }
  };

  const onFinish = (values) => {
    unlockUser({ ...values, callback });
  };

  return (
    <Unlock
      email={props.email}
      message={props.message}
      code={props.code}
      hasErrored={hasErrored}
      errorMessage={errorMessage}
      onFinish={onFinish}
    />
  );
};
const mapStateToProps = ({ userReducer: { email, message } }) => {
  return { email, message };
};

const mapDispatchToProps = {
  unlockUser: unlockUserAction,
};

UnlockContainer.propTypes = {
  unlockUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnlockContainer);
