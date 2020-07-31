import * as React from 'react';
import { useState } from 'react';
import SideMenu from './components/SideMenu';
import styles from './index.less';

const typeReflect = {
  SideMenu: <SideMenu />,
};

const App = () => {
  const [type, setType] = useState('SideMenu');
  return <div className={styles.container}>{typeReflect[type]}</div>;
};

export default App;
