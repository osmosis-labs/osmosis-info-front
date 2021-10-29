import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    paperRoot: {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
      backgroundColor: `${theme.palette.primary.light}`,
      opacity: "0.9",
    },
  };
});

const Paper = ({ children, className }) => {
  const classes = useStyles();

  return <div className={`${classes.paperRoot} ${className}`}>{children}</div>;
};

export default Paper;
