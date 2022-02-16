import { Checkbox, FormControlLabel, IconButton, makeStyles, Popover } from "@material-ui/core"
import { useState } from "react"
import { useSettings } from "../../contexts/SettingsProvider"
import SettingsIcon from "@material-ui/icons/Settings"
import { useEffect } from "react"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
const useStyles = makeStyles((theme) => {
	return {
		settingsContainer: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
		},
		settingsText: {
			display: "flex",
			alignItems: "center",
			color: theme.palette.gray.dark,
			cursor: "pointer",
			transition: "all 0.2s",
			fontSize: "0.8rem",
			"& .MuiButtonBase-root": {
				color: theme.palette.gray.dark,
				transition: "all 0.2s",
				fontSize: "0.8rem",
			},
			"&:hover": {
				color: theme.palette.gray.textLight,
				"& .MuiButtonBase-root": {
					color: theme.palette.gray.textLight,
				},
			},
		},
		settingsIcons: {
			padding: "0 12px",
		},
		popover: {
			display: "flex",
			padding: theme.spacing(2),
			borderRadius: theme.spacing(2),
			backgroundColor: `${theme.palette.primary.dark} !important`,
		},
		popoverContainer: {
			display: "flex",
			flexDirection: "column",
			padding: "8px",
		},
		checkbox: {
			"& .MuiCheckbox-root": {
				color: theme.palette.gray.textLight,
				"&:hover": {
					backgroundColor: theme.palette.primary.main,
				},
			},
		},
		actions: {
            marginTop: theme.spacing(2),
			display: "flex",
			justifyContent: "space-around",
			alignItems: "center",
		},
	}
})

// Component used for display Tokens table
const TableSettings = ({ settings, setSettings, match }) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [values, setValues] = useState({})

	useEffect(() => {
		if (settings && match) {
			let values = {}
			Object.keys(match).forEach((key) => {
				let value = settings[key]
				let name = match[key]
				values[key] = { value, name }
			})
			setValues(values)
		}
	}, [settings, match])

	const open = Boolean(anchorEl)

	const handleClose = () => {
		setAnchorEl(null)
	}
	const onChangeSettings = () => {
        let newSettings = {}
        Object.keys(values).forEach((key) => {
            newSettings[key] = values[key].value
        })
		setSettings(newSettings)
        handleClose()
	}

	const openSettings = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const onChangeCheckbox = (name, value, key) => {
		setValues({ ...values, [key]: { value, name } })
	}
	return (
		<div className={classes.settingsContainer}>
			<p className={classes.settingsText} onClick={openSettings}>
				Settings
				<IconButton className={classes.settingsIcons} onClick={openSettings} disabled size="small" component="span">
					<SettingsIcon style={{ fontSize: 20 }} />
				</IconButton>
			</p>
			<Popover
				id={"settings-popover"}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				elevation={10}
				PaperProps={{
					className: classes.popover,
				}}
			>
				<div className={classes.popoverContainer}>
					{Object.keys(values).map((key) => {
						let value = values[key].value
						let name = values[key].name
						return (
							<FormControlLabel
								key={key}
								className={classes.checkbox}
								control={
									<Checkbox
										checked={value}
										onChange={() => {
											onChangeCheckbox(name, !value, key)
										}}
										inputProps={{ "aria-label": name }}
									/>
								}
								label={name}
							/>
						)
					})}
					<div className={classes.actions}>
						<IconButton onClick={handleClose} size="small" component="span">
							<CloseIcon />
						</IconButton>
						<IconButton onClick={onChangeSettings} size="small" component="span">
							<CheckIcon />
						</IconButton>
					</div>
				</div>
			</Popover>
		</div>
	)
}

export default TableSettings
