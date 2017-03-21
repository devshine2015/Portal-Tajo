import React from 'react';
import Section from '../Section';
import UserForm from '../UserEditor';
import UsersList from '../UsersList';

const UsersSection = () => (
  <Section
    listComponent={<UsersList />}
    formComponent={<UserForm />}
    actionButtonLabel="Add user"
    headerLabel="Users"
  />
);

export default UsersSection;
