import { FiAlertCircle } from 'react-icons/fi';
import styles from './udm.module.scss';

export default function UsernameDoesntMatch() {
    return (
        <div className={styles.udm}>
            <FiAlertCircle />
            <h3>The username doesn't match</h3>
        </div>
    )
}