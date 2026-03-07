// api/subjects.js
export default async function handler(req, res) {
  try {
    const { carrerId = "10", Limit = "200", AcademicPeriodId = "6", sortField = "name", sortDirection = "asc" } = req.query;
    const target = `https://siusync.espacios.unaj.edu.ar/api/v1/Subject?carrerId=${encodeURIComponent(carrerId)}&Limit=${encodeURIComponent(Limit)}&AcademicPeriodId=${encodeURIComponent(AcademicPeriodId)}&sortField=${encodeURIComponent(sortField)}&sortDirection=${encodeURIComponent(sortDirection)}`;

    const r = await fetch(target);
    const text = await r.text();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=59");
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.status(r.status).send(text);
  } catch (err) {
    console.error("api/subjects error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
}