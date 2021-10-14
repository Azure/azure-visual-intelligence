export function* handleChangeLayout(action) {
  try {
    yield console.log("ChangeLayout");
  } catch (error) {
    console.log(error);
  }
}
