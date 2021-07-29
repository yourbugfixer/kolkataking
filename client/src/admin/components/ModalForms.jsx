import { useData } from "../../contexts/GetData";
import { adminSchema, passwordSchema, classes } from "./Validation";
import { InputCol, Button } from "../../Components/formComponents";

export function RegisterForm({ id, submit }) {
  const { useForm, Swal, api, yupResolver } = useData();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(adminSchema),
  });

  const onSubmit = (data) => {
    api
      .post("/admin", {
        admin_name: data.admin_name,
        admin_email: data.admin_email,
        admin_password: data.admin_password,
      })
      .then((res) => {
        if (res.data.success === 1) {
          submit(res.data.data);
          document.getElementById("close_button").click();
        }
        Swal.fire({
          position: "top-end",
          text: res.data.message,
          icon: "success",
          showConfirmButton: false,
          toast: true,
          timer: 2000,
        });
      });
  };
  return (
    <div className="modal fade" id={id} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Admin</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="col-sm-8 mx-auto">
                <InputCol
                  ref={register}
                  classes={classes}
                  name="admin_name"
                  label="Name"
                  error={!!errors.admin_name}
                  helperText={errors?.admin_name?.message}
                />

                <InputCol
                  ref={register}
                  classes={classes}
                  name="admin_email"
                  label="Email"
                  error={!!errors.admin_email}
                  helperText={errors?.admin_email?.message}
                />
                <InputCol
                  ref={register}
                  type="password"
                  classes={classes}
                  name="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
                <InputCol
                  ref={register}
                  type="password"
                  classes={classes}
                  name="admin_password"
                  label="Confirm Password"
                  error={!!errors.admin_password}
                  helperText={errors?.admin_password?.message}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                id="close_button"
                className="btn btn-secondary"
                data-dismiss="modal"
                children="Close"
              />
              <Button children="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PasswordForm({ id, email, props }) {
  const { useForm, Swal, api, yupResolver } = useData();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    api
      .patch("/admin", {
        old_password: data.old_password,
        admin_password: data.new_admin_password,
        admin_email: email,
      })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          text: res.data.message,
          icon: "success",
          showConfirmButton: false,
          toast: true,
          timer: 2000,
        }).then(() => {
          if (res.data.success === 1) {
            localStorage.removeItem("user");
            window.location.reload();
          }
        });
      });
  };
  return (
    <div className="modal fade" id={id} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reset Password</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="col-sm-8 mx-auto">
                <InputCol
                  ref={register}
                  type="password"
                  classes={classes}
                  name="old_password"
                  label="Old Password"
                  error={!!errors.old_password}
                  helperText={errors?.old_password?.message}
                />

                <InputCol
                  ref={register}
                  type="password"
                  classes={classes}
                  name="new_password"
                  label="New Password"
                  error={!!errors.new_password}
                  helperText={errors?.new_password?.message}
                />

                <InputCol
                  ref={register}
                  type="password"
                  classes={classes}
                  name="new_admin_password"
                  label="Confirm Password"
                  error={!!errors.new_admin_password}
                  helperText={errors?.new_admin_password?.message}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                children="Close"
              />
              <Button children="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
