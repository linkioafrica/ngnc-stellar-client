const BRAND = "#30AE4D";
const BRAND_DARK = "#2b9d45";

const ISSUER = "GASBV6W7GGED66MXEVC7YZHTWWYMSVYEY35USF2HJZBLABLYIFQGXZY6";
const TOML_URL = "https://anchor.ngnc.online/.well-known/stellar.toml";
const TRANSFER_SERVER = "https://anchor.ngnc.online/";
const VISIT_URL = "https://linkio.world/";

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    background: "linear-gradient(160deg, #e8edfb 0%, #d6def4 100%)",
    color: "#0f172a",
  },
  card: {
    width: "100%",
    maxWidth: 540,
    background: "#ffffff",
    borderRadius: 28,
    padding: "44px 40px 36px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
  },
  title: { margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: "-0.5px" },
  subtitle: { margin: "8px 0 0", fontSize: 19, color: "#64748b", fontWeight: 500 },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    margin: "24px 0 28px",
    padding: "8px 16px",
    borderRadius: 999,
    background: "#dcf5e2",
    color: "#1f7a39",
    fontWeight: 700,
    fontSize: 15,
  },
  dot: { width: 9, height: 9, borderRadius: "50%", background: BRAND },
  panel: {
    background: "#f8fafc",
    border: "1px solid #e6e9f0",
    borderRadius: 16,
    padding: "22px 24px",
    marginBottom: 18,
  },
  label: {
    margin: "0 0 12px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: "#475569",
  },
  text: { margin: 0, fontSize: 17, lineHeight: 1.5, color: "#0f172a" },
  link: { color: BRAND, fontWeight: 600, textDecoration: "none", wordBreak: "break-all" },
  issuer: { marginTop: 6, fontSize: 16, wordBreak: "break-all" },
  visit: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    padding: "16px 28px",
    borderRadius: 14,
    background: BRAND,
    color: "#fff",
    fontSize: 17,
    fontWeight: 700,
    textDecoration: "none",
  },
  footer: {
    marginTop: 30,
    paddingTop: 22,
    borderTop: "1px solid #e6e9f0",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
    color: "#64748b",
  },
};

export const AnchorInfo = () => {
  return (
    <div style={styles.wrap}>
      <main style={styles.card}>
        <h1 style={styles.title}>LINK NGNC Anchor</h1>
        <p style={styles.subtitle}>Stellar SEP-24 Anchor Service</p>

        <span style={styles.status}>
          <span style={styles.dot} /> Active
        </span>

        <section style={styles.panel}>
          <p style={styles.label}>Stellar TOML File</p>
          <p style={styles.text}>
            Our Stellar TOML configuration file is hosted at:
            <br />
            <a style={styles.link} href={TOML_URL}>
              TOML
            </a>
          </p>
        </section>

        <section style={styles.panel}>
          <p style={styles.label}>Service</p>
          <p style={styles.text}>
            LINK provides NGNC off-ramp services for Nigerian users. Sell NGNC for NGN through our
            secure SEP-24 compliant platform.
          </p>
        </section>

        <section style={styles.panel}>
          <p style={styles.label}>Supported Asset</p>
          <p style={styles.text}>
            <strong>NGNC</strong> (NGN Coin)
          </p>
          <p style={{ ...styles.text, ...styles.issuer }}>
            Issuer:
            <br />
            {ISSUER}
          </p>
        </section>

        <section style={styles.panel}>
          <p style={styles.label}>Transfer Server</p>
          <p style={styles.text}>
            <a style={styles.link} href={TRANSFER_SERVER}>
              {TRANSFER_SERVER}
            </a>
          </p>
        </section>

        <a
          style={styles.visit}
          href={VISIT_URL}
          onMouseOver={(e) => (e.currentTarget.style.background = BRAND_DARK)}
          onMouseOut={(e) => (e.currentTarget.style.background = BRAND)}
        >
          Visit LINK &rarr;
        </a>

        <p style={styles.footer}>Powered by LINK &bull; SEP-24 Compliant &bull; Stellar Network</p>
      </main>
    </div>
  );
};
