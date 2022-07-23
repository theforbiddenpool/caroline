import Head from 'next/head';

interface Props {
  title: string;
}

function HeadTitle({ title }: Props) {
  return (
    <Head>
      <title>
        {title}
      </title>
    </Head>
  );
}

export default HeadTitle;
