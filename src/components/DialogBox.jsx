"use client"

import styles from './DialogBox.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export function DialogBox() {
    const [index, setIndex] = useState(0)
    const arrayTexto = [
        "F eliz aniversário meu bem!!! Tudo beleza com você?", 
        "F inalmente chegou seu grande dia! Agora você pode dizer pra todo mundo que viveu por duas décadas. Só de pensar consigo imaginar a gente bem velhinho, numa casinha de vó, e você me xingando porque eu esqueci de acender o foguinho do TikTok pela milésima vez. Alguns hábitos nunca morrem, não é?", 
        "P ra comemorar esse data mais que especial, decidi fazer oque eu faço de melhor. Botei a mão na massa e fiz um pequeno site para demonstrar o quanto te amo de paixão! Eai? Gostou da surpresa? Sempre avalio minhas surpresas pelo quanto você chorou reagindo. Ou seja, se vc não estiver chorando agora, quer dizer que odiou a surpresa, e que me odeia mais ainda...", 
        "B om, apesar de todo meu esforço eu infelizmente falhei. Enquanto eu estava fazendo o site, eu percebi que nada do que eu faça, pode demonstrar o quão grande é o meu amor e quanto você e especial na minha vida... Mas, eu vou continuar tentando. Sou paciente lembra? Eu te amo flor, e pra sempre vou te amar. Feliz aniversário bixa pinga!!!"]
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

    function Typewriter({ texto, velocidade = 30 }) {
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