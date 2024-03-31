import Link from 'next/link'; 
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { PostsContext } from '../../../helpers/postsContext';
import Image from 'next/image';
import styles from './index.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogPostDetail = () => {

  const router = useRouter();
  const { blogId } = router.query;
  const blogPosts = useContext(PostsContext);

  // Convert blogId to a number and find the corresponding post
  const post = blogPosts.find(p => p.id === parseInt(blogId, 10));

  if (!post) return <div>Post not found</div>;
  return (
    <div>
        <div className={styles.container}>
        <h1 className={styles.h1}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
        <Image className={styles.img} src={post.image} alt={post.title}/>
        {post.questions.map((questionObj, index) => (
          <div key={post.id}>
            <h3 className={styles.h3}>{`${index + 1}. ${questionObj.label}`}</h3>
            <p className={styles.p}>{questionObj.content}</p>
          </div>
        ))}
        <h4>{post.conclution}</h4>
        </div>
      </div>
  )
}

export default BlogPostDetail