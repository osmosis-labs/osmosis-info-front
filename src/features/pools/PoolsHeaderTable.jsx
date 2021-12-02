import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    poolsHeaderTableRoot: {},
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  };
});

const PoolsHeaderTable = ({ size = "ld", headCells, order, orderBy, handleRequestSort, sortable = true }) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.sortable ? (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
              className={headCell.classes}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  handleRequestSort(headCell.id);
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell.id} align={headCell.align} className={headCell.classes}>
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default PoolsHeaderTable;
