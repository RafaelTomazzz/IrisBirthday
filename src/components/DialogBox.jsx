"use client"

import styles from './DialogBox.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export function DialogBox() {
    const [index, setIndex] = useState(0)
    const arrayTexto = ["paaragrafo 1", "paaragrafo 2", "paaragrafo 3", "paaragrafo 4"]
    const arrayImagens = ["/images/rafael_sorrindo.png", "/images/rafael_soprando.png", "/images/rafael_nerd.png", "/images/rafael_timido.png"]
    const [text, setText] = useState(arrayTexto[0]);
    const [image, setImage] = useState(arrayImagens[0])

    function changeText() {
        if (index == 3) {
            setIndex(0);
        } else {
            setIndex(index + 1)
        }

        setImage(arrayImagens[index])
        setText(arrayTexto[index])
    }

    function Typewriter({ texto, velocidade = 50 }) {
        const [conteudo, setConteudo] = useState("");

        const indexRef = useRef(0);

        useEffect(() => {
            indexRef.current = 0;
            setConteudo("");

            const interval = setInterval(() => {
                setConteudo((prev) => prev + texto.charAt(indexRef.current));
                indexRef.current++;

                if (indexRef.current >= texto.length) {
                    clearInterval(interval);
                }
            }, velocidade);

            return () => clearInterval(interval);
        }, [texto, velocidade]);

        return <p>{conteudo}</p>;
    }

    return (
        <div className={`${styles.dialog__container} row align-items-center justify-content-center`}>
            <div className={`col-10 col-sm-8`} onClick={changeText}>
                <section className={`${styles.dialog} row`}>
                    <img className={`${styles.dialog__img} col-12 col-sm-4`} src={image} alt="" />

                    <div className={`${styles.dialog__text} col-12 col-sm-8`}>
                        <Typewriter texto={text} />
                    </div>
                </section>
            </div>
        </div>
    );
}