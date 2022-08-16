import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { loadFoods } from './api/foods';
import { Nutriment, DateSelector, Header } from '../components';

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Caroline</title>
        <meta name="description" content="The web version of the Dr. Greger's app Daily Dozen, which helps you track if you getting enough servings of the healthiest foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center pb-8 min-h-screen">
        <Header />
        <main className="w-3/5 mt-10 bg-gray-100">
          <DateSelector />
          {foods?.map((food) => (
            <Nutriment data={food} key={food.id} />
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
