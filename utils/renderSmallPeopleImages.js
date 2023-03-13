import { peopleIconsUrl } from "@/utils/urls";
const renderImages = (advert) => {
  try {
    let images = [];

    for (let index = 0; index < advert.womenRoommates; index++) {
      const src = `${peopleIconsUrl}/woman.gif`;
      images.push(<img src={src} />);
    }
    for (let index = 0; index < advert.menRoommates; index++) {
      const src = `${peopleIconsUrl}/man.gif`;
      images.push(<img src={src} />);
    }
    if (advert.searchedPerson) {
      let src = "";

      switch (advert.searchedPerson) {
        case "woman":
          src = `${peopleIconsUrl}/empty_woman.gif`;
          images.push(<img src={src} />);
          break;
        case "man":
          src = `${peopleIconsUrl}/empty_man.gif`;
          images.push(<img src={src} />);
          break;
        case "both":
          src = `${peopleIconsUrl}/empty_any.gif`;
          images.push(<img src={src} />);
          break;
        default:
          break;
      }
    }
    return images;
  } catch (error) {
    console.warn(error);
  }
};

export default renderImages;
