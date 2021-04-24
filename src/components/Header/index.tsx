import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeColorContext } from "../../contexts/ThemeColorContext";
import { FiMoon, FiSun } from 'react-icons/fi';

import styles from './styles.module.scss';

export function Header() {

   const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
      locale: ptBR
   });

   const {
      colorTheme,
      changeThemeColor
   } = useContext(ThemeColorContext);

   return (

      <header className={styles.headerContainer}>
         <Link href="/">
            <a> <img src="/logo.svg" alt="Podcastr" /></a>
         </Link>

         <p>O melhor para você ouvir, sempre :)</p>
         <span>{currentDate}</span>

         <div className={styles.themeColor}>
            <div className={colorTheme === 'dark' ? styles.darkActive : styles.lightActive}>
               <span><FiMoon onClick={() => changeThemeColor('dark')}  title="ativa tema escuro"/></span>
               <span><FiSun onClick={() => changeThemeColor('light')} title="ativa tema claro"/></span>
            </div>
         </div>
      </header >
   );
}