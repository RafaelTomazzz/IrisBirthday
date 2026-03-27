import styles from './Logo.module.scss'

export function Logo(){
    return(
        <div className={styles.logo}>
            <h1 className={styles.logo__text}>
                Iris Birthday
            </h1>
        </div>
    );
}