import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [queryValue, setQueryValue] = useState('');

  const handleInputChange = evt => {
    setQueryValue(evt.currentTarget.value.toLowerCase());
  };

  const handleInputSubmit = evt => {
    evt.preventDefault();
    if (queryValue.trim() === '') {
      return toast('Введіть запит');
    }
    onSubmit(queryValue);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleInputSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          name="queryValue"
          value={queryValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
Searchbar.prototype = {
  queryValue: PropTypes.string,
};