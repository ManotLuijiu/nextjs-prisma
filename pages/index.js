import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import {
  useQuery,
  useMutation,
  useIsFetching,
  QueryClientProvider,
  QueryClient,
} from 'react-query';
import Head from 'next/head';
import { Nav, Search, Locate, AlertWindow, Header, Footer } from '../components';
import mapStyles from '../mapStyles';

const queryClient = new QueryClient();

const libraries = ['places'];
const mapContainerStyle = {
  height: '80vh',
  width: '100vw',
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// Phuket location
// 7.952422552791356, 98.33815315623018
// 7.890571380932959, 98.36671148105323
const center = {
  lat: 7.890571380932959,
  lng: 98.36671148105323,
};

/**
 *
 * @returns function GET request
 * @route /api/sightings
 * @method GET
 * @headers null
 */
async function fetchSightingsRequest() {
  const response = await fetch('/api/sightings');
  if (!response.ok) {
    throw new Error('/api/sightings response was not ok');
  }
  // console.log(await response.json());
  const { sightings } = await response.json();
  return sightings;
}
// fetchSightingsRequest();

/**
 *
 * @param sightingData
 * @returns function POST request
 * @route /api/sightings/create
 * @method POST
 * @headers 'Content-Type': 'application/json'
 *
 */
async function createSightingRequest(
  sightingData,
  // Mock up data
  // sightingData = {
  //   sighting: {
  //     latitude: 25,
  //     longitude: 30,
  //   },
  // },
) {
  const response = await fetch('/api/sightings/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sighting: sightingData }),
  });
  // console.log(await response.json());
  const { sighting } = await response.json();
  return sighting;
}
// createSightingRequest();

function useCreateSighting() {
  return useMutation(createSightingRequest, {
    onMutate: (sightingData) => {
      // 1) cancel queries
      queryClient.cancelQueries('sightings');

      // 2) save snapshot (previous sightings)
      const snapshot = queryClient.getQueryData('sightings');
      // console.log('snapshot', snapshot);

      // 3) optimistically update cache to the new value
      queryClient.setQueryData('sightings', (prev) => [
        ...prev,
        {
          id: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          ...sightingData,
        },
      ]);

      // 4) return rollback function which reset cache back to snapshot
      return () => queryClient.setQueryData('sightings', snapshot);
      // return { snapshot };
    },

    onError: (error, sightingData, rollback) => {
      // An error happened
      console.log(`error: ${error} on ${sightingData}, rolling back optimistic update`);
      rollback();
    },

    // onSettled: () => queryCache.invalidateQueries('sightings'),
    onSettled: (data, error, sightingData, context) => {
      if (error) {
        console.error(error);
      }
      // console.log('data', data);
      // console.log('sightingData', sightingData);
      // console.log('context', context);
      queryClient.invalidateQueries('sightings');
    },
  });
}

const App = () => {
  // const isFetching = useIsFetching();
  // console.log('isFetching', isFetching);
  // console.log(typeof 'isFetching', isFetching);

  const { data: sightings } = useQuery('sightings', fetchSightingsRequest);
  // console.log({ data: sightings });
  // console.log(typeof { data: sightings });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);

  const createSighting = useCreateSighting().mutateAsync;
  // console.log('createSighting', createSighting);
  // console.log(typeof createSighting);

  const onMapClick = useCallback((e) => {
    // console.log(e.latLng.lat());
    // console.log(e.latLng.lng());
    const data = { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    createSighting(data);
    // createSighting({
    //   latitude: e.latLng.lat(),
    //   longitude: e.latLng.lng(),
    // });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading map...';

  return (
    <>
      <Head>
        <title>แหล่งน้ำจืด</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <section className="w-full xl:container mx-auto items-center justify-center text-gray-600 relative">
        <div className="text-2xl absolute xl:left-50 top-4 left-10 z-10">
          <Header />
        </div>
        <div className="absolute xl:right-50 top-6 right-10 z-20">
          <Locate panTo={panTo} />
        </div>
        <div className="absolute xl:right-30 top-4 right-20 z-10">
          <Search panTo={panTo} />
        </div>
        <div className="xl:container my-12 px-6 mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center">
          <div className="w-full h-3/5 rounded-lg flex relative">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={options}
              onClick={onMapClick}
              onLoad={onMapLoad}>
              {Array.isArray(sightings) &&
                sightings.map((sighting) => (
                  <Marker
                    key={sighting.id}
                    position={{ lat: sighting.latitude, lng: sighting.longitude }}
                    onClick={() => setSelected(sighting)}
                    icon={{
                      url: `/pond.svg`,
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                ))}

              {selected && <AlertWindow selected={selected} close={() => setSelected(null)} />}
            </GoogleMap>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const hof = (WrappedComponent) => {
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(App);
