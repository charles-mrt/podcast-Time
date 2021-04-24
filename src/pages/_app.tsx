import { Header } from "../components/Header";
import { Player } from "../components/Player";



import "../styles/globals.scss";
import styles from "../styles/app.module.scss";

import { PlayerContextProvider } from "../contexts/PlayerContext";
import { ThemeColorContext } from "../contexts/ThemeColorContext";

import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {


  const [colorTheme, setColorTheme] = useState('theme-color');

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('theme-color');
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [])

  const changeThemeColor = (theme) => {
    setColorTheme(theme);
    localStorage.setItem('theme-color', theme)
  }

  return (
    <PlayerContextProvider>
      <ThemeColorContext.Provider value={{ changeThemeColor, colorTheme }}>
        <div className={colorTheme === 'dark' ? 'dark-theme actived' : 'light-theme actived'}>
          <div className={styles.wrapper}>
            <main>
              <Header />
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
        </div>
      </ThemeColorContext.Provider>
    </PlayerContextProvider>
  )

}

export default MyApp
