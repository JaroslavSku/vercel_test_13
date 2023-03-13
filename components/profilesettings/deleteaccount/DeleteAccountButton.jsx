import ConfirmationModal from "@/components/modals/confirmation/ConfirmationModal";
import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteAccount } from "../../../redux/actions/userActions";
import styles from "./DeleteAccountButton.module.scss";

function DeleteAccountButton({ deleteAccount }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  function handleConfirmation() {
    deleteAccount();
  }
  return (
    <div>
      <ConfirmationModal
        close={() => setShowConfirmationModal(false)}
        show={showConfirmationModal}
        title={"Opravdu chcete smazat svůj účet."}
        handleConfirm={() => handleConfirmation()}
      />
      <button
        onClick={() => setShowConfirmationModal(true)}
        className={styles.deleteBtn}
      >
        Smazat účet
      </button>
    </div>
  );
}

export default connect((state) => state, { deleteAccount })(
  DeleteAccountButton
);
