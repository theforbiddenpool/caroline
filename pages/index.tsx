import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import prisma from '../db/prisma';

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
            <button type="button" className="mx-2" aria-label="previous">&lt;</button>
            <span>{(new Date()).toLocaleDateString('en-US', dateOptions)}</span>
            <button type="button" className="mx-2" aria-label="next">&gt;</button>
          </nav>
          {foods?.map((food) => (
            <div className="flex bg-zinc-50 p-5" key={food.id}>
              <h3 className="flex-grow">{food.name}</h3>
              <div>
                <span>
                  <button type="button" aria-label="decrement">-</button>
                  <input type="number" step="0.5" className="w-14 mx-3 text-center" aria-label="servings" />
                  <button type="button" aria-label="increment">+</button>
                </span>
                <span className="mx-4">&#47;</span>
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
  const foods = await prisma.food.findMany({
    orderBy: { order_weight: 'asc' },
  });

  return {
    props: {
      foods,
    },
  };
};

export default Home;
