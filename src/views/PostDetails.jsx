import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetails = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  let {id} = useParams();
useEffect(() => {
  const fetchPosts = async () => {
    const response = await axios.get('http://jsonplaceholder.typicode.com/posts/'+id);
    setPosts(response.data);
  };
  fetchPosts();
}, []);

//Fetch comments

useEffect(() => {
  const fetchComments = async () => {
    const response = await axios.get('http://jsonplaceholder.typicode.com/posts/'+id+'/comments');
    setComments(response.data);
  };
  fetchComments();
}, []);


console.log(id)
  return(
  // <div className='w-full py-14 flex flex-col justify-center items-center'>
  // <div className='w-1/3  text-center  '>
  //   <h1 className="mb-2 py-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white">{posts.title}</h1>
  //   <p className="mb-2 pb-32 text-lg font-normal text-gray-500 lg:text-xl sm:px-2 lg:px-8 dark:text-gray-400">{posts.body}</p>
  //   <Link className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" to="/">Back to Posts List</Link>
  // </div>
  // </div>


<div className= "mt-20 px-64 flex flex-col justify-center items-center">

  <div className="w-full flex-col items-center p-6 bg-white r border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{posts.title}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{posts.body}</p>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Comment Section: </h5>
      {comments.map(comment => (
      <div className=' border-b-4	justify-center items-center'>
      <h5 className="mb-2 m-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Name: </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comment.name}</p>
      <h5 className="mb-2 m-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Email:</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comment.email}</p>

      <h5 className="mb-2 m-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Body:</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{comment.body}</p>

      </div>
      ))}
      
      <Link to="/" className="inline-flex mt-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg className="rtl:rotate-180 rotate-180 mx-2 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          Back to List
          
      </Link>
  </div>
  </div>
  )
}

export default PostDetails;
