import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from "./Table"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(`panel${props.season}`);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  const table = [];
  for (let [key, value] of Object.entries(props.seasons)) {
    table.push(
      <div className={classes.root}>
        <Accordion expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${key}bh-content`}
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{`Temporada ${key}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table episodes={value}></Table>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
  // handleChange(`panel${key}`)
  if (props.season) {
    handleChange(`panel${props.season}`)
  }


  return (
    <div>
      {table}
    </div>
  );
}