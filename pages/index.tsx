import type { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IconAlertTriangle } from '@tabler/icons';
import type { Serving } from '../types';
import { loadFoods } from './api/foods';
import { getServings } from '../services/client/servings';
import { Nutriment, DateSelector, Header } from '../components';

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession();
  const [date, setDate] = useState(new Date());
  const [servings, setServings] = useState<Serving[]>();

  useEffect(() => {
    if (!session) {
      return;
    }

    (async () => {
      const fetchedServings = await getServings(date);
      setServings(fetchedServings);
    })();
  }, [date, session]);

  return (
    <>
      <Head>
        <title>Caroline</title>
        <meta name="description" content="The web version of the Dr. Greger's app Daily Dozen, which helps you track if you getting enough servings of the healthiest foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center pb-8 min-h-screen">
        <Header />
        <main className="w-3/5 mt-10">
          {!session && status !== 'loading' && (
            <div className="px-3 py-5 mb-5 bg-red-400 text-center">
              <IconAlertTriangle className="inline-block mr-1 align-text-bottom" size={18} />
              {' '}
              You&apos;re currently not signed in. No data will be saved!
            </div>
          )}
          <DateSelector date={date} setDate={setDate} />
          {foods?.map((food) => (
            <Nutriment
              data={food}
              date={date}
              serving={servings?.filter((s) => s.foodId === food.id)[0]}
              key={food.id}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const foods = await loadFoods();

    return { props: { foods } };
  } catch (err) {
    return { props: { foods: [] }, notFound: true };
  }
};

export default Home;
