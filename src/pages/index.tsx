import styles from './index.less';
import Header from '@/components/Header';

export default function IndexPage() {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
