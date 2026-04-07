import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus && userData) {
            appwriteService.getPosts(userData.$id).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [authStatus, userData]);

    //  Not logged in
    if (!authStatus) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-2xl font-bold'>
                        Please login to view your posts 
                    </h1>
                </Container>
            </div>
        )
    }

    //  Logged in but no posts
    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-2xl font-bold'>
                        You have no posts yet 
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Start by creating your first post
                    </p>

                    <button
                        onClick={() => navigate('/add-post')}
                        className='mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                    >
                        Create Post
                    </button>
                </Container>
            </div>
        )
    }

    //  Show posts
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home


















// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
// import {Container, PostCard} from '../components'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home



// import React, { useEffect, useState } from 'react'
// import appwriteService from "../appwrite/config"
// import { Container, PostCard } from '../components'

// function Home() {
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     appwriteService.getPosts().then((res) => {
//       if (res) setPosts(res.documents)
//     })
//   }, [])

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-8 mt-4 text-center">
//         <Container>
//           <div className="flex flex-wrap justify-center">
//             <div className="p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
//               <h1 className="text-2xl font-bold hover:text-gray-500">
//                 Login to read posts
//               </h1>
//             </div>
//           </div>
//         </Container>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full py-8">
//       <Container>
//         <div className="flex flex-wrap -mx-2">
//           {posts.map((post) => (
//             <div
//               key={post.$id}
//               className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
//             >
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   )
// }

// export default Home
