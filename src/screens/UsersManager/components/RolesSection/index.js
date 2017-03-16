import React from 'react';
import Section from '../Section';
import RoleForm from '../RoleForm';
import PermissionsList from '../PermissionsList';

const RolesSection = () => (
  <Section
    listComponent={<PermissionsList />}
    formComponent={<RoleForm />}
    actionButtonLabel="Add role"
    headerLabel="Roles"
  />
);

export default RolesSection;
