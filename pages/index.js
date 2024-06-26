import Head from "next/head";
import List from '../components/List'
import { client } from '@/libs/client'
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home({ blog }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div id="new-blog">
        <Link href="/blog/create" className="">
            <button className="">ブログを作成</button>
        </Link>
        </div>
        <List blog={blog} />
      </main>
    </>
  )
}

export const getStaticProps = async () => {

  const data = await client.get({
    endpoint: 'blogs',
  })

  return {
    props: {
      blog: data.contents,
    },
    revalidate: 1
  }
}

