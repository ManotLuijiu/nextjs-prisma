import '../styles/globals.css';
import '@reach/combobox/styles.css';

import React, { useRef } from 'react';
import { setLogger, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import * as Sentry from '@sentry/react';

// Sentry.init({ dsn: "https://" })

// Log with Sentry
// setLogger({
//   error: (error) => {
//     Sentry.captureException(error);
//   },
// });
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  // const queryClientRef = useRef();
  // if (!queryClientRef.current) {
  //   queryClientRef.current = new QueryClient();
  // }

  return (
    <>
      <Component {...pageProps} />
      {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
    </>
  );
}
