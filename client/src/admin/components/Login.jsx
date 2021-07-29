import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { authLogin } from "../../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputCol, Button } from "../../Components/formComponents";
import { loginSchema, classes } from "./Validation";

function Login(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    authLogin(data.admin_email, data.admin_password).then((res) => {
      if (res.success === 1) {
        props.history.push("/admin");
      } else {
        Swal.fire({
          title: "Error",
          text: res.message,
          icon: "error",
          showCancelButton: false,
        });
      }
    });
  };

  return (
    <div className="auth-wrapper d-flex justify content-center flex-row align-items-center">
      <div className="col-sm-4">
        <div className="auth-inner">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign In</h3>

            <InputCol
              ref={register}
              type="email"
              name="admin_email"
              placeholder="Enter email"
              classes={classes}
              label="Email address"
              error={!!errors.admin_email}
              helperText={errors?.admin_email?.message}
            />

            <InputCol
              ref={register}
              type="password"
              name="admin_password"
              placeholder="Enter password"
              classes={classes}
              label="Password"
              error={!!errors.admin_password}
              helperText={errors?.admin_password?.message}
            />

            {/* <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div> */}

            <Button className="btn btn-primary btn-block" cname="pt-4">
              Submit
            </Button>

            <p className="forgot-password text-right">
              <Link to="/">Back to Home</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
