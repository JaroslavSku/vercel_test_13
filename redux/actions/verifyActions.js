import axios from "axios";

export const verifyUser = (values) => {
  axios
    .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/verify-user`, values)
    .catch((err) => {
      console.log(err);
    });
};
