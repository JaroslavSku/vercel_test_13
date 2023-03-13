import { iconsUrl } from "./urls";

export function addDefaultImage(e) {
  e.target.src = `${iconsUrl}/upload-empty.png`;
}
