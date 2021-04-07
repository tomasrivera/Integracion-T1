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
  const [found, setFound] = useState(true);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name.replace(" ", "+")}`)
      .then(res => res.json())
      .then(res => res.length > 1 ? [] : res)
      .then(res => {
        if (res.length === 0) {
          setFound(false)
        }
        return res
      })
      .then(res => setRes(res[0]))
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${name.replace(" ", "+")}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setQuotes(res))
  }, [name]);
  const classes = useStyles();

  if (!found) {
    return <h2>No encontrado</h2>
  }

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
              <br></br>
              {(res.appearance.length > 0) && <Typography variant="body2" component="p">
                Temporadas Breaking Bad:
              </Typography>}
              {res.appearance.map((num) =>
              <Typography variant="body2" component="p">
                  {"- "}
                  <Link to={`/breakingBad/${num}`}>
                  {num}
                  </Link>
              </Typography>
                )}
                {(res.better_call_saul_appearance.length > 0) && <Typography variant="body2" component="p">
                Temporadas Better Call Saul:
              </Typography>}
              {res.better_call_saul_appearance.map((num) =>
              <Typography variant="body2" component="p">
                  {"- "}
                  <Link to={`/betterCallSaul/${num}`}>
                  {num}
                  </Link>
              </Typography>
                )}
              <br></br>
              <Typography className={classes.pos} color="textSecondary">
                Citas:
              </Typography>
              {quotes.map((quote) =>
              <Typography variant="body2" component="p">
                  {"- "}
                  {quote.quote}
              </Typography>)}
            </CardContent>
          </Card>
          </div>
        );

}
