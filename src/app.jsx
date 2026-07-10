import React from "react";
import { DATA } from "./data.js";

// Load every screenshot in src/assets as a URL, keyed by filename (id),
// regardless of extension — these are the raw originals from the PDF.
const files = import.meta.glob("./assets/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
});
const byId = {};
for (const p in files)
  byId[
    p
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
  ] = files[p];
const IMG = (id) => byId[id];
const PDF = `${import.meta.env.BASE_URL}${DATA.site.pdf}`;

const ext = { target: "_blank", rel: "noopener noreferrer" };
const Arrow = () => (
  <svg
    className="ai"
    viewBox="0 0 24 24"
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="brand">
        <span className="bname">{DATA.site.name}</span>
      </a>
      <nav className="navlinks">
        <a href="#uiux">UIUX Designs</a>
        <a href="#other">Other Designs</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="hero"
      id="top"
      style={{ backgroundImage: `url(${IMG("hero_background")})` }}
    >
      <div className="hero-left">
        <div className="hero-sep-top" />
        <h1 className="hello" aria-label={DATA.site.hello}>
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-hidden="true"
          >
            <text
              x="500"
              y="100"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
            >
              {DATA.site.hello}
            </text>
          </svg>
        </h1>
        <div className="portrait-wrap">
          <img className="portrait" src={IMG("hero")} alt="Chloe" />
        </div>
        <div className="hero-sep-bot" />
        <span className="hero-year">2026</span>
      </div>
      <div className="hero-right">
        <div className="hero-copy">
          <p className="blurb">
            In 2019, I filmed my first travel video and instantly fell in love
            with creating. Since then, besides UIUX, I&apos;ve been expressing
            myself through <strong>video editing</strong>,{" "}
            <strong>passion projects</strong>, and{" "}
            <strong>designing wacky graphics</strong>. On the side, I have gone
            through countless rolls of film to capture the special moments in
            life!
          </p>
          <div className="hero-links">
            <a href={DATA.site.linkedin} {...ext}>
              LinkedIn <Arrow />
            </a>
            <a href={DATA.site.youtube} {...ext}>
              YouTube <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ c }) {
  const inner = (
    <>
      <div className="card-label">
        {c.label}
        {c.href && <Arrow />}
      </div>
      <div className="card-shot">
        <img src={IMG(c.img)} alt={c.label} loading="lazy" />
      </div>
      <p className="card-cap">{c.cap}</p>
    </>
  );
  return c.href ? (
    <a className="card link" href={c.href} {...ext}>
      {inner}
    </a>
  ) : (
    <div className="card">{inner}</div>
  );
}

function Project({ p, idx }) {
  return (
    <article className="proj" id={`uiux-${idx}`}>
      <div className="proj-head">
        <h3>{p.title}</h3>
        <span className="year">{p.year}</span>
      </div>
      <p className="proj-desc">{p.desc}</p>
      <div className="cards">
        {p.cards.map((c, i) => (
          <Card key={i} c={c} />
        ))}
      </div>
    </article>
  );
}

function Banner({ b, idx }) {
  return (
    <article className={"banner " + b.theme} id={`banner-${idx}`}>
      <a className="banner-head" href={b.href} {...ext}>
        <h3>
          {b.title} <Arrow />
        </h3>
        <span className="year">{b.year}</span>
      </a>
      <p className="banner-desc">{b.desc}</p>
      <div className="gallery4">
        {b.gallery.map((g, i) => (
          <a key={i} className="shot" href={g.href} {...ext}>
            <img
              src={IMG(g.img)}
              alt={`${b.title} screen ${i + 1}`}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </article>
  );
}

function OtherBlock({ o, idx }) {
  return (
    <article className="other-block" id={`other-${idx}`}>
      <h3>{o.title}</h3>
      <p className="proj-desc">{o.desc}</p>
      {o.gallery ? (
        <div className="gallery3">
          {o.gallery.map((g, i) =>
            g.href ? (
              <>
                <a key={i} className="socard" href={g.href} {...ext}>
                  <div className="card-shot">
                    <img src={IMG(g.img)} alt={g.label} loading="lazy" />
                  </div>

                  <div className="card-label sm">
                    {g.label}
                    <Arrow />
                  </div>
                </a>
              </>
            ) : (
              <>
                <div key={i} className="socard-nolink" href={g.href} {...ext}>
                  <div className="card-shot">
                    <img src={IMG(g.img)} alt={g.label} loading="lazy" />
                  </div>

                  <div className="card-label sm">{g.label}</div>
                </div>
              </>
            ),
          )}
        </div>
      ) : (
        <div className="single-shot">
          <img src={IMG(o.img)} alt={o.title} loading="lazy" />
        </div>
      )}
    </article>
  );
}

function SideNav() {
  return (
    <aside className="side-nav">
      <div className="side-group">
        <p className="side-head">UIUX Design Work</p>
        <ul>
          {DATA.uiux.map((p, i) => (
            <li key={`u-${i}`}>
              <a href={`#uiux-${i}`}>{p.title}</a>
            </li>
          ))}
          {DATA.banners.map((b, i) => (
            <li key={`b-${i}`}>
              <a href={`#banner-${i}`}>{b.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="side-group">
        <p className="side-head">Other Design Work</p>
        <ul>
          {DATA.other.map((o, i) => (
            <li key={`o-${i}`}>
              <a href={`#other-${i}`}>{o.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <SideNav />
        <div className="main-content">
          <section className="sec" id="uiux">
            <p className="eyebrow">UIUX Design Work</p>
            {DATA.uiux.map((p, i) => (
              <Project key={i} p={p} idx={i} />
            ))}
            {DATA.banners.map((b, i) => (
              <Banner key={i} b={b} idx={i} />
            ))}
          </section>
          <section className="sec" id="other">
            <p className="eyebrow">Other Design Work</p>
            {DATA.other.map((o, i) => (
              <OtherBlock key={i} o={o} idx={i} />
            ))}
          </section>
        </div>
      </main>
      <footer className="foot">
        <span>{DATA.site.name}</span>
        <div className="foot-links">
          <a href={DATA.site.linkedin} {...ext}>
            LinkedIn
          </a>
          <a href={DATA.site.youtube} {...ext}>
            YouTube
          </a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
