import styles from './Logo.module.scss'

export function Logo(){
    return(
        <div className={styles.logo}>
            <img className={styles.logo__img}src="/images/iris_normal.png" alt="" />
            
            <h1 className={styles.logo__text}>
                Iris Birthday
            </h1>

        </div>
    );
}