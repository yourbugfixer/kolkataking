import { api } from "../Components/Utility";

export const authLogin = (username, password) => {
  return api
    .post("/admin/login", {
      admin_email: username,
      admin_password: password,
    })
    .then((res) => {
      if (res.data.success === 1) {
        const adminData = {
          token: res.data.token,
          admin_email: res.data.admin_email,
          admin_name: res.data.admin_name,
        };
        localStorage.setItem("user", JSON.stringify(adminData));
      }
      return res.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
