function SectionHeading({ eyebrow, title, intro, invert = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`section-eyebrow ${invert ? "text-copper-light" : "text-copper-dark"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 section-title ${invert ? "text-white" : "text-graphite"}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`mt-5 body-copy ${invert ? "text-slate-200" : "text-slate-600"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
