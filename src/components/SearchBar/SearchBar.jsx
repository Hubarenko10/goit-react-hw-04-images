import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { Header, Form, FormBtn, BtnLabel, Input} from './SearchBarStyle';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value;
    onSubmit({ searchQuery });
    e.target.reset();
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <FormBtn type="submit">
          <FiSearch />
          <BtnLabel>Search</BtnLabel>
        </FormBtn>

        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
