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
});


export default function Episodes(props) {
  let { id } = useParams();
  const [res, setRes] = useState(0);
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${id}`)
      .then(res => res.json())
      .then(res => setRes(res[0]))
  }, [id]);
    // .then(console.log)
  // console.log(title)
  const classes = useStyles();

  if (!res) {
    return <h2>Loading</h2>
  }

  return(
          <div>
            <br></br>
            <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Temporada {res.season}
              </Typography>
              <Typography variant="h5" component="h2">
                {res.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Capítulo {res.episode}
              </Typography>
              <Typography variant="body2" component="p">
                Fecha: {textDate(res.air_date)}
              </Typography>
              <Typography variant="body2" component="p">
                Personajes:
              </Typography>
              {res.characters.map((char) =>
                <Typography variant="body2" component="p">
                  {"- "}
                  <Link to={`/character/${char}`}>
                  {char}
                  </Link>
                </Typography>
              )}
            </CardContent>
          </Card>
          </div>
        );

}

function textDate(timestamp) {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const date = new Date(timestamp);
  return `${date.getDate() + 1} de ${months[date.getMonth()]}, ${date.getFullYear()}`
}