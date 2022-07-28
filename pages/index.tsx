import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {
  IconMinusVertical, IconPlus, IconMinus, IconChevronLeft, IconChevronRight,
} from '@tabler/icons';
import { loadFoods } from './api/foods';

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
          <nav className="text-right p-3">
            <button type="button" className="mx-2 align-middle" aria-label="previous"><IconChevronLeft size={15} className="" role="presentation" /></button>
            <span>{(new Date()).toLocaleDateString('en-US', dateOptions)}</span>
            <button type="button" className="mx-2 align-middle" aria-label="next"><IconChevronRight size={15} className="align-bottom" role="presentation" /></button>
          </nav>
          {foods?.map((food) => (
            <div className="flex bg-zinc-50 p-5" key={food.id}>
              <h3 className="flex-grow">{food.name}</h3>
              <div>
                <span>
                  <button type="button" aria-label="decrement"><IconMinus size={13} role="presentation" /></button>
                  <input type="number" step="0.5" className="w-14 mx-3 text-center border-2 border-gray-900" aria-label="servings" />
                  <button type="button" aria-label="increment"><IconPlus size={13} role="presentation" /></button>
                </span>
                <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
                <span>{food.quantity}</span>
              </div>
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
