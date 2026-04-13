import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

/* ─── flower SVG generator ─────────────────────────────────── */
function makeSVG(W: number, H: number) {
  const bl = ["#90c8f0", "#b8ddf8", "#d0ecff", "#6aaee0", "#3a8ac8"];
  const si = ["#c0cdd8", "#d8e4ec", "#b0c0cc", "#e8f0f5", "#a0b4c4"];
  const gr = ["#8aaa94", "#a0bc9e", "#6a8c74", "#b4c8b0", "#7a9e84"];
  const lb = ["#bcd8f0", "#d4eafc", "#a8ccec"];

  const petal = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    angle: number,
    fill: string,
    op: number = 0.82,
  ): string =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${op}" transform="rotate(${angle},${cx},${cy})"/>`;

  const rose = (
    cx: number,
    cy: number,
    sz: number,
    c1: string,
    c2: string,
    c3: string,
    rot: number,
  ): string => {
    const R = sz * 0.4;
    let o = "";
    for (let i = 0; i < 8; i++) {
      const a = (360 / 8) * i + rot,
        rad = (a * Math.PI) / 180;
      const px = cx + Math.cos(rad) * R,
        py = cy + Math.sin(rad) * R;
      o += petal(px, py, sz * 0.25, sz * 0.1, a, c1, 0.78);
    }
    for (let i = 0; i < 6; i++) {
      const a = (360 / 6) * i + rot + 22,
        rad = (a * Math.PI) / 180;
      const px = cx + Math.cos(rad) * R * 0.57,
        py = cy + Math.sin(rad) * R * 0.57;
      o += petal(px, py, sz * 0.18, sz * 0.09, a, c2, 0.88);
    }
    o += `<circle cx="${cx}" cy="${cy}" r="${sz * 0.15}" fill="${c2}" opacity=".9"/>`;
    o += `<circle cx="${cx}" cy="${cy}" r="${sz * 0.07}" fill="${c3}" opacity="1"/>`;
    return o;
  };

  const dahlia = (
    cx: number,
    cy: number,
    sz: number,
    c1: string,
    c2: string,
    rot: number,
  ): string => {
    let o = "";
    [
      [sz * 0.4, 10, 0],
      [sz * 0.26, 8, 18],
      [sz * 0.12, 6, 10],
    ].forEach(([R, n, off], li) => {
      for (let i = 0; i < n; i++) {
        const a = (360 / n) * i + rot + off,
          rad = (a * Math.PI) / 180;
        const px = cx + Math.cos(rad) * R,
          py = cy + Math.sin(rad) * R;
        o += petal(
          px,
          py,
          sz * (0.15 - li * 0.03),
          sz * (0.065 - li * 0.01),
          a,
          li % 2 === 0 ? c1 : c2,
          0.74 + li * 0.07,
        );
      }
    });
    o += `<circle cx="${cx}" cy="${cy}" r="${sz * 0.08}" fill="${c2}" opacity=".95"/>`;
    return o;
  };

  const leaf = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    b: number,
    c: string,
    op: number = 0.62,
  ): string => {
    const mx = (x1 + x2) / 2 + b,
      my = (y1 + y2) / 2;
    return `<path d="M${x1},${y1} Q${mx},${my} ${x2},${y2} Q${mx - b * 2},${my} ${x1},${y1}" fill="${c}" opacity="${op}"/>`;
  };

  const stem = (
    x1: number,
    y1: number,
    cpx: number,
    cpy: number,
    x2: number,
    y2: number,
    c: string,
    sw: number = 1.8,
  ): string =>
    `<path d="M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;

  const eucaBranch = (
    ox: number,
    oy: number,
    deg: number,
    len: number,
    lc: string,
    sc: string,
  ): string => {
    const rad = (deg * Math.PI) / 180;
    const ex = ox + Math.cos(rad) * len,
      ey = oy + Math.sin(rad) * len;
    let o = stem(ox, oy, (ox + ex) / 2, (oy + ey) / 2, ex, ey, sc, 1.3);
    for (let i = 1; i <= 5; i++) {
      const t = i / 6;
      const px = ox + Math.cos(rad) * len * t,
        py = oy + Math.sin(rad) * len * t;
      const la = deg + (i % 2 === 0 ? 64 : -64),
        lr = (la * Math.PI) / 180;
      const ll = 12 + i * 2;
      const lx = px + Math.cos(lr) * ll,
        ly = py + Math.sin(lr) * ll;
      o += leaf(px, py, lx, ly, (i % 2 === 0 ? 4 : -4) * 1.2, lc, 0.58);
    }
    return o;
  };

  const maxD = Math.min(W, H) * 0.22;
  const aBase = [12, 25, 38, 52, 66, 78, 18, 45, 60];

  const corner = (ox: number, oy: number, flip: boolean): string => {
    let g = "";
    aBase.forEach((ba, i) => {
      const deg = flip ? 180 + ba : ba;
      const l = Math.min(maxD * (0.42 + i * 0.065), maxD);
      const rad = (deg * Math.PI) / 180;
      const ex = ox + Math.cos(rad) * l,
        ey = oy + Math.sin(rad) * l;
      const cpx = (ox + ex) / 2 + (i % 2 === 0 ? 8 : -8),
        cpy = (oy + ey) / 2;

      g += stem(ox, oy, cpx, cpy, ex, ey, gr[3], 1.8);

      const mx = ox + Math.cos(rad) * l * 0.44,
        my = oy + Math.sin(rad) * l * 0.44;
      g += leaf(
        mx,
        my,
        mx + Math.cos(((deg + 62) * Math.PI) / 180) * 13,
        my + Math.sin(((deg + 62) * Math.PI) / 180) * 13,
        4,
        gr[0],
        0.64,
      );
      g += leaf(
        mx,
        my,
        mx + Math.cos(((deg - 62) * Math.PI) / 180) * 11,
        my + Math.sin(((deg - 62) * Math.PI) / 180) * 11,
        -4,
        gr[1],
        0.58,
      );
      g += eucaBranch(ox, oy, deg, l, gr[0], gr[3]);

      const fsz = Math.min(30 + i * 7, 62);
      const ic = i % 3;
      if (ic === 0) g += rose(ex, ey, fsz, bl[0], bl[1], bl[4], i * 17);
      else if (ic === 1) g += rose(ex, ey, fsz, si[0], si[1], si[4], i * 19);
      else g += dahlia(ex, ey, fsz, lb[0], lb[2], i * 13);

      if (i < 6) {
        const mx2 = ox + Math.cos(rad) * l * 0.5,
          my2 = oy + Math.sin(rad) * l * 0.5;
        const f2 = Math.min(18 + i * 5, 38);
        g +=
          i % 2 === 0
            ? rose(mx2, my2, f2, si[1], lb[0], si[4], i * 22)
            : rose(mx2, my2, f2, bl[0], bl[2], bl[3], i * 19);
      }
    });
    return g;
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.93;">${corner(0, 0, false)}${corner(W, H, true)}</svg>`;
}

