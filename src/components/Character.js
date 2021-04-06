import React, {useState, useEffect} from "react";
import {
  useParams,
  Link,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: '100%',
    width: '100%',
    objectFit: 'contain'
  },
  imageContainer: {
      height: 250,
  }
});


export default function Character(props) {
  let { name } = useParams();
  const [res, setRes] = useState(0);
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name.replace(" ", "+")}`)
      .then(res => res.json())
      .then(res => {
          return res
      })
      .then(res => setRes(res[0]))
  }, [name]);
  const classes = useStyles();

  if (!res) {
    return <h2>Loading</h2>
  }

  return(
          <div>
            <br></br>
            <Card className={classes.root} variant="outlined">
            <CardContent>
                {/* <Container className={classes.imageContainer}> */}
                    {/* <CardMedia
                    style={{height: 240, objectFit: 'contain'}}
                    className={classes.media}
                    image={res.img}
                    title="Character image"
                    /> */}
                {/* </Container> */}
                <img style={{height: 240, marginLeft: 'auto', marginRight: 'auto', width: '100%', objectFit: 'contain'}} src={res.img} alt={res.name} />
              <Typography variant="h5" component="h2">
                {res.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Nickname: {res.nickname}
              </Typography>
              <Typography variant="body2" component="p">
                Roles: {res.occupation.join(", ")}
              </Typography>
              <Typography variant="body2" component="p">
                Actor/Actriz: {res.portrayed}
              </Typography>
              <Typography variant="body2" component="p">
                Estado: {res.status}
              </Typography>
              <Typography variant="body2" component="p">
                Temporadas Breaking Bad:
              </Typography>
              {res.appearance.map((num) =>
              <Typography variant="body2" component="p">
                  {"- "}
                  <Link to={`/breakingBad/${num}`}>
                  {num}
                  </Link>
              </Typography>
                )}
                <Typography variant="body2" component="p">
                Temporadas Better Call Saul:
              </Typography>
              {res.better_call_saul_appearance.map((num) =>
              <Typography variant="body2" component="p">
                  {"- "}
                  <Link to={`/betterCallSaul/${num}`}>
                  {num}
                  </Link>
              </Typography>
                )}
            </CardContent>
          </Card>
          </div>
        );

}
