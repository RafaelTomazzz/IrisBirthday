"use client"

import styles from './Header.module.scss'
import Link from 'next/link'
import { Logo } from './Logo'
import { useState } from 'react'

export function Header() {
    const [menuEscondido, setMenuEscondido] = useState(false)

    return (
        <header className={`${styles.header} container`}>
            <Logo />

            <nav className={styles.navbar__dektop}>
                <Link href="/" className="btn btn--navbar">
                    <i className="fa-solid fa-house-chimney btn--icon"></i>
                    Inicio
                </Link>
                <Link href="/listinha" className="btn btn--navbar">
                    <i className="fa-solid fa-table-list btn--icon"></i>
                    Listinha
                </Link>
                <Link href="/jogo-memoria" className="btn btn--navbar">
                    <i className="fa-solid fa-puzzle-piece btn--icon"></i>
                    Jogo da Memória
                </Link>

            </nav>

            <nav className={styles.navbar__mobile}>
                <button className="btn btn--navbar" onClick={() => { setMenuEscondido(true) }}>
                    <i className="fa-solid fa-bars btn--icon"></i>
                    Menu
                </button>
            </nav>

            {menuEscondido && (
                <div className={styles.menu__container}>
                    <div className={styles.menu}>
                        <Link href="/" className="btn" onClick={() => { setMenuEscondido(false) }}>
                            <i className="fa-solid fa-house-chimney btn--icon"></i>
                            Inicio
                        </Link>
                        <Link href="/listinha" className="btn" onClick={() => { setMenuEscondido(false) }}>
                            <i className="fa-solid fa-table-list btn--icon"></i>
                            Listinha
                        </Link>
                        <Link href="/jogo-memoria" className="btn" onClick={() => { setMenuEscondido(false) }}>
                            <i className="fa-solid fa-puzzle-piece btn--icon"></i>
                            Jogo da Memória
                        </Link>
                    </div>
                </div>
            )}

        </header>
    )
}