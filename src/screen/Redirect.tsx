import { useEffect } from "react"
import { useHistory } from "react-router-dom"

import * as D from 'react-device-detect'
export const Redirect = () => {
	const history = useHistory();

	useEffect(() => { 
		if (D.isIOS || D.isSafari) {
			// var url = "campustaxi://media";
			// setTimeout(function () {
				window.open("https://itunes.apple.com/kr/app/campustaxi/id1534509768?mt=8");
			// }, 1000);
			// location.href = url;
			alert("I")
		} else if(D.isAndroid){
			window.open("intent://campustaxi.campustaxi.com/#Intent;package=com.campustaxi.campustaxi;scheme=https;end")
			alert("A")
		} else {
			history.replace("/")
			alert("WEB")
		}
	},[])
	return <></>
}