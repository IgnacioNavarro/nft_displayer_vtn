import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { use, useEffect, useState } from 'react';


export default function Home() {


  const [nfts, setNfts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {


      console.log("Fetching data");

      const response = await fetch('http://localhost:3001/api/nfts',{
        method: 'POST',
      });
      const data = await response.json();
      console.log("data", data);

      setNfts(data);
    }
    fetchData();
  }
  , []);




  return (
    <div className={styles.container}>
      <Head>
        <title>Vottun Frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="#">NFT viewer!</a>
        </h1>

        <p className={styles.description}>
          See all the NFTs on the mystic collection
        </p>


        <div className={styles.grid}>


          
          {nfts.map((nft:any, index) => {
            return (
              <div key={index} className={styles.card}>
                <h3>{nft.name} #{index}</h3>
                <img src={nft.image} alt="NFT image" />
                <p>Description: {nft.description}</p>
                <div>
                  <p>Attributes:</p>
                  <ul>
                    {nft.attributes.map((attribute:any, index:any) => {
                      return (
                        <li key={index}>{attribute.trait_type}: {attribute.value}</li>
                      )
                    })}
                  </ul>
                </div>

              </div>
            )
          })}

        </div>
      </main>


      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
