import { Icon } from "./../common/Icon";

export const ProfileIcon = ({ size, icon }) => (
  <div style={{ height: size == "sm" ? 50 : 58 }}>
    <div
      onClick={() => {}}
      style={{
        ...inlineStyle.noStyleBtn,
        border: `3px solid white`,
        borderRadius: 200,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: size === "sm" ? 44 : 52,
        height: size === "sm" ? 44 : 52,
      }}
    >
      <img
        alt={' '}
        width={size === "sm" ? 40 : 48}
        height={size === "sm" ? 40 : 48}
        style={{ borderRadius: 200 }}
        src={"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}
      ></img>
    </div>
    {icon ? (
      <div
        style={{
          position: "relative",
          marginTop: size === "sm" ? 26 : 30,
          marginLeft: size === "sm" ? 26 : 30,
          height: size === "sm" ? 16 : 18,
          width: size === "sm" ? 16 : 18,
          backgroundColor: "#0075FF",
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: 1.5,
          borderRadius: 20,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          top: -52,
          left: 8,
        }}
      >
        <Icon name={icon} color={"white"} size={"xs"} />
      </div>
    ) : (
      false
    )}
  </div>
);
const inlineStyle = {
  noStyleBtn: { backgroundColor: "transparent", border: "none", fontSize: 15, fontWeight: "normal", width: "3em" },
};
