import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetails from './PostDetails';
import { Link } from 'react-router-dom';


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  function deleteRow(id){
    setPosts(posts.filter((row)=> row.id!==id))
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setTotalPages(Math.ceil(response.data.length / postsPerPage));
    };
    fetchPosts();
  }, []);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

 // Next page
 const nextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage(currentPage + 1);
   }
 };

 // Previous page
 const prevPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };

 // Handle search
 const handleSearch = event => {
   setSearchTerm(event.target.value);
   setCurrentPage(1); // Reset to first page when search term changes
 };

 // Filter posts based on search term
 const filteredPosts = posts.filter(post =>
   post.title.toLowerCase().includes(searchTerm.toLowerCase())
 );

//  // Handle post click
//  const handlePostClick = postId => {
//   const post = posts.find(post => post.id === postId);
//   setSelectedPost(post);
// };

  return (
    <div className='p-10 '>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">List of Available posts</h1>
      <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-2 lg:px-8 dark:text-gray-400">Explore endless amount of posts and navigate through details by clicking on desired Post</p>
     
      {/* Search bar */}
      <div className='w-1/2 px-2 py-4'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" value={searchTerm} onChange={handleSearch} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Posts" required />
          </div>
        </div>
      {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      /> */}
      
      <div className='relative rounded-lg overflow-x-auto'>
     
      <table className='w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {/* <th scope='col' className='px-6 py-3">'>User ID</th> */}
            <th scope='col' className="px-6 text-sm py-3">ID</th>
            <th scope='col' className="px-6 text-sm py-3">Title</th>
            {/* <th scope='col' className='px-6 py-3">'>Body</th> */}
            <th scope='col' className="px-6 text-sm py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          
        {filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(post => (
            <tr className="bg-white hover:bg-gray-600 border-b dark:bg-gray-800 dark:border-gray-700" key={post.id}>

              {/* <td className="px-6 py-4">{post.userId}</td> */}
              <td className="px-6 py-4">{post.id}</td>
              <td className="px-6 py-4">{post.title}</td>
              {/* <td className="px-6 py-4">{post.body}</td> */}
              <td className="px-6 py-4">
              {/* <button type="button" onClick={() => handlePostClick(post.id)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Details</button> */}
              <Link to={`/post/${post.id}`}>Details</Link>
              
              <button onClick={()=> deleteRow(post.id)} type="button" className="ml-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Pagination */}
      <div className='my-8 flex flex-row justify-center items-center'>
      <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
              <li key={index}>
                <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li>
          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
  </div>
  {/* {selectedPost && <PostDetails post={selectedPost}/>} */}

</div>
  );
};

export default PostList;
