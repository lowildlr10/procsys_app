import { getPermissions, getUser } from '@/actions/user';
import DivisionSectionClient from '@/components/DivisionSection';
import { LayoutSidebarClient } from '@/components/Generic/LayoutSidebar';
import MainContainerClient from '@/components/Generic/MainContainer';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: 'Procurement System - Divisions',
  description: 'Procurement System - Divisions',
};

const DivisionPage = async () => {
  const user: UserType = await getUser();
  const permissions: string[] = await getPermissions();

  if (!user) redirect('/login');

  return (
    <LayoutSidebarClient
      user={user}
      permissions={permissions}
      type={'settings'}
    >
      <MainContainerClient title={'User Management - Divisions and Sections'}>
        <DivisionSectionClient permissions={permissions} />
      </MainContainerClient>
    </LayoutSidebarClient>
  );
};

export default DivisionPage;
