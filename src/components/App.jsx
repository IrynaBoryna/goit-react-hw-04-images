import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/searchbar';
import { ImageGallery } from './ImageGallery/imageGallery';
import { fetchImagesWithQuery } from 'servises';
import { Button } from './Button/button';
import { Loader } from './Loader/loader';
import PropTypes from 'prop-types';

export function App() {
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (queryValue === '') {
      return;
    }
    setIsLoading(true);
    const Foo = async () => {
      try {
        const response = await fetchImagesWithQuery(page, queryValue);
        setImages(prevImages => [...prevImages, ...response]);
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    };
    Foo();
  }, [page, queryValue]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const onSabmitQuery = queryValue => {
    setPage(1);
    setQueryValue(queryValue);
    setImages([]);
  };

  return (
    <div style={divStyles}>
      <Searchbar onSubmit={queryValue => onSabmitQuery(queryValue)} />
      {error && <p>щось пішло не так...</p>}
      {isLoading ? <Loader /> : <ImageGallery images={images} />}
      {images.length > 0 && <Button onClick={onLoadMore} />}
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

App.prototype = {
  images: PropTypes.array,
  queryValue: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  pageNumber: PropTypes.number,
};
// const appStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr',
//   gridGap: 16,
//   paddingbottom: 24,
//   fontSize: 40,
// };
