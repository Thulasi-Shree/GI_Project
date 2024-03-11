import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - Grand India`}</title>
    </Helmet>
  );
}
