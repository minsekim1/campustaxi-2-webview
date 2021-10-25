import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/pro-light-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/pro-regular-svg-icons";
import { GRAY9 } from "../../style";

/**
 * 아이콘 기본형: 'solid'
 * @param {{icon:string ,size:'lg' | 'sm' | 'xs' | '2x', opacity: number, color: string, type:'light' | 'regular' | 'solid'}} params
 */
export const Icon = ({ name, size, opacity, color, type }) => {
	const iconList = type === "light" ? fal : type === 'regular' ? far : fas;
  return <FontAwesomeIcon icon={iconList[name ?? "faHome"]} size={size ?? "lg"} opacity={opacity ?? 1} color={color ?? GRAY9} />;
};
