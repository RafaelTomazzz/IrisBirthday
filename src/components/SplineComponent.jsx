import Spline from '@splinetool/react-spline/next';
import styles from './SplineComponent.module.scss'

export default function SplineComponent() {
    return (
        <Spline className={styles.spline}
            scene="https://prod.spline.design/Jvs6vFp4MW0m85xC/scene.splinecode"
        />
    );
}