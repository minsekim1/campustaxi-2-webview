export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    console.log("savedValue", savedValue);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      // localStorage.removeItem(key);
      console.log("setItem", key, JSON.stringify(newValue));
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// const currentUserIDState = atom({
//   key: "recoil/CurrentUserID",
//   default: 1,
//   effects_UNSTABLE: [localStorageEffect("recoil/CurrentUserID")],
// });
