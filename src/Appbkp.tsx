import "App.css";

export function App() {
  return (
    <div className="host" id="host">
      <div className="pull-screen" id="pullScreen">
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
          id="flPull"
        ></div>
        <div className="ceiling-bar"></div>
        <div className="rope-line-el"></div>
        <div className="rope-wrap" id="ropeWrap">
          <div className="rope-body" id="ropeBody"></div>
          <div className="rope-knot"></div>
        </div>
        <p className="rope-hint">puxe para abrir</p>
        <p className="rope-subtitle">— Um momento especial aguarda você —</p>
      </div>

      <div className="scroll-wrap" id="sw">
        <div className="section" id="s1">
          <div className="fl-layer" id="fl1"></div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ você está convidada ✦</div>
            <div className="sline"></div>
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
              Sofia
              <br />
              Almeida
            </div>
            <div className="sline"></div>
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
              ></div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#1a4a7a",
                    lineHeight: 2.1,
                    fontFamily: "Montserrat,sans-serif",
                  }}
                >
                  14 de Junho, 2025
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
                  Espaço Villa Azul
                </div>
              </div>
            </div>
            <div className="scroll-hint">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3v12M5 11l5 5 5-5"
                  stroke="#6aabdd"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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

        <div className="section" id="s2">
          <div className="fl-layer" id="fl2"></div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ mensagem da aniversariante ✦</div>
            <div className="sline"></div>
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
              style={{ padding: "0 12px", minHeight: "90px" }}
              id="typeEl"
            ></div>
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
            <div className="sline"></div>
            <div className="lsm">— Sofia Almeida</div>
          </div>
        </div>

        <div className="section" id="s3">
          <div className="fl-layer" id="fl3"></div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ onde vai ser ✦</div>
            <div className="sline"></div>
            <div
              style={{
                fontFamily: "Playfair Display,serif",
                fontSize: "1.8rem",
                color: "#1a4a7a",
                fontWeight: 700,
                margin: "4px 0",
              }}
            >
              Espaço Villa Azul
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
              Av. das Flores, 1200 — Fortaleza, CE
            </div>
            <div className="info-grid">
              <div className="ib">
                <div className="il">Data</div>
                <div className="iv">14 Jun 2025</div>
              </div>
              <div className="ib">
                <div className="il">Horário</div>
                <div className="iv">19h00</div>
              </div>
              <div className="ib">
                <div className="il">Traje</div>
                <div className="iv">Elegante</div>
              </div>
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
                <div className="cd-box">
                  <div className="cd-n" id="cd-d">
                    --
                  </div>
                  <div className="cd-l">dias</div>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-box">
                  <div className="cd-n" id="cd-h">
                    --
                  </div>
                  <div className="cd-l">horas</div>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-box">
                  <div className="cd-n" id="cd-m">
                    --
                  </div>
                  <div className="cd-l">min</div>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-box">
                  <div className="cd-n" id="cd-s">
                    --
                  </div>
                  <div className="cd-l">seg</div>
                </div>
              </div>
              <div className="lsm" style={{ marginTop: "5px" }}>
                para a festa
              </div>
            </div>
          </div>
        </div>

        <div className="section" id="s4">
          <div className="fl-layer" id="fl4"></div>
          <div className="sc" style={{ gap: "2px" }}>
            <div className="ey">✦ lista de presentes ✦</div>
            <div className="sline"></div>
            <div
              className="bs"
              style={{ fontSize: "13px", marginBottom: "6px" }}
            >
              Escolha uma ideia para presentear Sofia
            </div>
            <div className="gg" id="gGrid"></div>
            <div
              id="gMsg"
              style={{
                fontSize: "12px",
                color: "#6aabdd",
                fontStyle: "italic",
                minHeight: "18px",
                marginTop: "4px",
                fontFamily: "Cormorant Garamond,serif",
              }}
            ></div>
          </div>
        </div>

        <div className="section" id="s5">
          <div className="fl-layer" id="fl5"></div>
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
            <div className="sline"></div>
            <div
              className="bs"
              style={{ fontSize: "13px", marginBottom: "10px" }}
            >
              Sofia mal pode esperar para te ver!
            </div>
            <input className="fi" id="gName" placeholder="Seu nome completo" />
            <input
              className="fi"
              id="gPhone"
              placeholder="WhatsApp (opcional)"
            />
            <select className="fsel" id="gPlus">
              <option>Vou sozinha</option>
              <option>Vou com 1 acompanhante</option>
              <option>Vou com 2 acompanhantes</option>
            </select>
            <button className="cbtn" id="confirmBtn">
              Confirmar presença ✦
            </button>
          </div>
          <div
            id="tyArea"
            style={{
              display: "none",
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
            <div className="sline"></div>
            <div
              id="tyMsg"
              className="bs"
              style={{ maxWidth: "320px", fontSize: "14px" }}
            ></div>
            <div className="lsm" style={{ marginTop: "6px" }}>
              Até breve na festa! 💙
            </div>
          </div>
        </div>
      </div>

      <div className="pdots" id="pdots">
        <div className="pdot on" data-i="1"></div>
        <div className="pdot" data-i="2"></div>
        <div className="pdot" data-i="3"></div>
        <div className="pdot" data-i="4"></div>
        <div className="pdot" data-i="5"></div>
      </div>
    </div>
  );
}
