import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        right: 0,
        height: 'auto',
        width: '50%',
        zIndex: 2,
        backgroundColor: '#5b8a72',
    },
    character: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
    },
    avatar: {
        marginRight: 15,
    },
    text: {
        color: 'white',
    }
}))

export default function TextBox(props) {
    console.log(props.refC)
    const {data} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const res = data.map((char) => {
        return(
            <Link to={`/character/${char.name}`}>
                <div className={classes.character}>
                    <Avatar className={classes.avatar} alt={char.name} src={char.img} />
                    <Typography className={classes.text} variant="h6" noWrap>
                        {char.name}
                    </Typography>
                </div>
            </Link>
        ) 
    })

    // useEffect(() => {
    //     // subscribe event
    //     document.addEventListener("mousedown", (event) => handleClickOutside(event, props.refC, setOpen, open));
    //     return () => {
    //       // unsubscribe event
    //       document.removeEventListener("mousedown", (event) => handleClickOutside(event, props.refC, setOpen, open));
    //     };
    //   }, [props.refC, open]);

    if (!open) {
        return <div></div>
    }
    return (
        <Container classes={{root: classes.container,}}>
            {res}
        </Container>
    )
}

const handleClickOutside = (event, container, set, open) => {
    console.log("click", open, container.current)
    if (open && container.current && !container.current.contains(event.target)) {
        console.log("press outside false")
        set(false)
    } else if (!open || (container.current && container.current.contains(event.target))) {
        console.log("press outside true")
        set(true)
    }
  };