"use client";

import SplineComponent from "@/components/SplineComponent";
import { Header } from "@/components/Header";
import styles from "../styles/page-listinha.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [listas, setListas] = useState([]);
  const [listaSelecionada, setListaSelecionada] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/listas"); // 🔥 coloque a barra /
      const data = await res.json(); // 🔥 pegar JSON

      console.log(data);

      setListas(data);
      setListaSelecionada(data[0]);
    }

    fetchData();
  }, []);

  if (!listaSelecionada) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="spline__container">
      <SplineComponent />

      <div>
        <Header />

        <div className={`${styles.main__container} container`}>

          <div className={styles.lista__container}>
            {listas.map((item, index) => (
              <button
                key={index}
                className={`${styles.btn} ${styles.btn__lista}`}
                onClick={() => setListaSelecionada(item)}
              >
                {item.nome}
              </button>
            ))}
          </div>

          <div className="row justify-content-center">
            <section className={`${styles.lista} col-8`}>
              <table>
                <thead>
                  <tr>
                    <th colSpan="3">{listaSelecionada.nome}</th>
                  </tr>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {listaSelecionada.notes.map((note, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(note.data).toLocaleString()}
                      </td>
                      <td>{note.descricao}</td>
                      <td>{note.check ? "✔️" : "❌"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}