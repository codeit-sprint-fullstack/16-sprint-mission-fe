function FeatureSection({ feature }) {
  return (
    <section className={`feature-section ${feature.reverse ? 'feature-section--reverse' : ''}`}>
      <img className="feature-image" src={feature.image} alt={feature.imageAlt} />
      <div className="feature-copy">
        <span>{feature.label}</span>
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </div>
    </section>
  )
}

export default FeatureSection
