import SplineComponent from "@/components/SplineComponent";
import { DialogBox } from "@/components/DialogBox";
import { Header } from "@/components/Header";
import styles from './styles/page.module.scss'

export default function Home() {
  return (
    <div className="spline__container">
      <SplineComponent />

      <div>
        <Header />
        
        <main className={`${styles.main__container} container`}>
          <DialogBox />
        </main>
      </div>
    </div>
  );
}
