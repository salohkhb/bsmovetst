import Image from 'next/legacy/image';
import styles from '../index.module.css';
import { string } from 'prop-types';


const CategoryPreview = ({ title = '', src = '/images/logo.png' }) => {
  return (
      <div>
          <Image
              className={styles.prestation_section_category_thumbnail}
              layout="fill"
              src={src}
              alt={`category_${title}`}
          />
      </div>
  )
}

CategoryPreview.propTypes = {
  title: string,
  src: string,
}

export default CategoryPreview