"use client"

import styles from './DialogBox.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';

export function DialogBox() {
    const [text, setText] = useState("Ola Mundo");
    const arrayTexto = ["paragrafo 1", "paragrafo 2", "paragrafo 3", "paragrafo 4"]

    function Typewriter({ texto, velocidade = 50 }) {
        const [conteudo, setConteudo] = useState("");

        useEffect(() => {
            let i = 0;
            setConteudo("");

            const interval = setInterval(() => {
                setConteudo((prev) => prev + texto.charAt(i));
                i++;

                if (i >= texto.length) {
                    clearInterval(interval);
                }
            }, velocidade);

            return () => clearInterval(interval);
        }, [texto, velocidade]);

        return <p>{conteudo}</p>;
    }

    return (
        <div className={`${styles.dialog__container} row align-items-center justify-content-center`}>
            <div className={`col-10 col-sm-8`} onClick={() => setText("teste")}>
                <section className={`${styles.dialog} row`}>
                    <img className={`${styles.dialog__img} col-12 col-sm-4`} src="https://i.pinimg.com/564x/b3/cf/53/b3cf53b1b2ba150b49030eacc11ec146.jpg" alt="" />
                    
                    <div className={`${styles.dialog__text} col-12 col-sm-8`}>
                        <Typewriter texto={text} />  
                    </div>
                </section>
            </div>
        </div>
    );
}