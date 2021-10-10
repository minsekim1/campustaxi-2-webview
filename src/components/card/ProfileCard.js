import { Icon } from './../common/Icon';

export const ProfileCard = ({ size, icon}) => {
	return (
    <button
      onClick={() => {}}
      style={{
        ...inlineStyle.noStyleBtn,
        border: `3px solid white`,
        borderRadius: 200,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: size == "sm" ? 44 : 52,
        height: size == "sm" ? 44 : 52,
      }}
    >
      <img
        width={size == "sm" ? 40 : 48}
        height={size == "sm" ? 40 : 48}
        style={{ borderRadius: 200 }}
        src={"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}
      ></img>
      {icon ? (
        <div
          style={{
            position: "absolute",
            marginTop: size == "sm" ? 26 : 30,
            marginLeft: size == "sm" ? 26 : 30,
            height: size == "sm" ? 18 : 20,
            width: size == "sm" ? 18 : 20,
            backgroundColor: "#0075FF",
            borderStyle: "solid",
            borderColor: "white",
            borderWidth: 1.5,
            borderRadius: 20,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} color={"white"} size={size != "sm" ? "sm" : "xs"} />
        </div>
      ) : (
        false
      )}
    </button>
  );
}
const inlineStyle = {
  noStyleBtn: { backgroundColor: "transparent", border: "none", fontSize: 15, fontWeight: "normal", width: "3em" },
};