/* ─── gifts data ────────────────────────────────────────────── */
// const GIFTS = [
//   { icon: "🌸", name: "Perfume", price: "a partir de R$120" },
//   { icon: "💄", name: "Kit Maquiagem", price: "a partir de R$80" },
//   { icon: "💎", name: "Joias", price: "a partir de R$150" },
//   { icon: "✨", name: "Experiência Spa", price: "a partir de R$200" },
//   { icon: "👜", name: "Roupas & Bolsas", price: "a partir de R$100" },
//   { icon: "🎀", name: "Vale Presente", price: "qualquer valor" },
// ];
const GIFTS = [
  { icon: "👚", name: "Blusas", desc: "Tamanho M" },
  { icon: "👖", name: "Calças", desc: "Tamanho 36" },
  { icon: "👠", name: "Sapatos", desc: "Tamanho 36" },
  { icon: "👜", name: "Bolsas", desc: "" },
  { icon: "💍", name: "Acessórios", desc: "" },
];

// const MSG =
//   "Com muita alegria no coração, convido você para celebrar comigo um dos momentos mais especiais da minha vida: meus 15 anos. Será uma noite inesquecível, cheia de sonhos, sorrisos e emoção. Sua presença tornará tudo ainda mais especial.";

const MSG =
  "Com muita alegria no coração, convido você para celebrar comigo um dos momentos mais especiais da minha vida: meus 15 anos.\n" +
  "Será uma noite inesquecível, cheia de sonhos, sorrisos e emoção. Sua presença tornará tudo ainda mais especial.";

