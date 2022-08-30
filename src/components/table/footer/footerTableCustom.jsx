import { IconButton, makeStyles, MenuItem, Select } from "@material-ui/core"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { useEffect, useRef } from "react"
const useStyles = makeStyles((theme) => {
	return {
		footerTableCustomRoot: {
			paddingTop: theme.spacing(1),
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			fontFamily: "'Poppins' !important",
			fontSize: "14px",
			lineHeight: "23px",
			color: theme.palette.table.cellDark,
		},
		select: {
			margin: `0 ${theme.spacing(1)}px`,
			fontFamily: "'Poppins' !important",
			fontSize: "14px",
			lineHeight: "23px",
			color: theme.palette.table.cellDark,
		},
		left: {
			paddingLeft: "25px",
			width: "33%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				width: "49%",
			},
		},
		center: {
			width: "33%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			[theme.breakpoints.down("xs")]: {
				width: "49%",
				justifyContent: "flex-end",
			},
		},
		loadmore: {
			color: theme.palette.primary.contrastText,
			cursor: "pointer",
			paddingLeft: "10px",
			transition: "all 0.3s",
			"&:hover": {
				color: theme.palette.gray.textLight,
			},
		},
	}
})

const FooterTableCustom = ({
	rowsPerPageOptions,
	count,
	rowsPerPage,
	page,
	onChangePage,
	onChangeRowsPerPage,
	callBackEndPage = null,
}) => {
	const classes = useStyles()
	const needToChangePage = useRef(false)

	useEffect(() => {
		if (needToChangePage.current) {
			needToChangePage.current = false
			if ((page + 1) * rowsPerPage < count) {
				onChangePage(page + 1)
			}
		}
	}, [count])

	const onClickChangePage = (next) => {
		if (next) {
			if ((page + 1) * rowsPerPage < count) {
				onChangePage(page + 1)
			} else if (callBackEndPage) cbBackEndPage()
		} else {
			if (page > 0) {
				onChangePage(page - 1)
			}
		}
	}
	const maxPage = (page + 1) * rowsPerPage

	const cbBackEndPage = async () => {
		needToChangePage.current = true
		await callBackEndPage(page, onChangePage)
	}
	return (
		<div className={classes.footerTableCustomRoot}>
			<div className={classes.left}>
				<p>Rows: </p>
				<Select className={classes.select} value={rowsPerPage} onChange={onChangeRowsPerPage}>
					{rowsPerPageOptions.map((opt, index) => (
						<MenuItem key={index} value={opt}>
							{opt}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className={classes.center}>
				<IconButton
					onClick={() => {
						onClickChangePage(false)
					}}
					disabled={page === 0}
					component="span"
				>
					<NavigateBeforeIcon />
				</IconButton>
				<p>
					{page + 1}/{Math.ceil(count / rowsPerPage)}
				</p>
				{callBackEndPage && maxPage >= count ? (
					<p
						className={classes.loadmore}
						onClick={() => {
							onClickChangePage(true)
						}}
					>
						Load more
					</p>
				) : (
					<IconButton
						onClick={() => {
							onClickChangePage(true)
						}}
						disabled={maxPage >= count && !callBackEndPage}
						component="span"
					>
						<NavigateNextIcon />
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default FooterTableCustom
