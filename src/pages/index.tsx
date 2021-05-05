import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../services/api';


import { usePlayer } from '../contexts/PlayerContext';

import styles from '../pages/home.module.scss';


type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {

  const { playList, activeSideBarSlideButton } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];


  return (
    <div className="wrap_homepage">
      <div className={styles.homepage}>

        <Head>
          <title> Home | PodcastTime </title>
        </Head>


        <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>

          <ul>
            {latestEpisodes.map((episode, index) => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>

                  </div>

                  <button
                    type="button"
                    onClick={() => playList(episodeList, index)}
                    onClickCapture={activeSideBarSlideButton}
                  >
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>

                </li>
              )
            })}
          </ul>

        </section>

        <section className={styles.allEpisodes}>
          <h2>Todos Episósidos</h2>
          <ul>
            <head>
              <h5>Podcast</h5>
              <h5>Integrantes</h5>
              <h5>Data</h5>
              <h5>Duração</h5>
            </head>
            {allEpisodes.map((episode, index) => {
              return (
                <>
                  <li key={episode.id}>

                    <div className={styles.thumbNail}>
                      <Image
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </div>

                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                    <span>{episode.members}  </span>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>

                    <button
                      type="button"
                      onClick={() => playList(episodeList, index + latestEpisodes.length)}
                      onClickCapture={activeSideBarSlideButton}
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />

                    </button>
                  </li>
                </>
              )
            })}
          </ul>

        </section>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get('episodes', {
    params: {
      _limit: 12, // total episodes shown
      _sort: 'published_at', //_sort = date of published episodes
      _order: 'desc' // show order decreasing or growing
    }
  });


  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      episodes,
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, //sec * 60 * 8 = 8hrs
  }
}