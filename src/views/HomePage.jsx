import React from 'react';
import PostList from './PostList';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center px-1.2 py-24'>
     
     <div className='p-10 w-full flex flex-col px-64 justify-center items-center '>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hello, Welcome to my project</h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-2 lg:px-8 dark:text-gray-400">Explore all posts and comments with onnly one CLICK</p>
      <Link to={`/postlist`} className="w-32  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">PostList</Link>
      {/* <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button> */}

     </div>
    </div>
  );
};

export default HomePage;
