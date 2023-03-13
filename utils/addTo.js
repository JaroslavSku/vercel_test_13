export default function addtoStorage(name, values) {
  console.log("store", name, values);
  let object = {};
  if (localStorage.getItem(name)) {
    object = JSON.parse(localStorage.getItem(name));
    console.log("object in if", object);
    localStorage.removeItem(name);
  }
  const newObject = { ...object, ...values };
  console.log("new object", newObject);
  localStorage.setItem(name, JSON.stringify(newObject));
}
