import * as React from 'react'
import { Box, Typography, Button } from "@mui/material"

export const Content = () => {
    return (
        <Box sx={{
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            background: "#0f0f0f",
            color: "#f0ece4",
            fontFamily: "'Outfit', sans-serif"
        }}>

            {/* HERO */}
            <Box sx={{ borderBottom: "0.5px solid #2a2a2a" }}>
                <Box sx={{ maxWidth: "1100px", mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 }, textAlign: "center" }}>
                    <Typography sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 500, color: "#f0ece4", letterSpacing: "-1px" }}>
                        Nigga Bank 💸
                    </Typography>
                    <Typography sx={{ mt: 2, color: "#aaa", fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: "560px", mx: "auto", lineHeight: 1.7 }}>
                        Gestiona, analiza y optimiza tus finanzas desde un solo lugar. Control total, decisiones inteligentes.
                    </Typography>
                            <Button
                            sx={btnHero}
                            href="https://github.com/AnyeloBenitezzz14/Frontend-Final"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Ve al repo de GitHub
                            </Button>
                </Box>
            </Box>

            {/* BENEFICIOS */}
            <Section>
                <Typography sx={sectionTitle}>Lo que puedes hacer</Typography>
                <Typography sx={sectionSub}>Todo lo que necesitas en un solo panel</Typography>
                <Box sx={benefitsGrid}>
                    {beneficios.map((b, i) => (
                        <Box key={i} sx={benefitCard}>
                            <Box sx={benefitIcon}>{b.icon}</Box>
                            <Box>
                                <Typography sx={{ fontSize: "0.95rem", fontWeight: 500, color: "#f0ece4", mb: 0.5 }}>{b.title}</Typography>
                                <Typography sx={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>{b.desc}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Section>

            {/* PASOS */}
            <Section sx={{ pt: 0 }}>
                <Typography sx={sectionTitle}>Cómo funciona</Typography>
                <Box sx={{ maxWidth: "600px", mx: "auto" }}>
                    {steps.map((s, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2.5, mb: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={stepNum}>{i + 1}</Box>
                                {i < steps.length - 1 && <Box sx={stepConnector} />}
                            </Box>
                            <Box sx={{ pt: 1 }}>
                                <Typography sx={{ fontSize: "0.95rem", fontWeight: 500, color: "#f0ece4" }}>{s.title}</Typography>
                                <Typography sx={{ fontSize: "0.82rem", color: "#888", mt: 0.5, lineHeight: 1.6 }}>{s.desc}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Section>

            {/* PLANES */}
            <Section sx={{ pt: 0 }}>
                <Typography sx={sectionTitle}>Planes disponibles</Typography>
                <Box sx={plansGrid}>
                    {planes.map((p, i) => (
                        <Box key={i} sx={{
                            ...planCard,
                            border: p.highlight ? "1.5px solid #7c3aed" : "0.5px solid #242424",
                            background: p.highlight ? "#120e1f" : "#141414"
                        }}>
                            {p.highlight && <Typography sx={planTag}>Más popular</Typography>}
                            <Typography sx={{ fontSize: "1rem", color: "#aaa" }}>{p.title}</Typography>
                            <Typography sx={{ fontSize: "2.8rem", fontWeight: 500, color: "#f0ece4", my: 1, letterSpacing: "-1px" }}>{p.price}</Typography>
                            <Typography sx={{ fontSize: "0.82rem", color: "#888", mb: 3 }}>{p.period}</Typography>
                            <Box sx={{ height: "0.5px", background: "#1e1e1e", mb: 3 }} />
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1 }}>
                                {p.features.map((f, idx) => (
                                    <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box sx={checkCircle(p.highlight)}>✓</Box>
                                        <Typography sx={{ fontSize: "0.88rem", color: "#bbb" }}>{f}</Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Button fullWidth sx={p.highlight ? btnPurple : btnOutline}>{p.cta}</Button>
                        </Box>
                    ))}
                </Box>
            </Section>

        </Box>
    )
}

const Section = ({ children }) => (
    <Box sx={{ maxWidth: "1100px", mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 } }}>
        {children}
    </Box>
)

const beneficios = [
    { icon: "📊", title: "Automatiza el control de gastos", desc: "Categoriza transacciones automáticamente y detecta patrones de gasto sin esfuerzo." },
    { icon: "💰", title: "Evita pérdidas innecesarias", desc: "Recibe alertas antes de que los gastos superen tus límites establecidos." },
    { icon: "📈", title: "Visualiza datos en tiempo real", desc: "Dashboards actualizados al instante con gráficas claras y accionables." },
    { icon: "🧠", title: "Mejora decisiones financieras", desc: "Recomendaciones basadas en tus hábitos reales de consumo e historial." },
    { icon: "🔒", title: "Reduce errores humanos", desc: "Validaciones automáticas y registros auditables para mayor confiabilidad." },
    { icon: "🚀", title: "Optimiza tu negocio", desc: "Identifica áreas de mejora y escala tus operaciones con datos concretos." },
]

const steps = [
    { title: "Registras tus gastos", desc: "Conecta tus cuentas o ingresa movimientos manualmente. Rápido y seguro." },
    { title: "La API procesa la información", desc: "Nuestro motor clasifica, agrupa y analiza cada transacción en segundos." },
    { title: "Obtienes reportes automáticos", desc: "Informes semanales y mensuales listos para compartir o exportar a PDF." },
    { title: "Tomas decisiones inteligentes", desc: "Con datos claros, actúas con confianza. Sin conjeturas, sin sorpresas." },
]

const planes = [
    {
        title: "Básico", price: "$0", period: "Para siempre gratis", cta: "Comenzar gratis",
        features: ["Control simple de gastos", "Reportes básicos mensuales", "Hasta 3 cuentas"]
    },
    {
        title: "Experto", price: "$10", period: "por mes · cancela cuando quieras", cta: "Elegir Experto", highlight: true,
        features: ["Alertas inteligentes en tiempo real", "Multiusuario (hasta 5 personas)", "API completa con webhooks", "Exportaciones ilimitadas"]
    },
    {
        title: "Deluxe", price: "$25", period: "por mes · facturación anual disponible", cta: "Elegir Deluxe",
        features: ["IA financiera personalizada", "Análisis predictivo avanzado", "Usuarios ilimitados", "Soporte prioritario 24/7"]
    },
]

const sectionTitle = { fontSize: { xs: "1.5rem", md: "1.8rem" }, fontWeight: 500, color: "#f0ece4", textAlign: "center", mb: 6 }
const sectionSub = { textAlign: "center", color: "#888", fontSize: "0.95rem", mt: -4, mb: 6 }

const benefitsGrid = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
    gap: "1px",
    background: "#1e1e1e",
    border: "0.5px solid #1e1e1e",
    borderRadius: "16px",
    overflow: "hidden"
}

const benefitCard = {
    background: "#141414",
    p: 3.5,
    display: "flex",
    gap: 2,
    alignItems: "flex-start",
    transition: "background 0.2s",
    "&:hover": { background: "#1a1a1a" }
}

const benefitIcon = {
    width: 40, height: 40,
    borderRadius: "10px",
    background: "#180e2e",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, fontSize: "16px"
}

const stepNum = {
    width: 36, height: 36,
    borderRadius: "50%",
    background: "#1a1a1a",
    border: "0.5px solid #2e2e2e",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", color: "#7c3aed", fontWeight: 500, flexShrink: 0
}

const stepConnector = { width: "1px", height: "40px", background: "#2a2a2a", my: 0.5 }

const plansGrid = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
    gap: 2
}

const planCard = { borderRadius: "16px", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", transition: "border-color 0.2s" }

const planTag = {
    display: "inline-block", fontSize: "11px",
    background: "#180e2e", color: "#7c3aed",
    px: 1.5, py: 0.5, borderRadius: "100px", mb: 2
}

const checkCircle = (highlight) => ({
    width: 16, height: 16, borderRadius: "50%",
    background: highlight ? "#180e2e" : "#1e2e1e",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, fontSize: "9px",
    color: highlight ? "#7c3aed" : "#4ade80"
})

const btnHero = {
    mt: 4,
    background: "#7c3aed",
    color: "#fff",
    fontWeight: 500,
    borderRadius: "8px",
    px: 4, py: 1.5,
    textTransform: "none",
    "&:hover": { background: "#6d28d9" }
}

const btnPurple = {
    mt: 3.5, background: "#7c3aed", color: "#fff",
    borderRadius: "8px", fontWeight: 500,
    textTransform: "none",
    "&:hover": { background: "#6d28d9" }
}

const btnOutline = {
    mt: 3.5, background: "transparent", color: "#e8e0d0",
    border: "0.5px solid #2a2a2a", borderRadius: "8px",
    textTransform: "none",
    "&:hover": { background: "#1e1e1e", borderColor: "#3a3a3a" }
}