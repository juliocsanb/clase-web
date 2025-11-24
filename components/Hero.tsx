import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <h2>Aprendiendo componentes</h2>
        <p>Primero aprendemos plano y luego construimos con componentes</p>
        <a className={styles.cta}>¡Vamos!</a>
      </div>
    </section>
  );
}
