import { useContext } from 'react';
import BlogPostDetail from '../../containers/Blog/Details/index'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Testemonial from '../../containers/Blog/Testemonial/index'
import { PostsContext } from '../../helpers/postsContext';

const BlogPostDetailPage = ({cookies}) => {
  const router = useRouter(); // Initialize useRouter
  const { blogId } = router.query; // Extract blogId from router query
  const blogPosts = useContext(PostsContext);
  const post = blogPosts.find(p => p.id === parseInt(blogId, 10));

  if (!post) return <div>Post not found</div>;
  return (
    <Layout cookies={cookies}
      title={`BS Move - ${post.metatitle}`}
      description={post.description}
      keywords={post.keywords}
      pageId='blog details'
    >
      <BlogPostDetail title={`BS Move Déménagement - ${post.title}`} description={post.description} post={post}/>
      <Testemonial />
      <Footer />
    </Layout>
  );
}

export default BlogPostDetailPage;
