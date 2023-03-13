import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropZone.module.scss";
// import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
function Dropzone({ onDrop, accept, fileCount }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 15,
    maxSize: 10000000,
  });

  return (
    <div {...getRootProps()}>
      <input className={styles.dropzoneInput} {...getInputProps()} />
      <div className={styles.container}>
        {isDragActive ? (
          <div className={styles.dropzoneContent}>
            <p>{/* <InsertPhotoIcon className={styles.icon} /> */}</p>
            <h4>Na toto místo přetáhněte svoje fotografie.</h4>
            <p>
              K inzerátu je možné nahrát maximálně 15 fotografií. Fotografie
              musí být menší než 10MB.
            </p>
            <p className={styles.count}>{fileCount || 0}/15</p>
          </div>
        ) : (
          <div className={styles.dropzoneContent}>
            <p>{/* <InsertPhotoIcon className={styles.icon} /> */}</p>
            <h4>Na toto místo přetáhněte svoje fotografie.</h4>
            <p>
              K inzerátu je možné nahrát maximálně 15 fotografií. Fotografie
              musí být menší než 10MB.
            </p>
            <p className={styles.count}>{fileCount || 0}/15</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