/* ─── FlowerLayer ───────────────────────────────────────────── */
function FlowerLayer({ w, h }: { w: number; h: number }) {
  if (!w || !h) return null;
  return (
    <div
      className="fl-layer"
      dangerouslySetInnerHTML={{ __html: makeSVG(w, h) }}
    />
  );
}

type Countdown = {
  d: string;
  h: string;
  m: string;
  s: string;
};

/* ─── main App ──────────────────────────────────────────────── */
export function App() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const swRef = useRef<HTMLDivElement | null>(null);

  /* dimensions */
  const [dim, setDim] = useState({ w: 0, h: 0 });

  /* states */
  const [pulled, setPulled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({
    d: "--",
    h: "--",
    m: "--",
    s: "--",
  });
  // const [giftPicked, setGiftPicked] = useState("");
  // const [giftMsg, setGiftMsg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plus, setPlus] = useState("Vou sozinha");
  const [confirmed, setConfirmed] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");

  /* ── measure host ── */
  const measure = useCallback((): void => {
    if (!hostRef.current) return;
    const el = hostRef.current;
    // sobe na árvore até encontrar altura real
    let ref: HTMLElement | null = el;
    let h: number = 0;
    while (ref && h < 200) {
      h = ref.offsetHeight;
      ref = ref.parentElement;
    }
    if (h < 200) h = window.innerHeight || 600;
    const w = el.offsetWidth || 400;
    setDim({ w, h });
  }, []);

  useEffect(() => {
    const timer = setTimeout(measure, 60);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ── apply height to sections via CSS var ── */
  useEffect(() => {
    if (!dim.h) return;
    const host = hostRef.current;
    if (host) host.style.height = dim.h + "px";
    const sw = swRef.current;
    if (sw) sw.style.height = dim.h + "px";
  }, [dim]);

  /* ── scroll listener ── */
  useEffect(() => {
    const sw = swRef.current;
    if (!sw || !dim.h) return;
    const onScroll = () => {
      const idx = Math.round(sw.scrollTop / dim.h) + 1;
      setCurrentPage(idx);
      if (idx === 2 && !typingStarted) setTypingStarted(true);
    };
    sw.addEventListener("scroll", onScroll, { passive: true });
    return () => sw.removeEventListener("scroll", onScroll);
  }, [dim.h, typingStarted]);

  /* ── typing effect ── */
  useEffect(() => {
    if (!typingStarted) return;
    let i = 0;
    setTypedText("");
    const t = setInterval(() => {
      i++;
      setTypedText(MSG.slice(0, i));
      if (i >= MSG.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [typingStarted]);

  /* ── countdown ── */
  useEffect(() => {
    // const tgt = new Date("2026-05-16T19:00:00");
    const tgt = new Date(2026, 4, 16, 19, 0, 0);
    const fmt = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      let diff = tgt.getTime() - new Date().getTime();
      if (diff < 0) diff = 0;
      setCountdown({
        d: fmt(Math.floor(diff / 86400000)),
        h: fmt(Math.floor((diff % 86400000) / 3600000)),
        m: fmt(Math.floor((diff % 3600000) / 60000)),
        s: fmt(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* ── helpers ── */
  const scrollTo = (page: number) => {
    const sw = swRef.current;
    if (!sw || !dim.h) return;
    sw.scrollTo({ top: (page - 1) * dim.h, behavior: "smooth" });
  };

  const handlePull = () => {
    setTimeout(() => setPulled(true), 460);
  };

  const handleConfirm = () => {
    if (!name.trim()) return;
    let msg = `${name.trim()}, Fernanda está super feliz em ter você na festa!`;
    // if (giftPicked) msg += ` Obrigada pela ideia: ${giftPicked}!`;
    setConfirmMsg(msg);
    setConfirmed(true);

    //     const text = `Confirmação de presença:
    // Nome: ${name}
    // Telefone: ${phone}
    // Acompanhantes: ${plus}
    // Presente: ${giftPicked}`;
    const text = `Confirmação de presença:
Nome: ${name}
Telefone: ${phone}
Acompanhantes: ${plus}`;

    const url = `https://wa.me/5585997439296?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  const sectionStyle = { height: dim.h ? dim.h + "px" : "100%" };

  return (
    <div className="host" id="host" ref={hostRef}>
      {/* ── PULL SCREEN ── */}
      <div
        className={`pull-screen${pulled ? " away" : ""}`}
        style={sectionStyle}
      >
        <div className="fl-layer">
          <FlowerLayer w={dim.w} h={dim.h} />
        </div>
        <div className="ceiling-bar" />
        <div className="rope-line-el" />
        <div className="rope-wrap" id="ropeWrap" onClick={handlePull}>
          <div
            className="rope-body"
            id="ropeBody"
            style={pulled ? { height: "200px" } : {}}
          />
          <div className="rope-knot" />
        </div>
        <p className="rope-hint">aperte para abrir</p>
        <p className="rope-subtitle">— Um momento especial aguarda você —</p>
      </div>

      {/* ── SCROLL WRAP ── */}
      <div className="scroll-wrap" id="sw" ref={swRef}>
        {/* S1 — capa */}
        <div className="section" id="s1" style={sectionStyle}>
          <div className="fl-layer">
            <FlowerLayer w={dim.w} h={dim.h} />
          </div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ você está convidado(a) ✦</div>
            <div className="sline" />
            <div
              className="bs"
              style={{ fontSize: "12px", marginBottom: "1px" }}
            >
              Aniversário de
            </div>
            <div
              style={{
                fontFamily: "Playfair Display,serif",
                fontStyle: "italic",
                fontSize: "3.6rem",
                color: "#1a4a7a",
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              Maria
              <br />
              Fernanda
            </div>
            <div className="sline" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                margin: "6px 0",
                justifyContent: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Playfair Display,serif",
                    fontSize: "3.8rem",
                    color: "#1a4a7a",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  15
                </div>
                <div className="lsm">anos</div>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "56px",
                  background:
                    "linear-gradient(180deg,transparent,#a0bcd8,transparent)",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#1a4a7a",
                    lineHeight: 2.1,
                    fontFamily: "Montserrat,sans-serif",
                  }}
                >
                  16 de Maio, 2026
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#1a4a7a",
                    lineHeight: 2.1,
                    fontFamily: "Montserrat,sans-serif",
                  }}
                >
                  19h00
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6aabdd",
                    lineHeight: 2.1,
                    fontFamily: "Cormorant Garamond,serif",
                    fontStyle: "italic",
                  }}
                >
                  Sítio dona Hilda
                </div>
              </div>
            </div>
            <div className="scroll-hint">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3v12M5 11l5 5 5-5"
                  stroke="#6aabdd"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: "2px",
                  color: "#6aabdd",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                role para baixo
              </span>
            </div>
          </div>
        </div>

        {/* S2 — mensagem */}
        <div className="section" id="s2" style={sectionStyle}>
          <div className="fl-layer">
            <FlowerLayer w={dim.w} h={dim.h} />
          </div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ mensagem da aniversariante ✦</div>
            <div className="sline" />
            <div
              style={{
                fontFamily: "Playfair Display,serif",
                fontSize: "2rem",
                color: "#6aabdd",
                lineHeight: 1,
              }}
            >
              "
            </div>
            <div
              className="bs"
              style={{
                padding: "0 12px",
                minHeight: "90px",
                whiteSpace: "pre-line",
              }}
            >
              {typedText}
            </div>
            <div
              style={{
                fontFamily: "Playfair Display,serif",
                fontSize: "2rem",
                color: "#6aabdd",
                lineHeight: 1,
              }}
            >
              "
            </div>
            <div className="sline" />
            <div className="lsm">— Maria Fernanda</div>
          </div>
        </div>

        {/* S3 — local */}
        <div className="section" id="s3" style={sectionStyle}>
          <div className="fl-layer">
            <FlowerLayer w={dim.w} h={dim.h} />
          </div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ onde vai ser ✦</div>
            <div className="sline" />
            <div
              style={{
                fontFamily: "Playfair Display,serif",
                fontSize: "1.8rem",
                color: "#1a4a7a",
                fontWeight: 700,
                margin: "4px 0",
              }}
            >
              Sítio dona Hilda
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#6aabdd",
                letterSpacing: "1px",
                marginBottom: "10px",
                fontFamily: "Montserrat,sans-serif",
              }}
            >
              Rua Afonsio timbucio, 120 — Maracanaú, CE
            </div>
            <div className="info-grid">
              <div className="ib">
                <div className="il">Data</div>
                <div className="iv">16 Mai 2026</div>
              </div>
              <div className="ib">
                <div className="il">Horário</div>
                <div className="iv">19h00</div>
              </div>
              {/* <div className="ib">
                <div className="il">Traje</div>
                <div className="iv">Elegante</div>
              </div> */}
            </div>
            <div
              style={{
                background: "rgba(100,171,221,0.08)",
                border: "1px solid rgba(100,171,221,0.2)",
                borderRadius: "14px",
                padding: "12px 20px",
                marginTop: "10px",
                maxWidth: "280px",
              }}
            >
              <div className="cd-wrap">
                {(
                  [
                    ["d", "dias"],
                    ["h", "horas"],
                    ["m", "min"],
                    ["s", "seg"],
                  ] as [keyof Countdown, string][]
                ).map(([k, label], i) => (
                  <>
                    {i > 0 && (
                      <div key={`sep-${k}`} className="cd-sep">
                        :
                      </div>
                    )}
                    <div key={k} className="cd-box">
                      <div className="cd-n">{countdown[k]}</div>
                      <div className="cd-l">{label}</div>
                    </div>
                  </>
                ))}
              </div>
              <div className="lsm" style={{ marginTop: "5px" }}>
                para a festa
              </div>
            </div>
          </div>
        </div>

        {/* S4 — presentes */}
        <div className="section" id="s4" style={sectionStyle}>
          <div className="fl-layer">
            <FlowerLayer w={dim.w} h={dim.h} />
          </div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ lista de presentes ✦</div>
            <div className="sline" />
            <div
              className="bs"
              style={{ fontSize: "13px", marginBottom: "6px" }}
            >
              {/* Escolha uma ideia para presentear Fernanda */}
              Sugestões de presentes
            </div>
            <div className="gg">
              {GIFTS.map((g) => (
                // <div
                //   key={g.name}
                //   className={`gc${giftPicked === g.name ? " picked" : ""}`}
                //   onClick={() => {
                //     setGiftPicked(g.name);
                //     setGiftMsg(`Selecionado: ${g.name} ✦`);
                //   }}
                // >
                <div key={g.name} className="gc">
                  <div className="gi">{g.icon}</div>
                  <div className="gn">{g.name}</div>
                  {g.desc && <div className="gp">{g.desc}</div>}
                  {/* <div className="gp">{g.price}</div> */}
                </div>
              ))}
            </div>
            {/* <div
              style={{
                fontSize: "12px",
                color: "#6aabdd",
                fontStyle: "italic",
                minHeight: "18px",
                marginTop: "4px",
                fontFamily: "Cormorant Garamond,serif",
              }}
            >
              {giftMsg}
            </div> */}
          </div>
        </div>

        {/* S5 — RSVP */}
        <div className="section" id="s5" style={sectionStyle}>
          <div className="fl-layer">
            <FlowerLayer w={dim.w} h={dim.h} />
          </div>
          {!confirmed ? (
            <div
              id="fArea"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                position: "relative",
                zIndex: 2,
                padding: "24px 32px",
              }}
            >
              <div className="ey">✦ confirmar presença ✦</div>
              <div className="sline" />
              <div
                className="bs"
                style={{ fontSize: "13px", marginBottom: "10px" }}
              >
                Fernanda mal pode esperar para te ver!
              </div>
              <input
                className="fi"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="fi"
                placeholder="WhatsApp (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <select
                className="fsel"
                value={plus}
                onChange={(e) => setPlus(e.target.value)}
              >
                <option>Vou sozinha</option>
                <option>Vou com 1 acompanhante</option>
                <option>Vou com 2 acompanhantes</option>
              </select> */}
              <select
                className="fsel"
                value={plus}
                onChange={(e) => setPlus(e.target.value)}
              >
                <option value={0}>Vou sozinho(a)</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Vou com {i + 1} acompanhante{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
              <button className="cbtn" onClick={handleConfirm}>
                Confirmar presença ✦
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
                position: "relative",
                zIndex: 2,
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "2.8rem" }}>🎀</div>
              <div
                style={{
                  fontFamily: "Playfair Display,serif",
                  fontSize: "1.7rem",
                  color: "#1a4a7a",
                  fontWeight: 700,
                }}
              >
                Que alegria!
              </div>
              <div className="sline" />
              <div
                className="bs"
                style={{ maxWidth: "320px", fontSize: "14px" }}
              >
                {confirmMsg}
              </div>
              <div className="lsm" style={{ marginTop: "6px" }}>
                Até breve na festa! 💙
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── DOTS ── */}
      <div className="pdots">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`pdot${currentPage === i ? " on" : ""}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
