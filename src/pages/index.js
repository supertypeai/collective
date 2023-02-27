import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Github from '@/icons/Github'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Supertype Collective</title>
        <meta name="description" content="
          Supertype Collective is a community of analytics developers, data scientists &#38; engineering leaders building products across the full stack.
          " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Add your profile in &nbsp;
            <code className={styles.code}>src/pages/p/&#123;your_name&#125;</code>
          </p>
          <div>
            <a
              href="https://supertype.ai"
              target="_blank"
              rel="noreferrer noopener"
            >
              by{' '}
              <Image
                src="/supertype.svg"
                alt="Supertype Logo"
                // className={styles.SupertypeLogo}
                width={100}
                height={100}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <h2
            className='font-display text-center font-extrabold text-4xl sm:text-5xl text-white lg:text-[length:72px] lg:leading-[64px] xl:text-7xl'>
            Supertype
          </h2>
          <span style={{ width: '1.2em' }}>{" "}</span>
          <h2
            className="font-display text-center font-extrabold text-4xl sm:text-5xl text-white lg:text-[length:72px] lg:leading-[64px] xl:text-7xl typewriter inline">
            Collective
          </h2>

        </div>

        <div className={styles.grid}>
          <a
            href="https://supertype.ai"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Background <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn more about the Supertype Collective initiative and how to get involved.
            </p>
          </a>

          <a
            href="https://fellowship.supertype.ai"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Fellowship <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Supertype Fellowship helps kickstart your career in data,
              analytics, and modern software development.
            </p>
          </a>

          <Link
            // href="/templates"
            href="/p/samuel"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Example <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              {/* Boilerplates and References to build out your profile page. */}
              An example developer profile to get you started.
            </p>
          </Link>


          <a
            href="https://github.com/supertypeai/collective"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              <Github />
              {" "}Source Code <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Add your profile by submitting a pull request to this repository on GitHub.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
