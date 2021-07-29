import * as yup from "yup";

export const classes = {
  error: "ml-3 text-danger",
};

export const loginSchema = yup.object().shape({
  admin_email: yup.string().required("Username required !!"),
  admin_password: yup.string().required("Password required !!"),
});

export const resultSchema = yup.object().shape({
  result_date: yup.string().required("Required !!"),
  schedule_id: yup.string().ensure().required("Time required !!"),
  patti_no: yup.string().matches(/^(\s*|\d+)$/, "Only numbers allowed !!"),
  patti_value: yup.string().matches(/^(\s*|\d+)$/, "Only numbers allowed !!"),
});

export const scheduleSchema = yup.object().shape({
  result_time: yup.string().required("Time required !!"),
});

export const tipsSchema = yup.object().shape({
  schedule_id: yup.string().ensure().required("Time required !!"),
  tip: yup
    .string()
    .required("Required !!")
    .matches(/^[0-9,*-;]+$/, "Only numbers seperated by (,) allowed"),
});

export const oldresultSchema = yup.object().shape({
  result_date: yup.string().required("Required !!"),
});

export const adminSchema = yup.object().shape({
  admin_name: yup.string().required("Required !!"),
  admin_email: yup
    .string()
    .email("Enter valid email !!")
    .required("Required !!"),
  password: yup.string().required("Required !!"),
  admin_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match !!"),
});

export const passwordSchema = yup.object().shape({
  old_password: yup.string().required("Required !!"),
  new_password: yup.string().required("Required !!"),
  new_admin_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match !!"),
});
