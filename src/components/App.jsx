import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/searchbar';
import { ImageGallery } from './ImageGallery/imageGallery';

export function App() {
  const [queryValue, setQueryValue] = useState('');
  
  return (
    <div style={divStyles}>
      <Searchbar
        onSubmit={(queryValue) =>
          setQueryValue(queryValue)}
      />
      <ImageGallery
        queryValue={queryValue}
      />
      <ToastContainer />
    </div>
  );
}


const divStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  fontSize: 40,
  color: '#010101',
  flexDirection: 'column',
};

// const appStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr',
//   gridGap: 16,
//   paddingbottom: 24,
//   fontSize: 40,
// };
