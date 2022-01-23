import React, { useEffect } from "react"
import { CircularProgress, makeStyles } from "@material-ui/core"
import { createPortal } from "react-dom"
import OsmosisSVG from "./OsmosisSVG"
import { useLoader } from "../../contexts/LoaderProvider"
import "./loader-logo.svg"
const loaderRoot = document.getElementById("loader-root")

const useStyles = makeStyles((theme) => {
	return {
		loaderRoot: {
			position: "fixed",
			top: "0",
			bottom: "0",
			left: "0",
			right: "0",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: "-1",
			opacity: "0",
			transition: "all 0.3s",
		},
		loaderRootDisplayed: {
			zIndex: "1101",
			opacity: "1",
		},
		osmosisContainer: {
			"& #test":{
                overflow: "hidden"
            },

			"& #waters": {
				animation: "$style_waters 1s linear infinite alternate forwards",
			},

			"& #back #waters": {
				// animation: "$style_wiggleReverse 1s linear infinite alternate forwards",
			},

			"& #blueWave": {
				// animation: "$style_blueWave 1.5s linear infinite alternate forwards",
			},

			"& #purpleWave ": {
				// animation: "$style_purpleWave 4s linear infinite alternate forwards",
			},

			"& #bottomWater ": {
				// animation: "$style_bottomWater 2s linear infinite alternate forwards",
			},
		},

		"@keyframes style_waters": {
			"0%": {
				transform: "translate(-20) rotate(0deg)",
			},
			"15%": {
				transform: "translate(-14) rotate(-5deg)",
			},
			"33%": {
				transform: "translate(0) rotate(-8deg)",
			},
			"66%": {
				transform: "translate(5) rotate(0deg)",
			},
			"85%": {
				transform: "translate(10) rotate(8deg)",
			},
			to: {
				transform: "translate(0) rotate(3deg)",
			},
		},

		"@keyframes style_wiggleReverse": {
			"0%": {
				transform: "rotate(0deg)",
			},
			"33%": {
				transform: "rotate(-15deg)",
			},
			"66%": {
				transform: "rotate(15deg)",
			},
			to: {
				transform: "rotate(0deg)",
			},
		},

		"@keyframes style_blueWave": {
			"0%": {
				transform: "translate(8px, 2px)",
			},
			"15%": {
				transform: " translateY(6px)",
			},
			"30%": {
				transform: " translate(-34px, -2px)",
			},
			"45%": {
				transform: "translate(-60px, 4px)",
			},
			"70%": {
				transform: "translate(-70px, -4px)",
			},
			to: {
				transform: "translate(-90px, -8px)",
			},
		},

		"@keyframes style_purpleWave": {
			"0%": {
				transform: "translate(-8px, 4px)",
			},
			"20%": {
				transform: "translateY(6px)",
			},
			"35%": {
				transform: " translate(34px, -2px)",
			},
			"55%": {
				transform: "translate(60px, 2px)",
			},
			"75%": {
				transform: "translate(70px, -4px)",
			},
			to: {
				transform: "translate(80px, -6px)",
			},
		},

		"@keyframes style_bottomWater": {
			"0%": {
				transform: "translate(-30px) rotate(10deg)",
			},
			"15%": {
				transform: " translate(-10px) rotate(20deg)",
			},
			"40%": {
				transform: "translate(-4px) rotate(6deg)",
			},
			"60%": {
				transform: " translate(14px) rotate(-6deg)",
			},
			"80%": {
				transform: "translate(22px) rotate(6deg)",
			},
			to: {
				transform: "translate(30px)",
			},
		},
	}
})

