import React, { useEffect, useRef, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import { connect } from "react-redux";
import { uploadPicture } from "../../../redux/actions/userActions";
import Cross from "../inputs/close/Cross";
import Modal from "../Modal";
import styles from "./EditPickmodal.module.scss";
import cuid from "cuid";

function EditPickmodal({ image, show, close, uploadPicture }) {
  useEffect(() => {
    resetScale();
    console.log(image, "Image resetting");
  }, [image]);
  const editorRef = useRef();
  const [state, setState] = useState({
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1.1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 200,
    height: 200,
  });
  const handlePositionChange = (newPosition) => {
    const newState = { ...state };
    newState.position = newPosition;
    setState(newState);
  };
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setState((prev) => ({
      ...prev,
      scale: scale,
    }));
  };

  const resetScale = () => {
    setState((prev) => ({
      ...prev,
      width: 201,
      height: 201,
    }));
  };
  const onClickSave = () => {
    if (editorRef) {
      const formData = new FormData();
      const canvas = editorRef.current.getImage();
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      canvasScaled.toBlob(
        (blob) => {
          if (blob) {
            formData.append("image", blob, cuid());
            uploadPicture(formData);
            close();
          }
        },
        "image/jpeg",
        0.95
      );
    }
  };
  return (
    <Modal show={show} close={close}>
      <div className={styles.cross}>
        <Cross onClick={close} />
      </div>
      <div className={styles.body}>
        <h5 className={styles.title}>Profilová fotka</h5>
        <p className={styles.description}>
          Nahrajte prosím Vaši profilovou fotografii
        </p>
        <div className={styles.cropper}>
          <ReactAvatarEditor
            ref={editorRef}
            scale={parseFloat(state.scale)}
            width={state.width}
            height={state.height}
            position={state.position}
            onPositionChange={handlePositionChange}
            rotate={parseFloat(state.rotate)}
            borderRadius={state.width / (100 / state.borderRadius)}
            image={image}
          />

          <input
            name="scale"
            type="range"
            onChange={handleScale}
            min={state.allowZoomOut ? "0.1" : "1"}
            max="2"
            step="0.01"
            defaultValue="1"
            className={styles.range}
          />
        </div>
        <div className={styles.buttons}>
          <button
            onClick={onClickSave}
            className={styles.submitBtn}
            id="submit"
            type="submit"
          >
            Uložit
          </button>
          <button
            onClick={close}
            className={styles.cancelBtn}
            id="cancel"
            type="cancel"
          >
            Zrušit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default connect((state) => state, { uploadPicture })(EditPickmodal);
