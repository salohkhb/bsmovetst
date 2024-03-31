
import BlogPostDetail from '../../containers/Blog/Details/index'
import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Testemonial from '../../containers/Blog/Testemonial/index'


const BlogPostDetailPage = ({cookies}) => {
  return (
    <Layout cookies={cookies}
      title='BS Move Déménagement - Blog Détails'
      description='Découvrez les dernières actualités de BS Move Déménagement, les articles, les conseils, les astuces, les nouveautés, les offres, les promotions, les événements, les services, les produits, les partenariats, les projets, les réalisations, les témoignages, les avis, les retours, les recommandations, les suggestions, les informations, les guides, les tutoriels, les vidéos, les photos, les images, les infographies, les statistiques, les comparatifs, les analyses, les études, les rapports, les enquêtes, les interviews'
      keywords='BS Move, Déménagement, Blog, Actualités, Articles, Conseils, Astuces, Nouveautés, Offres, Promotions, Événements, Services, Produits, Partenariats, Projets, Réalisations, Témoignages, Avis, Retours, Recommandations, Suggestions, Informations, Guides, Tutoriels, Vidéos, Photos, Images, Infographies, Statistiques, Comparatifs, Analyses, Études, Rapports, Enquêtes, Interviews'
      pageId='blog details'
    >
      <NavHeader />
      <BlogPostDetail />
      <Testemonial />
      <Footer />
    </Layout>
  );
}

export default BlogPostDetailPage;