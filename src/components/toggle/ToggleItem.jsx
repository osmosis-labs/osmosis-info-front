import { makeStyles } from "@material-ui/core"
import { styled } from "@material-ui/styles"
import ToggleButton from "@mui/material/ToggleButton"

const ToggleItem = styled(ToggleButton)(({ theme }) => ({
	"&.MuiToggleButton-root": {
		color: theme.palette.gray.dark,
		borderColor: theme.palette.primary.light,
		padding: "0px 6px",
		fontSize: "14px",
		textTransform: "none",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
		},
		"&.Mui-selected": {
			color: theme.palette.gray.contrastText,
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				backgroundColor: theme.palette.primary.main,
			},
		},
	},
}))

export default ToggleItem
