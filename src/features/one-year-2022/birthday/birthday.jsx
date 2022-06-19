import React from "react"
import BalloonBirthday from "./balloon_birthday"

const Birthday = ({ onPop }) => {
	return (
		<>
			<BalloonBirthday onPop={onPop} letter="b" />
			<BalloonBirthday onPop={onPop} letter="i" />
			<BalloonBirthday onPop={onPop} letter="r" />
			<BalloonBirthday onPop={onPop} letter="t" />
			<BalloonBirthday onPop={onPop} letter="h" />
			<BalloonBirthday onPop={onPop} letter="d" />
			<BalloonBirthday onPop={onPop} letter="a" />
			<BalloonBirthday onPop={onPop} letter="y" />
		</>
	)
}

export default Birthday
