import React from 'react';
import Section from '../Section';
import RoleForm from '../RoleForm';
import RolesList from '../RolesList';

const RolesSection = () => (
  <Section
    listComponent={<RolesList />}
    formComponent={<RoleForm />}
    actionButtonLabel="Add role"
    headerLabel="Roles"
  />
);

export default RolesSection;
