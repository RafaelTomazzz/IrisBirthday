import SplineComponent from "@/components/SplineComponent";
import { Header } from "@/components/Header";
import styles from "../styles/page-listinha.module.scss"

export default function Home() {
  return (
    <div className="spline__container">
      <SplineComponent />

      <div>
        <Header />

        <div className={`${styles.main__container} container`}>
          <div className={styles.lista__container}>
            <button className={`${styles.btn} ${styles.btn__lista}`}>Pibid</button>
            <button className={`${styles.btn} ${styles.btn__lista}`}>Lista de Compras</button>
            <button className={`${styles.btn} ${styles.btn__lista}`}>Lista de Afazeres</button>
            <button className={`${styles.btn} ${styles.btn__lista}`}>Lista de Oque Quero Comprar</button>
          </div>

          <div className="row justify-content-center"></div>
            <section className={`${styles.lista} col-8`}>

            </section>
          </div>
      </div>
    </div>
  );
}
