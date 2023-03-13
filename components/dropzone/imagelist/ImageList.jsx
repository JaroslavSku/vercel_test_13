import React from "react";
import Image from "./image/Image";
import styles from "./ImageList.module.scss";

function ImageListArea({ images, moveImage, remove }) {
  console.log("These are images to be loaded", images);
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        alt={`${index}-image`}
        key={`${index}-image`}
        moveImage={moveImage}
        index={index}
        remove={remove}
      />
    );
  };

  return (
    <section className={styles.fileList}>{images.map(renderImage)}</section>
  );
}

export default ImageListArea;
