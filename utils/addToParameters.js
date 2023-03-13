import { forEach } from "lodash";
export function addToParams(values) {
  let params = new URLSearchParams();
  forEach(values, (value, key) => {
    params.append(key, value);
  });
  return params;
}
