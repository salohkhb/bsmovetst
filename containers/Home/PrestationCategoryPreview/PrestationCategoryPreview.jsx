import {useState} from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import styles from '../index.module.css';
import {useAlert} from '../../../hooks/alert';
import {useRouter} from 'next/router';
import CategoryPreview from '../CategoryPreview/CategoryPreview';
import {shape, string} from 'prop-types';

const PrestationCategoryPreview = ({ category: { src, title = '', href } = {} }) => {
  const [raised, setRaised] = useState(false);
    const router = useRouter()
    const { handleAlertComingSoon } = useAlert()

    function toggleRaised() {
        return setRaised(prevRaised => !prevRaised);
    }

    function categoryOnClick() {
        if (href) {
            return router.push(href)
        }
        return handleAlertComingSoon()
    }

  return (
    <div className={styles.prestation_section_category_container}>
      <Card onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} onClick={categoryOnClick}>
        <div className={styles.prestation_section_category_thumbnail_container}>
          <CategoryPreview
            href={href}
            title={title}
            src={src}
          />
        </div>
        <div className={styles.prestation_section_category_content}>
          <div>{title}</div>
          <ArrowForwardIcon />
        </div>
      </Card>
    </div>
  );
}

PrestationCategoryPreview.propTypes = {
  category: shape({
    src: string,
    title: string,
    href: string
  })
}

export default PrestationCategoryPreview;