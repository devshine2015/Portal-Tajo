import React from 'react';
import Section from '../Section';
import PermissionForm from '../PermissionForm';
import PermissionsList from '../PermissionsList';

const RolesSection = () => (
  <Section
    listComponent={<PermissionsList />}
    formComponent={<PermissionForm />}
    actionButtonLabel="Add role"
    headerLabel="Roles"
  />
);

export default RolesSection;
