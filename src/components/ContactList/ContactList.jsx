import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(item => (
        <li className={css.item_contact} key={item.id}>
          {item.contact}: {item.number}
          <button
            type="button"
            name={item.contact}
            onClick={() => deleteContact(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
