// api/comisiones.js
export default async function handler(req, res) {
  try {
    const {
      academicPeriodId = "6",
      instituteId,
      subjectId,
      careerId,
    } = req.query;
    const q = new URLSearchParams();
    if (academicPeriodId) q.set("academicPeriodId", academicPeriodId);
    if (instituteId) q.set("instituteId", instituteId);
    if (subjectId) q.set("subjectId", subjectId);
    if (careerId) q.set("careerId", careerId);

    const target = `https://siusync.espacios.unaj.edu.ar/api/v1/Comisiones?${q.toString()}`;
    const r = await fetch(target);
    const text = await r.text();
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=59");
    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json",
    );
    res.status(r.status).send(text);
  } catch (err) {
    console.error("api/comisiones error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
}
