import React from "react";
import { useSelector } from "react-redux";

export default function LoggedLink({ link, title }) {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const userType = useSelector((state) => state.auth.userType);
  return (
    <a href={isAuth && userType ? `/${userType}/interni/prehled` : link}>
      {title}
    </a>
  );
}
