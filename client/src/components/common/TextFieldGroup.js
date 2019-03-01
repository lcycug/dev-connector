import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export default function TextFieldGroup({
  type,
  name,
  error,
  placeholder,
  onChange,
  value,
  info
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        autoComplete="new-password" //'off' not work for Chrome
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  info: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};
