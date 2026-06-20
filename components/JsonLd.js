export default function JsonLd({ data }) {
  const graphs = Array.isArray(data) ? data : [data];

  // Emit a single object. With multiple schemas, use the canonical
  // `@context` + `@graph` form so the top-level object always carries an
  // `@context` — a bare array has none, which crashes tools/extensions that
  // read `parsed["@context"]` on every ld+json block.
  const payload =
    graphs.length === 1
      ? graphs[0]
      : {
          "@context": "https://schema.org",
          "@graph": graphs.map(({ "@context": _ctx, ...rest }) => rest),
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
