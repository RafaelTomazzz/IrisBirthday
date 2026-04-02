"use client"

import SplineComponent from "@/components/SplineComponent";
import { Header } from "@/components/Header";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/page-jogo-memoria.module.scss"
import Spline from '@splinetool/react-spline';

export default function JogoMemoria() {

    const [cartasViradas, setCartasViradas] = useState([])
    const [cartasEncontradas, setCartasEncontradas] = useState([])
    const [tentativas, setTentativa] = useState(0)

    const cartas = [
        { "id": 1, "img": "/images/iris_normal.png" },
        { "id": 2, "img": "/images/iris_chorando.png" },
        { "id": 3, "img": "/images/iris_sorrindo.png" },
        { "id": 4, "img": "/images/rafael_nerd.png" },
        { "id": 5, "img": "/images/rafael_soprando.png" },
        { "id": 6, "img": "/images/rafael_timido.png" },
        { "id": 1, "img": "/images/iris_normal.png" },
        { "id": 2, "img": "/images/iris_chorando.png" },
        { "id": 3, "img": "/images/iris_sorrindo.png" },
        { "id": 4, "img": "/images/rafael_nerd.png" },
        { "id": 5, "img": "/images/rafael_soprando.png" },
        { "id": 6, "img": "/images/rafael_timido.png" }
    ]

    const [cartasSort, setCartas] = useState([])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        const embaralhado = shuffle([...cartas])
        setCartas(embaralhado)
    }, [])

    useEffect(() => {
        console.log(cartasSort)
    }, [cartasSort])

    function handleIndex(index) {
        if (cartasEncontradas.includes(index)) return

        const novasViradas = [...cartasViradas, index]
        setCartasViradas(novasViradas)

        if (novasViradas.length === 2) {
            const [i1, i2] = novasViradas

            const carta1 = cartasSort[i1]
            const carta2 = cartasSort[i2]

            if (carta1.id === carta2.id) {
                setCartasEncontradas(prev => [...prev, i1, i2])
                setCartasViradas([])
            } else {
                setTimeout(() => {
                    setCartasViradas([])
                }, 800)

                setTentativa(prev => prev + 1)
            }
        }
    }

    function resetGame() {
        const embaralhado = shuffle([...cartas])
        setCartas(embaralhado)

        setCartasViradas([])
        setCartasEncontradas([])
        setTentativa(0)
    }

    return (
        <div>
            <Spline
                className={styles.spline}
                scene="https://prod.spline.design/Jvs6vFp4MW0m85xC/scene.splinecode"
            />

            <div>
                <Header />

                <div className="container">
                    <h1 className={styles.titulo}>Jogo da Memória!</h1>

                    <div className="row gy-4">
                        {cartasSort.map((carta, index) => {
                            const virada = cartasViradas.includes(index) || cartasEncontradas.includes(index)

                            return (
                                <div key={index} className="col-4 col-md-3">
                                    <div
                                        className={`${styles.card} ${!virada ? styles.card__back : ""}`}
                                        onClick={() => handleIndex(index)}
                                    >
                                        <img
                                            className={styles.card__img}
                                            src={carta.img}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {tentativas === 3 && (
                <div className={styles.message__container}>
                    <div className={styles.message}>
                        <img className={styles.message__img} src="/images/iris_chorando.png" alt="" />
                        <p className={styles.message__text}>Você perdeu! Deseja tentar novamente?</p>
                        <button className={styles.message__button} onClick={() => { resetGame() }}>Tentar Novamente</button>
                    </div>
                </div>
            )}
            
            {cartasEncontradas.length === 12 && (
                <div className={styles.message__container}>
                    <div className={styles.message}>
                        <img className={styles.message__img} src="/images/iris_sorrindo.png" alt="" />
                        <p className={styles.message__text}>Parabéns, você ganhou! Deseja tentar novamente?</p>
                        <button className={styles.message__button} onClick={() => { resetGame() }}>Tentar Novamente</button>
                    </div>
                </div>
            )}
        </div>
    );
}