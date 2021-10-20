import { useState, useEffect } from "react";
import { GRAY6, GRAY1, GRAY2 } from "./../../style/index";
import { useRecoilState } from 'recoil';
import { commandWindowState } from "../recoil";

const box_active = {
  border: `1px solid ${GRAY2}`,
  borderRadius: 4,
  padding: 8,
  background: `white`,
  opacity: "1",
  transition: "opacity 200ms",
};

const box_hidden = {
  border: `1px solid ${GRAY2}`,
  borderRadius: 4,
  padding: 8,
  background: `white`,
  opacity: "0",
  transition: "opacity 100ms",
};

export const FadeDiv = ({ visible, children, style }) => {
  const [select, setSelect] = useState(false);
  const [disable, setDisable] = useState(true);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  useEffect(() => {
    handleClick(visible);
    if (visible) setDisable(false);
    else setTimeout(() => setDisable(true), 100);
  }, [visible, commandWindow]);
  const handleClick = (visible) => {
    setSelect(visible);
  };
  if (disable) return <></>;
  return <div style={select ? { ...box_active, ...style } : { ...box_hidden, ...style }}>{children}</div>;
};
