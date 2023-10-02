import React from 'react'
import {type NextPageWithLayout } from '../_app';
import Layout from '~/features/ui/components/layouts/Admin';

const IndexAdminPage : NextPageWithLayout = () => {
  return (
    <div>IndexAdminPage</div>
  )
};

IndexAdminPage.getLayout = Layout

export default IndexAdminPage