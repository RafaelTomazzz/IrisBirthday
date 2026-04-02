"use client";

import SplineComponent from "@/components/SplineComponent";
import { Header } from "@/components/Header";
import styles from "../styles/page-listinha.module.scss";
import { useEffect, useState } from "react";
import Spline from '@splinetool/react-spline';

export default function Listinha() {
  const [listas, setListas] = useState([]);
  const [listaSelecionada, setListaSelecionada] = useState(null);
  const [descricao, setDescricao] = useState("")

  async function fetchData() {
    const res = await fetch("/api/listas");
    const data = await res.json();

    setListas(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listas.length > 0) {
      setListaSelecionada(listas[0]);
    }
  }, [listas]);

  if (!listaSelecionada) {
    return <p>Carregando...</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await fetch(`/api/listas/notas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "descricao": descricao,
        "check": false,
        "nome": listaSelecionada.nome
      })
    })

    if (res.ok) {
      setDescricao("") // limpa o textarea
    } else {
      console.log("Erro ao adicionar nota")
    }

    fetchData()

    const data = await res.json();
    setListaSelecionada(data)
  }

  async function handleDelete(index) {
    const res = await fetch("/api/listas/notas", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: listaSelecionada.nome,
        index
      })
    })

    fetchData()

    const data = await res.json();
    setListaSelecionada(data)
  }

  async function handlePut(index) {
    const res = await fetch("/api/listas/notas", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: listaSelecionada.nome,
        index,
        descricao: listaSelecionada.notes[index].descricao,
        check: !(listaSelecionada.notes[index].check)
      })
    })

    fetchData()

    const data = await res.json();
    setListaSelecionada(data)
  }

  return (
    <div>
      <Spline
        className={styles.spline}
        scene="https://prod.spline.design/Jvs6vFp4MW0m85xC/scene.splinecode"
      />

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

          <div className={`row justify-content-center align-items-center ${scroll}`}>
            <section className={`${styles.lista} col-md-8 col-10`}>

              <h2 className={styles.title}>
                {listaSelecionada.nome}
              </h2>

              <table className={styles.table}>
                <colgroup>
                  <col style={{ width: "80%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>

                <thead>
                  <tr className={`${styles.table__row_title} ${styles.table__row}`}>
                    <th>Descrição</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {listaSelecionada.notes.map((note, index) => (
                    <tr key={index} className={styles.table__row}>
                      <td>{note.descricao}</td>
                      <td>
                        <button
                          className={styles.table__button}
                          onClick={() => handlePut(index)}>
                          {note.check ? "✔️" : "❌"}
                        </button>

                        <button
                          className={styles.table__button}
                          onClick={() => handleDelete(index)}
                          style={{ marginLeft: 10 }}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.form__label}>Adicione mais um item lista:</label>
                <textarea
                  className={styles.form__textarea}
                  rows="3" cols="30"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)} />

                <button className={styles.form__button}>Adicionar</button>
              </form>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}