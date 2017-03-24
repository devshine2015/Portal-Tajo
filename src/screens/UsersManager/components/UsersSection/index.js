import React from 'react';
import Section from '../Section';
import UserForm from '../NewUserForm';
import UsersList from '../UsersList';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

function renderForm(options) {
  return <UserForm {...options} />;
}

const UsersSection = ({
  translations,
}) => (
  <Section
    listComponent={<UsersList />}
    renderForm={renderForm}
    actionButtonLabel={translations.add_user}
    headerLabel={translations.users}
  />
);

UsersSection.propTypes = {
  translations: phrasesShape.isRequired,
};

export default translate(phrases)(UsersSection);
