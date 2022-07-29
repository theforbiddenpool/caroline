import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { loadFoods } from './api/foods';
import { Counter, DateSelector } from '../components';

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Caroline</title>
        <meta name="description" content="The web version of the Dr. Greger's app Daily Dozen, which helps you track if you getting enough servings of the healthiest foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-6xl font-medium text-center">Caroline</h1>
        <main className="w-3/5 mt-10 bg-gray-100">
          <DateSelector />
          {foods?.map((food) => (
            <div className="flex bg-zinc-50 p-5" key={food.id}>
              <h3 className="flex-grow capitalize">{food.name}</h3>
              <Counter total={food.quantity} />
            </div>
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
