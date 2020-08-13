import { useQuery, gql } from "@apollo/client";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
const FETCH_USERS = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;
type User = {
  id: String,
  name: String,
  email: String,
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "20px",
      marginTop: theme.spacing(2),
    },
  })
);
export default () => {
  const classes = useStyles();
  const usersRes = useQuery(FETCH_USERS);
  if (usersRes?.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <CircularProgress size={60} />
      </div>
    );
  }
  return (
    <div className="list">
      {usersRes?.data?.users?.map(({ id, name, email }: User) => (
        <Paper className={classes.paper} key={id}>
          <Link as={`/query/${id}`} href={"/query/[id]"}>
            <a>
              <Typography variant="h5">{name}</Typography>
            </a>
          </Link>
          <Typography variant="h6">{email}</Typography>
        </Paper>
      ))}
    </div>
  );
};
