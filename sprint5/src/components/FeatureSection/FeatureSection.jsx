import styles from "./FeatureSection.module.scss";

const FeatureSection = ({
  label,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
}) => {
  return (
    <section className={styles.featureSection}>
      <div className={`${styles.featureWrap} ${reverse ? styles.reverse : ""}`}>
        <img
          className={styles.featureImage}
          src={image}
          alt={imageAlt}
        />
        <div className={styles.featureText}>
          <p className={styles.label}>
            {label}
          </p>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection