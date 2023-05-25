import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/modal';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className={css.galleryItem}>
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        onClick={() => setShowModal(!showModal)}
        className={css.imageGalleryItemImage}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={() => setShowModal(!showModal)}
        />
      )}
    </li>
  );
};

ImageGalleryItem.prototype = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
};
