import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};

export default Loading;
