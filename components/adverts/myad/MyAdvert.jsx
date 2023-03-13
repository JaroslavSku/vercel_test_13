/* eslint-disable @next/next/no-img-element */
import Hearts from "../../hearts/Hearts";
import TopButtons from "../../inzerce/topbuttons/TopButtons";
import ConfirmationModal from "../../modals/confirmation/ConfirmationModal";
import { first } from "lodash";
import { useRouter } from "next/router";
// import { LocationOn } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  deleteAdvert,
  setAdvertBadge,
} from "../../../redux/actions/advertActions";
import styles from "./MyAdvert.module.scss";
import { payAdverts } from "../../../redux/actions/paymentActions";
import { useRef, useState } from "react";
import Badges from "../../badges/Badges";
import AdvTitle from "../adtitle/AdvTitle";
import RedCircle from "../redcircle/RedCircle";
import { iconsUrl } from "@/utils/urls";
function MyAdvert({
  adv,
  allowEdit,
  displayTopButtons,
  showHearts,
  payAdverts,
  deleteAdvert,
}) {
  const router = useRouter();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const heart = useRef(null);
  const handleEdit = (id) => {
    if (id && allowEdit) {
      router.push(`/pronajimatel/interni/inzerce/editovat/${id}`);
    }
  };

  function handleError(e) {
    e.target.src = `${iconsUrl}/upload-empty.png`;
  }

  function createSrcPath(images) {
    let src = `${iconsUrl}/upload-empty.png`;
    if (images && images.length > 0) {
      src = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${first(images).src}`;
    }
    return src;
  }

  function handleConfirm(id) {
    console.log("delete", id);
    if (showConfirmationModal && !showDeleteModal) {
      payAdverts(id);
    }
    if (showDeleteModal && !showConfirmationModal) {
      deleteAdvert(id);
    }
  }
  return (
    <div name={adv._id} key={adv._id}>
      <ConfirmationModal
        close={() => {
          setShowConfirmationModal(false), setShowDeleteModal(false);
        }}
        show={showConfirmationModal || showDeleteModal}
        title={
          showDeleteModal
            ? "Chcete smazat tento inzerát?"
            : "Prosím potvrďte prodloužení inzerátu."
        }
        handleConfirm={() => handleConfirm(adv._id)}
      />
      {displayTopButtons && (
        <TopButtons
          data={adv}
          handleDelete={() => setShowDeleteModal(true)}
          handlePublish={() => setShowConfirmationModal(true)}
        />
      )}

      <div onClick={() => handleEdit(adv._id)} className={styles.body}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            onError={handleError}
            src={createSrcPath(adv?.images)}
            alt={`obrázek ${adv._id}`}
          />
        </div>
        {adv?.badgeType && <Badges badgeType={adv.badgeType} />}
        <RedCircle data={adv} />
        <AdvTitle adv={adv} />
        {showHearts && (
          <div className={styles.heart}>
            <Hearts heart={heart} id={adv?._id || ""} />
          </div>
        )}
        <p className={styles.bottomLine}>
          {/* <LocationOn /> */}
          <span>{adv?.address || ""}</span>
        </p>
      </div>
    </div>
  );
}

export default connect((state) => state, {
  setAdvertBadge,
  payAdverts,
  deleteAdvert,
  setAdvertBadge,
})(MyAdvert);
