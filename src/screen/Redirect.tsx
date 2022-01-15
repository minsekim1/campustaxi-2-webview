import { useEffect } from "react"
import { useHistory } from "react-router-dom"

import * as D from 'react-device-detect'
export const Redirect = () => {
	const history = useHistory();

	useEffect(() => { 
		if (D.isIOS || D.isSafari) {
			window.open("instagram://media")
			setTimeout(function () {
				window.open("https://itunes.apple.com/kr/app/instagram/id389801252?mt=8");
			}, 1000);
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