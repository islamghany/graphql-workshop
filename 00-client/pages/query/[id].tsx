import { useQuery, gql } from "@apollo/client";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

const FETCH_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      address {
        city
        houseNum
        city
      }
    }
  }
`;
type User = {
  id: String,
  name: String,
  email: String,
  address: address,
};
type address = {
  street: String,
  houseNum: Number,
  city: String,
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "20px",
    },
  })
);

const User = () => {
  const router = useRouter();

  const userRes = useQuery(FETCH_USER, { variables: { id: router.query.id } });
  const classes = useStyles();
  if (userRes?.error) console.log(userRes.error);
  if (userRes?.loading) {
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
    <Paper className={classes.paper}>
      <Typography variant="h4">Name : {userRes?.data?.user?.name}</Typography>
      <Typography variant="h4">Email : {userRes?.data?.user?.email}</Typography>
      <Typography variant="h4">ID : {userRes?.data?.user?.id}</Typography>
      <Typography variant="h4">
        city : {userRes?.data?.user?.address?.city}
      </Typography>
    </Paper>
  );
};
export default User;
