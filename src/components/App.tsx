import { useState } from 'react';
import styles from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import housePng from '@/assets/house-png.png';
import houseJpg from '@/assets/house.jpg';
import House from '@/assets/house-svg.svg';

export const App = () => {
  const [count, setCount] = useState(0);

  const incCount = () => {
    setCount((prev) => prev + 1)
  }

  const decCount = () => {
    setCount((prev) => prev - 1);
  }

  // if (__PLATFORM__ === 'desktop') {
  //   return <div>It is desktop version</div>
  // }

  // if (__PLATFORM__ === 'mobile') {
  //   return <div>It is desktop version</div>
  // }

  return (
    <div data-testid='App wrapper'>
      <h3 color='red' data-testid='Platform'>Platform: {__PLATFORM__}</h3>
      <div>
        <img width={75} height={75} src={housePng} alt='house-png'/>
        <img width={75} height={75} src={houseJpg} alt='house-jpg'/>
        <House width={50} height={50} fill={'grey'} />
      </div>
      <Link to='/about'>about</Link>
      <br />
      <Link to='/shop'>shop</Link>
      <br />
      <hr />
      <h1>Счётчик кликов: {count}</h1>
      <button className={styles.button} onClick={incCount}>INC</button>
      <button onClick={decCount}>DEC</button>

      <Outlet />
    </div>
  );
}