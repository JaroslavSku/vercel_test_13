import React from "react";
import styles from "./Image.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { DeleteOutlined } from "@mui/icons-material";
const type = "Image";
const Image = ({ image, index, moveImage, remove }) => {
  console.log(image);
  const ref = useRef(null); // Initialize the reference
  const [, drop] = useDrop({
    accept: type,
    // This method is called when we hover over an element while dragging
    hover(item) {
      // item is the dragged element
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      moveImage(dragIndex, hoverIndex);
      /*
        Update the index for dragged item directly to avoid flickering
        when the image was half dragged into the next
      */
      item.index = hoverIndex;
    },
  });
  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { id: image.id, index },
    type: "Image",
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /* 
    Initialize drag and drop into the element using its reference.
    Here we initialize both drag and drop on the same element (i.e., Image component)
  */
  drag(drop(ref));
  //on Error corrupted image
  const imageSrc = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${image.src}`;
  return (
    <div className={styles.container}>
      <div className={styles.fileItem}>
        <img
          ref={ref}
          alt={`img - ${image._id}`}
          src={image?.src ? imageSrc : image.localSrc}
          className={styles.fileImg}
        />
      </div>

      <p className={styles.bottomLine}>
        <DeleteOutlined
          className={styles.deleteIcon}
          onClick={() => remove(index, image._id)}
        />
      </p>
    </div>
  );
};

export default Image;
