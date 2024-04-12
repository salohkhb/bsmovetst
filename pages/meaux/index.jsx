import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Meaux from "../../containers/Meaux";
const MeauxPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Meaux - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Meaux? BS Move déménagement propose des services de location de camion avec chauffeur, location de monte-meuble et vente de cartons de déménagement à prix compétitif. Que vous soyez gendarme ou particulier, profitez de nos solutions pratiques et économiques pour un déménagement sans souci à Meaux."
      keywords='Déménagement Meaux, Location de camion avec chauffeur Meaux, Location de monte-meuble Meaux, Achats de carton de déménagement Meaux, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='meaux'
    >
      <NavHeader />
      <Meaux />
      <Footer />
    </Layout>
  )
}

export default MeauxPage