'use client';

import type {
  MenuQuery,
  MenuQueryVariables,
  SiteLocale,
} from '@/graphql/types/graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import Header from '.';

const RealTimeHeader = ({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: MenuQuery;
  query: TypedDocumentNode<MenuQuery>;
  variables: MenuQueryVariables;
}) => {
  const { data, error, status } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return null;

  return <Header lng={locale} data={data} />;
};

export default RealTimeHeader;
