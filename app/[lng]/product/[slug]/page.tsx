import { generateMetadataFn } from '@/components/WithRealTimeUpdates/generateMetadataFn';
import { generateWrapper } from '@/components/WithRealTimeUpdates/generateWrapper';
import type { BuildVariablesFn } from '@/components/WithRealTimeUpdates/types';
import Content from './Content';
import RealTime from './RealTime';
import { type PageProps, type Query, type Variables, query } from './meta';
import getAvailableLocales from '@/app/i18n/settings';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { ProductStaticParamsDocument } from '@/graphql/types/graphql';

export async function generateStaticParams() {
  const locales = await getAvailableLocales();
  const { allProducts } = await queryDatoCMS(ProductStaticParamsDocument);

  return allProducts.flatMap((product) =>
    locales.map((locale): PageProps['params'] => ({
      slug: product.slug,
      lng: locale,
    })),
  );
}

const buildVariables: BuildVariablesFn<PageProps, Variables> = ({
  params,
  fallbackLocale,
}) => ({
  locale: params.lng,
  fallbackLocale: [fallbackLocale],
  slug: params.slug,
});

export const generateMetadata = generateMetadataFn<PageProps, Query, Variables>(
  {
    query,
    buildVariables,
    generate: (data) => data.product?.seo,
  },
);

const Page = generateWrapper<PageProps, Query, Variables>({
  query,
  buildVariables,
  contentComponent: Content,
  realtimeComponent: RealTime,
});

export default Page;