const LoaderOsmosis = () => {
	const classes = useStyles()
	const { openLoader } = useLoader()

	let loaderElt = document.createElement("div")
	useEffect(() => {
		//Didmount
		loaderRoot.appendChild(loaderElt)
		return () => {
			//willUnmount
			loaderRoot.removeChild(loaderElt)
		}
	}, [loaderElt])

	return createPortal(
		<div className={openLoader ? `${classes.loaderRoot} ${classes.loaderRootDisplayed}` : classes.loaderRoot}>
			<div className={classes.osmosisContainer}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
					clipRule="evenodd"
					viewBox="0 0 130 139"
					width="130px"
				>
					<filter id="blendMultiply">
						<feBlend in="SourceGraphic" mode="multiply"></feBlend>
					</filter>
					<filter id="gooeyFill">
						<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"></feGaussianBlur>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
							result="goo"
						></feColorMatrix>
					</filter>
					<filter id="gooeyFillDarken">
						<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"></feGaussianBlur>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
							result="goo"
						></feColorMatrix>
						<feComponentTransfer>
							<feFuncR type="linear" slope="0.5"></feFuncR>
							<feFuncG type="linear" slope="0.5"></feFuncG>
							<feFuncB type="linear" slope="0.5"></feFuncB>
						</feComponentTransfer>
					</filter>
					<g transform="translate(-111.1 -110.7)">
						<path
							fill="#5E12A0"
							fillRule="nonzero"
							d="M238.7 136.3c-1.4-5.3-5.9-10.6-14-16.5-6.5-4.7-13.4-7.4-18.9-7.4-1.1 0-2.1.1-3.1.3-2.5.5-4.7 2.3-6.1 5-1.7 3.2-2.1 7.5-1 10.1.4.8.9 1.8 1.5 2.7-5.3 3.2-8.3 4.1-8.7 4.2 13.8 4.6 25.3 14.2 32.5 26.7l.1-1.2c.3-3.3 1.3-7.1 2.7-11 1.4.4 2.8.6 4.2.6 3.7 0 6.9-1.5 8.9-4.2s2.8-6.3 1.9-9.3z"
						></path>
						<path
							fill="url(#_Radial1)"
							fillRule="nonzero"
							d="M224.3 146.3c9.1 2.5 12.8-4.5 11.6-9.2-1.3-4.7-5.5-9.5-12.9-14.9s-14.9-7.6-19.7-6.6c-4.8 1-6.2 8.3-5 11.1.5 1.1 1.6 2.7 3.1 4.5-1.9 1.3-3.7 2.3-5.2 3.2 9.2 4.1 17.2 10.5 23.2 18.5.7-2.7 1.7-5.1 2.6-7.2.7.1 1.5.3 2.3.6z"
						></path>
						<circle cx="172.2" cy="188.4" r="55.9" fill="url(#_Radial2)"></circle>
						<path
							fill="#A98698"
							fillOpacity="0.6"
							fillRule="nonzero"
							d="M231.3 132.5c-7.6-8-14-10.1-21.7-11.8-6-1.4-4.4-4.8 2.9-4.1-3.5-1.2-6.8-1.5-9.2-1-4.8 1-6.2 8.3-5 11.1.5 1.1 1.6 2.7 3.1 4.5-2.7 1.8-5 3.1-6.9 4.1.9.4 2 .9 3.3 1.6 3.4 1.8 7.1 4.8 7.1 4.8-5.6-4.8-4.4-7 3.3-12.4 2.4-1.7 6.8-1.5 10.9.6 4.1 2.1 8.9 7.4 8.9 7.4l-4.6 8.8.9.3c2.9.8 5.2.6 7-.1 2.1-1.3 7.6-5.7 0-13.8z"
						></path>
						<path
							fill="#5E12A0"
							fillRule="nonzero"
							d="M209.5 125.5c2 .8 4.6 2.2 7.8 4.3 3.8 2.5 7.1 5.3 9.2 7.5-3.5 4.6-5.8 10.9-7.2 15.3.7 1 1.5 2 2.2 3 .7-2.5 1.9-6.2 3.5-9.9.4.1.9.1 1.4.1 1.2 0 2.6-.2 3.7-1.1.8-.6 1.7-1.7 1.6-3.7 0-1.9-1.5-4.3-4.6-7.2-2.2-2.1-5.2-4.4-8.2-6.5-8.6-5.7-14.6-7.3-17.3-4.6-1.8 1.8-1.6 4-1 5.6-3.2 2.1-5.9 3.6-7.7 4.6 1.2.4 2.3.9 3.5 1.4 3.2-1.7 7.8-4.6 13.1-8.8zm18.9 14.3c.3.5.4 1 .4 1.3 0 .9-.3 1.2-.5 1.4-.4.3-1.2.5-1.9.5.6-1.2 1.3-2.2 2-3.2zm-24.7-14.9c.3-.3 1.1-.5 2.4-.3-1 .8-2 1.5-3 2.2-.1-.7 0-1.4.6-1.9z"
						></path>
						<path
							fill="#5E12A0"
							fillRule="nonzero"
							d="M172.2 129.2c-32.7 0-59.2 26.5-59.2 59.2s26.5 59.2 59.2 59.2 59.2-26.5 59.2-59.2-26.6-59.2-59.2-59.2zm0 115.1c-30.9 0-55.9-25-55.9-55.9s25-55.9 55.9-55.9 55.9 25 55.9 55.9-25.1 55.9-55.9 55.9z"
						></path>
						<circle cx="172.2" cy="188.4" r="55.9" fill="url(#_Linear3)"></circle>
						<clipPath id="innerCircle">
							<circle r="52"></circle>
						</clipPath>
						<clipPath id="innerCircleBack">
							<circle cy="20" r="52"></circle>
						</clipPath>
						<linearGradient id="blueToPurple">
							<stop offset="0%" stopColor="#0002E9"></stop>
							<stop offset="100%" stopColor="#FF00C7"></stop>
						</linearGradient>
						<g filter="url(#blendMultiply)" id="test">
							<g transform="translate(172.2, 188.4)" clipPath="url(#innerCircle)" filter="url(#gooeyFill)">
								<g transform="translate(0, 12)">
									<g id="waters">
										<rect id="blueWater" x="-120" y="0" width="120" height="120" fill="#0002E9"></rect>
										<rect id="purpleWater" x="0" y="0" width="120" height="120" fill="#FF00C7"></rect>
										<circle id="blueWave" cx="20" cy="0" r="20" fill="#0002E9"></circle>
										<circle id="purpleWave" cx="-20" cy="0" r="20" fill="#FF00C7"></circle>
										<rect id="bottomWater" x="-25" y="30" width="50" height="50" fill="url(#blueToPurple)"></rect>
									</g>
								</g>
							</g>
							<path
								fill="#A98698"
								fillOpacity="0.6"
								fillRule="nonzero"
								d="M171.8 237.5c-30.5-4.9-51.2-33.6-46.2-64.1 2.2-13.5 9-25 18.6-33.3-14 8.1-24.4 22.2-27.2 39.4-4.9 30.5 15.8 59.2 46.2 64.1 17 2.8 33.4-2.5 45.5-12.9-10.7 6.2-23.7 8.9-36.9 6.8z"
							></path>
						</g>
						<path
							fill="url(#_Linear4)"
							fillRule="nonzero"
							d="M181.1 133.3c-14.1-2.3-27.8.9-39 8l-.4.4c4.3-2.6 10.6-4.9 10.6-4.9-16.2 9.4-21.2 20.1-21.2 20.1 6.3-12.2 24.8-20.8 39.3-21.4 14.5-.6 24 3.7 35.6 13 11.6 9.4 18.6 28.6 17.9 43.8-.6 15.2-8.6 27.5-8.6 27.5 5.5-7.1 8.8-12.3 10.9-17.6.4-1.6.8-3.2 1-4.9 5-30.4-15.6-59.1-46.1-64z"
						></path>
						<circle cx="189.6" cy="154.2" r="9" fill="#fff"></circle>
						<circle cx="204.3" cy="166.1" r="3.8" fill="#fff"></circle>
						<path
							fill="url(#_Linear9)"
							fillRule="nonzero"
							d="M217.9 147h-.2c-.6-.1-1-.7-.9-1.4.9-4.6 4.7-9 4.9-9.2.4-.5 1.2-.5 1.6-.1.5.4.5 1.2.1 1.6-.1.1-3.6 4.2-4.4 8.2-.1.6-.6.9-1.1.9z"
							opacity="0.6"
						></path>
						<path
							fill="#fff"
							fillRule="nonzero"
							d="M205.8 112.4c5.6 0 12.5 2.7 18.9 7.4 8.1 5.9 12.6 11.1 14 16.5.8 3.1.1 6.6-1.9 9.2-2.1 2.7-5.2 4.2-8.9 4.2-1.3 0-2.7-.2-4.2-.6-.9 2.3-1.6 4.6-2.1 6.8 6.1 9.3 9.7 20.5 9.7 32.5 0 32.7-26.5 59.2-59.2 59.2S113 221.1 113 188.4s26.5-59.2 59.2-59.2c7.2 0 14.1 1.3 20.5 3.7 1.2-.6 2.7-1.4 4.4-2.4-.6-.9-1.2-1.8-1.5-2.7-1.1-2.7-.7-6.9 1-10.1 1.4-2.6 3.5-4.4 6.1-5 .9-.2 2-.3 3.1-.3m0-1.7c-1.2 0-2.4.1-3.5.4-3 .7-5.6 2.7-7.3 5.9-1.9 3.7-2.4 8.5-1.1 11.6.2.4.4.9.7 1.4-.7.4-1.4.8-2.1 1.1-6.6-2.3-13.4-3.5-20.4-3.5-8.2 0-16.2 1.6-23.7 4.8-7.3 3.1-13.8 7.5-19.4 13.1-5.6 5.6-10 12.1-13.1 19.4-3.2 7.5-4.8 15.5-4.8 23.7s1.6 16.2 4.8 23.7c3.1 7.3 7.5 13.8 13.1 19.4 5.6 5.6 12.1 10 19.4 13.1 7.5 3.2 15.5 4.8 23.7 4.8s16.2-1.6 23.7-4.8c7.3-3.1 13.8-7.5 19.4-13.1 5.6-5.6 10-12.1 13.1-19.4 3.2-7.5 4.8-15.5 4.8-23.7 0-11.7-3.3-23-9.6-32.8.3-1.5.8-3 1.3-4.5 1 .2 2.1.3 3.1.3 4.2 0 7.9-1.7 10.3-4.9 2.3-3 3.2-7.2 2.2-10.7-1.6-5.8-6.2-11.3-14.7-17.4-6.7-5.1-14-7.9-19.9-7.9z"
						></path>
						<circle cx="168.5" cy="227.3" r="2.8" fill="#fff" fillOpacity="0.2"></circle>
						<path
							fill="url(#_Linear10)"
							fillRule="nonzero"
							d="M166.9 229.1c-1.1-1.1-1.1-2.9 0-4 .2-.2.4-.3.6-.5-.4.1-.7.3-1 .6-1.1 1.1-1.1 2.9 0 4 .9.9 2.3 1.1 3.4.5-1 .4-2.2.2-3-.6z"
							opacity="0.4"
						></path>
						<circle cx="169.5" cy="225.9" r="0.6" fill="#fff" fillOpacity="0.3"></circle>
						<g>
							<circle cx="183.1" cy="225.9" r="2.8" fill="#fff" fillOpacity="0.2"></circle>
							<path
								fill="url(#_Linear11)"
								fillRule="nonzero"
								d="M181.5 227.7c-1.1-1.1-1.1-2.9 0-4 .2-.2.4-.3.6-.5-.4.1-.7.3-1 .6-1.1 1.1-1.1 2.9 0 4 .9.9 2.3 1.1 3.4.5-1 .4-2.2.2-3-.6z"
								opacity="0.4"
							></path>
							<circle cx="184.1" cy="224.5" r="0.6" fill="#fff" fillOpacity="0.3"></circle>
						</g>
						<g>
							<circle cx="175.9" cy="233.1" r="2.1" fill="#fff" fillOpacity="0.2"></circle>
							<path
								fill="url(#_Linear12)"
								fillRule="nonzero"
								d="M174.7 234.4c-.8-.8-.8-2.2 0-3 .1-.1.3-.2.4-.3-.3.1-.5.3-.7.5-.8.8-.8 2.2 0 3 .7.7 1.7.8 2.6.3-.8.3-1.7.1-2.3-.5z"
								opacity="0.4"
							></path>
							<circle cx="176.6" cy="232" r="0.4" fill="#fff" fillOpacity="0.3"></circle>
						</g>
						<g>
							<circle cx="188.8" cy="231.6" r="2.1" fill="#fff" fillOpacity="0.2"></circle>
							<path
								fill="url(#_Linear13)"
								fillRule="nonzero"
								d="M187.6 232.9c-.8-.8-.8-2.2 0-3 .1-.1.3-.2.4-.3-.3.1-.5.3-.7.5-.8.8-.8 2.2 0 3 .7.7 1.7.8 2.6.3-.8.3-1.7.1-2.3-.5z"
								opacity="0.4"
							></path>
							<circle cx="189.5" cy="230.5" r="0.4" fill="#fff" fillOpacity="0.3"></circle>
						</g>
						<g>
							<circle cx="156.6" cy="224.5" r="4.6" fill="#fff" fillOpacity="0.2"></circle>
							<path
								fill="url(#_Linear14)"
								fillRule="nonzero"
								d="M154 227.4c-1.8-1.8-1.8-4.7 0-6.5.3-.3.6-.5 1-.7-.6.2-1.1.6-1.6 1-1.8 1.8-1.8 4.7 0 6.5 1.5 1.5 3.8 1.8 5.6.7-1.7.7-3.7.4-5-1z"
								opacity="0.4"
							></path>
							<circle cx="158.2" cy="222.1" r="1" fill="#fff" fillOpacity="0.3"></circle>
						</g>
						<g>
							<circle cx="197.7" cy="213.2" r="4.6" fill="#fff" fillOpacity="0.2"></circle>
							<path
								fill="url(#_Linear15)"
								fillRule="nonzero"
								d="M195 216.1c-1.8-1.8-1.8-4.7 0-6.5.3-.3.6-.5 1-.7-.6.2-1.1.6-1.6 1-1.8 1.8-1.8 4.7 0 6.5 1.5 1.5 3.8 1.8 5.6.7-1.7.7-3.6.4-5-1z"
								opacity="0.4"
							></path>
							<circle cx="199.3" cy="210.8" r="1" fill="#fff" fillOpacity="0.3"></circle>
						</g>
					</g>
					<defs>
						<radialGradient
							id="_Radial1"
							cx="0"
							cy="0"
							r="1"
							gradientTransform="translate(234.076 130.8) scale(44.6944)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#FFEAFF" stopOpacity="0.6"></stop>
							<stop offset="0.68" stopColor="#A087C9"></stop>
							<stop offset="1" stopColor="#10002F"></stop>
						</radialGradient>
						<radialGradient
							id="_Radial2"
							cx="0"
							cy="0"
							r="1"
							gradientTransform="translate(209.21 149.861) scale(109.351)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#FFEAFF" stopOpacity="0.6"></stop>
							<stop offset="0.68" stopColor="#A087C9"></stop>
							<stop offset="1" stopColor="#10002F"></stop>
						</radialGradient>
						<linearGradient
							id="_Linear3"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="scale(111.7467) rotate(-80.793 2.01 .231)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#81FFFF" stopOpacity="0.6"></stop>
							<stop offset="0.62" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear4"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="scale(-62.7331) rotate(-42.537 -4.767 3.134)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear5"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(119.045 214.419) scale(106.229)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#0002E9"></stop>
							<stop offset="1" stopColor="#FF00C7"></stop>
							<stop offset="1" stopColor="#FF00C7"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear6"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="rotate(136.618 76.855 142.083) scale(79.5552)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear7"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(119.045 214.419) scale(56.8321)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#000292"></stop>
							<stop offset="1" stopColor="#7D00C7"></stop>
							<stop offset="1" stopColor="#7D00C7"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear8"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(119.116 192.811) scale(106.087)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#000292"></stop>
							<stop offset="1" stopColor="#BE00C7"></stop>
							<stop offset="1" stopColor="#BE00C7"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear9"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="rotate(121.607 73.757 130.391) scale(14.5481)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff"></stop>
							<stop offset="0.29" stopColor="#fff"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear10"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(165.672 227.386) scale(4.2309)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear11"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(180.262 225.967) scale(4.2309)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear12"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(173.787 233.124) scale(3.1763)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear13"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(186.644 231.62) scale(3.1763)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear14"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(152.004 224.617) scale(6.9094)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
						<linearGradient
							id="_Linear15"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="translate(193.042 213.314) scale(6.9094)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.29" stopColor="#fff" stopOpacity="0.6"></stop>
							<stop offset="0.78" stopColor="#fff" stopOpacity="0"></stop>
							<stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
						</linearGradient>
					</defs>
				</svg>
			</div>
		</div>,
		loaderRoot
	)
}

export default LoaderOsmosis
