import type { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { IconAlertTriangle } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { Serving } from '../types';
import { Nutriment, DateSelector, Header } from '../components';
import { loadFoods } from './api/foods';
import { getServings } from '../services/client/servings';

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession();
  const { t } = useTranslation();

  const [date, setDate] = useState(new Date());
  const [servings, setServings] = useState<Serving[]>();

  useEffect(() => {
    (async () => {
      const fetchedServings = await getServings(date);
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
              <IconAlertTriangle size={18} className="inline-block mr-1 align-text-bottom" role="presentation" />
              {' '}
              {t('you\'re currently not signed in')}
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

/**
 * This ignore is necessary, because ctx must not have any type defined. Otherwise,
 * InferGetServerSidePropsType in the above component will not work. The resulting type
 * of, in this case, the foods prop will be never.
 */
// @ts-ignore
export const getStaticProps = async (ctx) => {
  const { locale } = ctx;

  try {
    const foods = await loadFoods();

    return {
      props: {
        foods,
        ...(await serverSideTranslations(locale, ['translations'])),
      },
    };
  } catch (err) {
    return {
      props: {
        foods: [],
        ...(await serverSideTranslations(locale, ['translations'])),
      },
      notFound: true,
    };
  }
};

export default Home;
