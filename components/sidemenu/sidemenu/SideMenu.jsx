/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./SideMenu.module.scss";
import StyledLink from "../styledlink/StyledLink";
import LogoutLink from "../logoutlink/LogoutLink";
import UpdateProfilePictureModal from "../../modals/choosepicture/UpdateProfilePictureModal";
import { useSelector } from "react-redux";
import ProfileImage from "../../profileimage/ProfileImage";
import { iconsUrl } from "@/utils/urls";

export default function SideMenu({ links }) {
  const [show, setShow] = useState(false);
  const { imageUrl, updatedAt } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);
  const linkBase = useSelector((state) => state.auth.userType);

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }
  return (
    <div className={styles.body}>
      <div className={styles.profileBody}>
        <div className={styles.profileImageContainer}>
          <ProfileImage
            url={imageUrl}
            timeStamp={updatedAt}
            imgCss={styles.profileImage}
          />
          <div onClick={openModal} className={styles.cameraBody}>
            <img
              className={styles.camera}
              alt="camera"
              src={`${iconsUrl}/general/photo-camera.svg`}
            />
          </div>
        </div>
        <div className={styles.personDetail}>
          <p className={styles.personType}>
            {linkBase === "pronajimatel" ? "Pronajímatel" : "Nájemník"}
          </p>
          <p className={styles.personName}>{userData.userName}</p>
          <a
            className={styles.profileBtn}
            href={`/${linkBase}/interni/profile`}
          >
            <img
              className={styles.pencilImage}
              src={`${iconsUrl}/general/pencil.svg`}
              alt="pencil"
            />
            Upravit Profil
          </a>
        </div>
        <UpdateProfilePictureModal show={show} close={closeModal} />
      </div>
      <ul>
        {links &&
          links.map(({ href, name }) => {
            return (
              <StyledLink key={name} href={href}>
                {name}
              </StyledLink>
            );
          })}
        <LogoutLink href="/logout" />
      </ul>
    </div>
  );
}
