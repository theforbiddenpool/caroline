import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { loadFoods } from './api/foods';
import { Counter } from '../components';

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
};

function Home({ foods }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Caroline</title>
        <meta name="description" content="The web version of the Dr. Greger's app Daily Dozen, which helps you track if you getting enough servings of the healthiest foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center p-8 h-screen">
        <h1 className="text-6xl font-medium text-center">Caroline</h1>
        <main className="w-3/5 mt-10 bg-gray-100">
          <nav className="text-right p-3 bg-lime-200">
            <button type="button" className="mx-2 align-middle" aria-label="previous"><IconChevronLeft size={15} className="" role="presentation" /></button>
            <span>{(new Date()).toLocaleDateString('en-US', dateOptions)}</span>
            <button type="button" className="mx-2 align-middle" aria-label="next"><IconChevronRight size={15} className="align-bottom" role="presentation" /></button>
          </nav>
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
