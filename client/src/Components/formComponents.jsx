import React, { forwardRef } from "react";
import { jsonToArray } from "./Utility";

export const Label = ({ label, cName, ...rest }) => {
  return (
    <label {...rest} {...(cName ? { className: cName } : {})}>
      {label}
    </label>
  );
};
export const Input = forwardRef(({ name, cName, ...rest }, ref) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      ref={ref}
      {...rest}
      className={`form-control${cName ? " " + cName : ""}`}
    />
  );
});

export const InputCol = forwardRef(
  ({ label, name, error, helperText, classes, cname, ...rest }, ref) => {
    const { input: IP, title, error: message } = { ...classes };
    return (
      <div className={`form-group${cname ? " " + cname : ""}`}>
        <Label
          htmlFor={name}
          label={label}
          cName={`form-label${title ? " " + title : ""}`}
        />

        <Input name={name} id={name} ref={ref} {...rest} cName={IP} />

        {error && (
          <span {...(message ? { className: message } : {})}>{helperText}</span>
        )}
      </div>
    );
  }
);

export const InputRow = forwardRef(
  ({ label, name, error, helperText, classes, cName, ...rest }, ref) => {
    const { input: IP, title, error: message } = { ...classes };

    return (
      <div className={`form-group row${cName ? " " + cName : ""}`}>
        <Label
          htmlFor={name}
          label={label}
          cName={`col-sm-3 col-form-label${title ? " " + title : ""}`}
        />
        <div className="col-sm-9">
          <Input name={name} id={name} ref={ref} {...rest} cName={IP} />

          {error && (
            <span {...(message ? { className: message } : {})}>
              {helperText}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export const DropDown = forwardRef(
  ({ name, option, cName, data, ...rest }, ref) => {
    const result = jsonToArray(option);

    return (
      <select
        name={name}
        id={name}
        className={`form-control${cName ? " " + cName : ""}`}
        ref={ref}
        data={data}
        {...rest}
      >
        <option value="">--Select--</option>
        {result &&
          result.map((item) =>
            Array.isArray(item) ? (
              <option
                key={item[0]}
                value={item[0]}
                selected={data && data === item[0] ? true : false}
              >
                {item[2]}
              </option>
            ) : (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
      </select>
    );
  }
);

export const DropDownRow = forwardRef(
  (
    { label, name, error, helperText, classes, cName, option, ...rest },
    ref
  ) => {
    const { input: IP, title, error: message } = { ...classes };
    return (
      <div className={`form-group row${cName ? " " + cName : ""}`}>
        <Label
          htmlFor={name}
          label={label}
          cName={`col-sm-3 col-form-label${title ? " " + title : ""}`}
        />
        <div className="col">
          <DropDown
            name={name}
            ref={ref}
            option={option}
            cName={IP}
            {...rest}
          />

          {error && (
            <span {...(message ? { className: message } : {})}>
              {helperText}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export const Button = (props) => {
  return (
    <div className={`form-group${props.cname ? " " + props.cname : ""}`}>
      <button {...props}>{props.children}</button>
    </div>
  );
};

export const Checkbox = forwardRef(({ name, ...rest }, ref) => {
  return (
    <div className="form-group form-check">
      <input type="checkbox" id={name} name={name} ref={ref} {...rest} />
    </div>
  );
});

export const RadioButton = ({ id, name, value, label, ...rest }) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="mr-2"
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};
