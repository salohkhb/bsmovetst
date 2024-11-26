import HomePrestationsSection from "../Home/HomePrestationsSection/HomePrestationsSection";
import messages from "./messages";
import EstimateSection from '../../components/Home/EstimateSection/index'
import CompetencesSection from '../../components/Home/CompetencesSection/index'
import MeubleSection from '../../components/Home/MeubleSection/index'
import styles from '../../components/Home/index.module.css'


const VairesSurMarne = () => {
  return (
    <div className={styles.container}>
      <EstimateSection messages={messages} />
      <HomePrestationsSection />
      <CompetencesSection messages={messages}/>
      <MeubleSection messages={messages}/>
    </div>
  )
}

export default VairesSurMarne