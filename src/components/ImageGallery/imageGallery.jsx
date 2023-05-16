import { useState, useEffect } from 'react';
import { fetchImagesWithQuery } from 'servises';
import { Loader } from '../Loader/loader';
import { Modal } from '../Modal/modal';
import { ImageGalleryItem } from '../ImageGalleryItem/imageGalleryItem';
import css from '../ImageGallery/imageGallery.module.css';
import { Button } from '../Button/button';
import PropTypes from 'prop-types';

export function ImageGallery({ queryValue }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [activeInd, setActiveInd] = useState(0);

  useEffect(() => {
    if (page === 0) {
      return;
    }
    if (page > 1) {
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
    }
  }, [page]);

  useEffect(() => {
    if (queryValue === '') {
      return;
    }
    setImages('');
    setPage(1);
    setIsLoading(true);
    const Foo = async () => {
      try {
        const response = await fetchImagesWithQuery(1, queryValue);
        setImages(prevImages => [...prevImages, ...response]);
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    };
    Foo();
  }, [queryValue]);

  const activeImage = index => {
    setShowModal(!showModal);
    setActiveInd(index);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const imageModal = images[activeInd];

  return (
    <>
      {error && <p>щось пішло не так...</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, tags }, index) => (
            <ImageGalleryItem
              id={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() => activeImage(index)}
            />
          ))}
        </ul>
      )}
      {showModal && (
        <Modal
          largeImageURL={imageModal.largeImageURL}
          tags={imageModal.tags}
          onClose={() => setShowModal(!showModal)}
        />
      )}
      {images.length > 0 && <Button onClick={onLoadMore} />}
    </>
  );
}

ImageGallery.prototype = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  images: PropTypes.array,
  queryValue: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  pageNumber: PropTypes.number,
  activeInd: PropTypes.number,
};
