import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export default function TextFieldGroup({
  group, // used for distinguish `input`, `select`, and `textarea`
  type,
  name,
  error,
  placeholder,
  onChange,
  value,
  info,
  options,
  required,
  icon
}) {
  let selectOptions;
  if (group === "select") {
    selectOptions = (
      <>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </>
    );
  }
  return (
    <>
      {group === "icon-input" ? (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className={icon} />
            </span>
          </div>
          <input
            type={type}
            className="form-control form-control-lg"
            placeholder={placeholder}
            name={name}
            onChange={onChange}
          />
        </div>
      ) : group === "select" ? (
        <div className="form-group">
          {required ? <i className="required fas fa-asterisk" /> : null}
          <select
            className={classnames("form-control form-control-lg", {
              "is-invalid": error
            })}
            name="status"
            value={value}
            onChange={onChange}
          >
            {selectOptions}
          </select>
          {info && <small className="form-text text-muted">{info}</small>}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      ) : group === "textarea" ? (
        <>
          <textarea
            placeholder={placeholder}
            className={classnames("form-control form-control-lg", {
              "is-invalid": error
            })}
            name={name}
            value={value}
            onChange={onChange}
          />
          {info && <small className="form-text text-muted">{info}</small>}
          {error && <div className="invalid-feedback">{error}</div>}
        </>
      ) : (
        <div className="form-group">
          {/* Input */}
          {required ? <i className="required fas fa-asterisk" /> : null}
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
      )}
    </>
  );
}

TextFieldGroup.propTypes = {
  group: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  info: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.string,
  type: PropTypes.string
};

TextFieldGroup.defaultProps = {
  group: "input",
  type: "text"
};
