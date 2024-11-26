import styles from '../index.module.css';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';
import {useState} from 'react';
import { string } from 'prop-types';
import { S } from '..';

const VehicleRentPresentationAccordion = ({ summary, content }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <article style={{ width: '100%' }}>
      <Accordion expanded={expanded === `panel-${summary}`} onChange={handleChange(`panel-${summary}`)} sx={{
            border: expanded ? '1px solid rgb(56, 199, 152)' : 'inherit'
          }}>
        <AccordionSummary
          expandIcon={expanded === `panel-${summary}` ? <Remove className={styles.vehicle_rent_faq__accordion_icon_active} /> : <Add />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>{summary}</h2>
        </AccordionSummary>
        <AccordionDetails>
          <S.Content>
            {content}
          </S.Content>
        </AccordionDetails>
      </Accordion>

    </article>
  )
}

VehicleRentPresentationAccordion.propTypes = {
  summary: string,
  content: string,
}

export default VehicleRentPresentationAccordion;