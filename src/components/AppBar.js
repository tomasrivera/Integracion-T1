import React, {useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from './searchBox';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  color: {
      colorDefault: "red"
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (searchName) {
      fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${searchName.replace(" ", "+")}`)
        .then(res => res.json())
        .then(res => setSearchResult(res))
    } else {
      setSearchResult([])
    }
  }, [searchName]);
    
  const container = React.createRef();
  useEffect(() => {
    const handle = (event) => handleClickOutside(event, container, setShow, show);
    // subscribe event
    document.addEventListener("click", handle);
    return () => {
      // unsubscribe event
      document.removeEventListener("click", handle);
    };
  });

  
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#5b8a72' }}>
        <Toolbar>
            
        <Link to="/">
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <HomeIcon />
          </IconButton>
        </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Tarea 1
          </Typography>
        <div className={classes.grow} />

        <div>
            <div className={classes.search} ref={container}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchName}
                onChange={event => onChangeHandle(event.target.value, setSearchName, setShow)}
              />
            </div>
          <SearchBox data={searchResult} show={show} setShow={setShow}></SearchBox>
        </div>
        
        </Toolbar>
      </AppBar>
    </div>
  );
};

function onChangeHandle(value, setName, setShow) {
  setName(value);
  if (value) {
    setShow(true)
  } else {
    setShow(false)
  }
}

const handleClickOutside = (event, container, set, open) => {
  if (container.current && !container.current.contains(event.target)) {
      set(false)
  } else if (container.current && container.current.contains(event.target)) {
      set(true)
  }
};
