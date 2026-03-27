import styles from './DialogBox.module.scss'

export function DialogBox() {
    return (
        <div className={`${styles.dialog__container} row align-items-center justify-content-center`}>
            <div className={`col-6`}>
                <section className={`${styles.dialog} row`}>
                    <div className={`${styles.dialog__img} col-3`}>

                    </div>
                    <div className={`${styles.dialog__text} col-9`}>
                        <p>
                            O empenho em analisar a percepção das dificuldades apresenta tendências no sentido de aprovar a manutenção
                             do orçamento setorial.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}