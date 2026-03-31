import styles from './Header.module.scss'
import { Logo } from './Logo'

export function Header() {
    return (
        <header className={`${styles.header} container`}>
            <Logo />

            <nav className={styles.navbar__dektop}>
                <button className="btn btn--navbar">
                    <i className="fa-solid fa-house-chimney btn--icon"></i>
                    Inicio
                </button>
                <button className="btn btn--navbar">
                    <i className="fa-solid fa-table-list btn--icon"></i>
                    Listinha
                </button>
                <button className="btn btn--navbar">
                    <i className="fa-solid fa-puzzle-piece btn--icon"></i>
                    Jogo da Memória
                </button>
                <button className="btn btn--navbar">
                    <i className="fa-solid fa-dove btn--icon"></i>
                    Flap Iris
                </button>
            </nav>

            <nav className={styles.navbar__mobile}>
                <button className="btn btn--navbar">
                    <i className="fa-solid fa-bars btn--icon"></i>
                    Menu
                </button>
            </nav>

            <button className={`${styles.navbar__dektop} btn btn--navbar btn--navbar--sound`}>
                <i className="fa-solid fa-volume-high"></i>                
            </button>
        </header>
    )
}