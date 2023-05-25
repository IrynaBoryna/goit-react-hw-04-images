import { useState } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/imageGalleryItem';
import css from '../ImageGallery/imageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => setShowModal(!showModal)}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  images: PropTypes.array,
  showModal: PropTypes.bool,
};
