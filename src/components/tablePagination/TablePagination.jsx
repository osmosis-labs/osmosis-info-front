import { IconButton, makeStyles, MenuItem, Select } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const useStyles = makeStyles((theme) => {
  return {
    tablePaginationRoot: {
      paddingTop: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontSize: "14px",
    },
    select: {
      margin: `0 ${theme.spacing(1)}px`,
    },
    left: {
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
  };
});

const TablePagination = ({ rowsPerPageOptions, count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  const classes = useStyles();
  const onChangePage = (next) => {
    if (next) {
      if ((page + 1) * rowsPerPage < count) {
        onPageChange(page + 1);
      }
    } else {
      if (page > 0) {
        onPageChange(page - 1);
      }
    }
  };
  const maxPage = (page + 1) * rowsPerPage;
  return (
    <div className={classes.tablePaginationRoot}>
      <div className={classes.left}>
        <p>Rows: </p>
        <Select className={classes.select} value={rowsPerPage} onChange={onRowsPerPageChange}>
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
            onChangePage(false);
          }}
          disabled={page === 0}
          component="span"
        >
          <NavigateBeforeIcon />
        </IconButton>
        <p>
          {page + 1}/{Math.round(count / rowsPerPage + 1)}
        </p>
        <IconButton
          onClick={() => {
            onChangePage(true);
          }}
          disabled={maxPage >= count}
          component="span"
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TablePagination;
