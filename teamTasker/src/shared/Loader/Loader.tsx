import styles from "./Loader.module.scss";

export const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.loader_title}>Please wait</div>
            <div className={styles.loader}></div>
        </div>
    )
}
