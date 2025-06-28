import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/database.service'
import Loading from '../components/loader/Loading'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        databaseService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((err) => {
                console.log("Home :: Error ::", err);
            })
            .finally(() => setLoading(false));
    }, []);


    return !loading ? (
        posts ? (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-4 w-1/4'>
                                <PostCard post={post} featuredImage={post["featured-Image"]} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        ) : (
            <>No Post is Available</>
        )
    ) : (<Loading /> || <>To Read Blog Login!</>)
}

export default Home