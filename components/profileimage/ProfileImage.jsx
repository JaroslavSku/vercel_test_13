/* eslint-disable @next/next/no-img-element */
import { iconsUrl, peopleIconsUrl } from "@/utils/urls";
import React, { useEffect, useState } from "react";

export default function ProfileImage({ divCss, imgCss, url, timeStamp }) {
  function handleError(e) {
    e.target.src = `${peopleIconsUrl}/avatar-person.svg`;
  }
  console.log(`${process.env.NEXT_PUBLIC_REACT_BE_API}/${url}?${timeStamp}`);
  return (
    <div className={divCss}>
      <img
        className={imgCss}
        alt="profile image"
        onError={handleError}
        src={`${process.env.NEXT_PUBLIC_REACT_BE_API}/${url}?${timeStamp}`}
      />
    </div>
  );
}
