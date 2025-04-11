
import React from 'react';
import Layout from '@/components/layout/Layout';
import DocumentsHeader from '@/components/documents/DocumentsHeader';
import DocumentsTable from '@/components/documents/DocumentsTable';

const Documents = () => {
  return (
    <Layout>
      <DocumentsHeader />
      <DocumentsTable />
    </Layout>
  );
};

export default Documents;
