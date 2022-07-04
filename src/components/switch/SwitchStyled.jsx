import { styled } from "@material-ui/styles"
import Switch from "@mui/material/Switch"

const SwitchStyled = styled(Switch)(({ theme }) => ({
	"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
		backgroundColor: theme.palette.blueButton.background,
	},
	"& .MuiSwitch-switchBase.Mui-checked": {
		color: theme.palette.blueButton.background,
	},
}))

export default SwitchStyled
