import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Servings } from '@prisma/client';
import { IconAlertTriangle } from '@tabler/icons';
import { loadFoods } from './api/foods';
import { Nutriment, DateSelector, Header } from '../components';

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession();
  const [date, setDate] = useState(new Date());
  const [servings, setServings] = useState<Servings[]>();

  useEffect(() => {
    (async () => {
      const fetchedServings = await fetch(`/api/servings?${new URLSearchParams({
        date: date.toISOString(),
      })}`).then((res) => res.json());
      setServings(fetchedServings);
    })();
  }, [date]);

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
              serving={servings?.filter((s) => s.foodId === food.id)}
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
