import { useEffect, useMemo, useRef, useState } from "react";
import { assetUrl, content, localized } from "./content";

function parseDate(dateString) {
  const [year, month, day] = String(dateString).slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <path d="M6 2v4M18 2v4M3 9h18" />
        <rect x="3" y="4" width="18" height="17" rx="3" />
      </>
    ),
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    message: <><path d="M20 11a8 8 0 0 1-8 8 9 9 0 0 1-3.5-.7L4 20l1.7-4.1A8 8 0 1 1 20 11Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Bilingual({ entry, field, as: Tag = "span", className = "" }) {
  const english = localized(entry, field, "en");
  const chinese = localized(entry, field, "zh");

  return (
    <Tag className={`bilingual ${className}`.trim()}>
      <span className="text-en" lang="en">{english}</span>
      {chinese && <span className="text-zh" lang="zh-CN">{chinese}</span>}
    </Tag>
  );
}

function bilingualLabel(entry, field) {
  return `${localized(entry, field, "en")} / ${localized(entry, field, "zh")}`;
}

function Header() {
  const [open, setOpen] = useState(false);
  const site = content.site;
  const nav = [
    ["about", "nav_about"],
    ["highlights", "nav_highlights"],
    ["events", "nav_events"],
    ["contact", "nav_contact"],
  ];

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content / 跳到主要内容
      </a>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        <Bilingual entry={site} field="announcement" />
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={bilingualLabel(site, "site_name")}>
            <span className="brand-mark">{site.site_mark}</span>
            <Bilingual entry={site} field="site_name" />
          </a>

          <nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation">
            {nav.map(([target, label]) => (
              <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>
                <Bilingual entry={site} field={label} />
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="menu-button"
              type="button"
              aria-label={bilingualLabel(site, open ? "menu_close" : "menu_open")}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  const site = content.site;

  return (
    <section className="hero" id="top">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <Bilingual entry={site} field="hero_eyebrow" as="p" className="eyebrow light" />
          <h1>
            <span className="hero-title-line">
              <span className="text-en" lang="en">{localized(site, "hero_title", "en")}</span>
              <span className="text-zh" lang="zh-CN">{localized(site, "hero_title", "zh")}</span>
            </span>
            <span className="hero-title-line accent-line">
              <span className="text-en" lang="en">{localized(site, "hero_accent", "en")}</span>
              <span className="text-zh" lang="zh-CN">{localized(site, "hero_accent", "zh")}</span>
            </span>
          </h1>
          <Bilingual entry={site} field="hero_body" as="div" className="hero-body" />
          <div className="hero-actions">
            <a className="button button-primary" href="#events">
              <Bilingual entry={site} field="hero_primary_cta" />
              <Icon name="arrow" />
            </a>
            <a className="button button-ghost" href="#about">
              <Bilingual entry={site} field="hero_secondary_cta" />
            </a>
          </div>
          <div className="hero-note"><Icon name="check" size={17} /> <Bilingual entry={site} field="hero_note" /></div>
        </div>

        <div className="hero-card" aria-label={bilingualLabel(site, "hero_note")}>
          <div className="hero-card-art">
            <span className="maple maple-one">◆</span>
            <span className="maple maple-two">◆</span>
            <div className="conversation-card card-a">
              <span>Hello!</span>
              <small>Nice to meet you.</small>
            </div>
            <div className="conversation-card card-b">
              <span>你好！</span>
              <small>一起练习吧。</small>
            </div>
            <div className="avatar-group" aria-hidden="true">
              <span>AM</span><span>JL</span><span>SK</span><b>+</b>
            </div>
          </div>
          <div className="hero-card-caption">
            <span className="pulse" aria-hidden="true" />
            <Bilingual entry={site} field="hero_note" />
          </div>
        </div>
      </div>

      <div className="shell stats" aria-label="Community at a glance">
        {(site.stats ?? []).map((stat) => (
          <div className="stat" key={stat.value}>
            <strong>{stat.value}</strong>
            <Bilingual entry={stat} field="label" />
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const site = content.site;
  const about = content.about;

  return (
    <section className="section about" id="about">
      <div className="shell">
        <Bilingual entry={site} field="about_kicker" as="p" className="eyebrow" />
        <div className="about-intro">
          <Bilingual entry={about} field="title" as="h2" />
          <div className="about-copy">
            <Bilingual entry={about} field="intro" as="p" />
            <Bilingual entry={about} field="body" as="p" />
          </div>
        </div>
        <div className="values-grid">
          {(about.values ?? []).map((value) => (
            <article className="value-card" key={value.number}>
              <span className="value-number">{value.number}</span>
              <Bilingual entry={value} field="title" as="h3" />
              <Bilingual entry={value} field="text" as="p" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const site = content.site;
  const slides = content.highlights;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerStart = useRef(null);

  useEffect(() => {
    if (slides.length < 2 || paused || reducedMotion) return undefined;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [slides.length, paused, reducedMotion]);

  const move = (direction) => {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  };

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
    pointerStart.current = null;
  };

  if (!slides.length) return null;

  return (
    <section className="section highlights" id="highlights">
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <Bilingual entry={site} field="highlights_kicker" as="p" className="eyebrow" />
            <Bilingual entry={site} field="highlights_title" as="h2" />
          </div>
          <Bilingual entry={site} field="highlights_intro" as="p" />
        </div>

        <div
          className="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={(event) => { pointerStart.current = event.clientX; }}
          onPointerUp={handlePointerUp}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide) => (
              <article className="highlight-slide" key={slide.source}>
                <img
                  src={assetUrl(slide.image)}
                  alt={bilingualLabel(slide, "image_alt")}
                  loading="lazy"
                />
                <div className="highlight-shade" />
                <div className="highlight-content">
                  <div className="highlight-meta">
                    <time dateTime={slide.date}>
                      <span>{new Intl.DateTimeFormat("en-CA", {
                        month: "short",
                        year: "numeric",
                      }).format(parseDate(slide.date))}</span>
                      <small>{new Intl.DateTimeFormat("zh-CN", {
                        month: "short",
                        year: "numeric",
                      }).format(parseDate(slide.date))}</small>
                    </time>
                    <Bilingual entry={slide} field="location" />
                    {slide.is_sample && (
                      <span className="sample-badge">
                        <Bilingual entry={site} field="sample_label" />
                      </span>
                    )}
                  </div>
                  <Bilingual entry={slide} field="title" as="h3" />
                  <Bilingual entry={slide} field="description" as="p" />
                </div>
              </article>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button
                className="carousel-arrow previous"
                type="button"
                aria-label={bilingualLabel(site, "calendar_previous")}
                onClick={() => move(-1)}
              >
                <Icon name="left" />
              </button>
              <button
                className="carousel-arrow next"
                type="button"
                aria-label={bilingualLabel(site, "calendar_next")}
                onClick={() => move(1)}
              >
                <Icon name="right" />
              </button>
              <div className="carousel-dots" aria-label="Choose a highlight">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.source}
                    type="button"
                    className={slideIndex === index ? "active" : ""}
                    aria-label={`${slideIndex + 1} / ${slides.length}`}
                    aria-current={slideIndex === index ? "true" : undefined}
                    onClick={() => setIndex(slideIndex)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Calendar() {
  const site = content.site;
  const events = content.events;
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const firstRelevant = events.find((event) => parseDate(event.date) >= today) ?? events[0];
  const initialDate = firstRelevant ? parseDate(firstRelevant.date) : today;
  const [cursor, setCursor] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const monthEvents = events.filter((event) => {
    const date = parseDate(event.date);
    return date.getFullYear() === cursor.getFullYear() && date.getMonth() === cursor.getMonth();
  });

  const eventMap = monthEvents.reduce((map, event) => {
    const key = String(event.date).slice(0, 10);
    map.set(key, [...(map.get(key) ?? []), event]);
    return map;
  }, new Map());

  const firstWeekday = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, item) => item + 1),
  ];
  while (cells.length % 7) cells.push(null);

  const dayNames = Array.from({ length: 7 }, (_, day) => ({
    en: new Intl.DateTimeFormat("en-CA", { weekday: "short" }).format(new Date(2026, 7, 2 + day)),
    zh: new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(new Date(2026, 7, 2 + day)),
  }));

  const changeMonth = (amount) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + amount, 1));
    setSelectedDate(null);
  };

  const visibleEvents = selectedDate
    ? monthEvents.filter((event) => String(event.date).slice(0, 10) === selectedDate)
    : monthEvents;

  return (
    <section className="section events" id="events">
      <div className="shell">
        <div className="section-heading-row event-heading">
          <div>
            <Bilingual entry={site} field="events_kicker" as="p" className="eyebrow" />
            <Bilingual entry={site} field="events_title" as="h2" />
          </div>
          <Bilingual entry={site} field="events_intro" as="p" />
        </div>

        <div className="calendar-layout">
          <div className="calendar-panel">
            <div className="calendar-toolbar">
              <h3>
                <span>{new Intl.DateTimeFormat("en-CA", {
                  month: "long",
                  year: "numeric",
                }).format(cursor)}</span>
                <small>{new Intl.DateTimeFormat("zh-CN", {
                  month: "long",
                  year: "numeric",
                }).format(cursor)}</small>
              </h3>
              <div>
                <button
                  type="button"
                  aria-label={bilingualLabel(site, "calendar_previous")}
                  onClick={() => changeMonth(-1)}
                >
                  <Icon name="left" />
                </button>
                <button
                  type="button"
                  aria-label={bilingualLabel(site, "calendar_next")}
                  onClick={() => changeMonth(1)}
                >
                  <Icon name="right" />
                </button>
              </div>
            </div>
            <div className="calendar-grid weekday-row" aria-hidden="true">
              {dayNames.map((day, index) => (
                <span key={`${day.en}-${index}`}><b>{day.en}</b><small>{day.zh}</small></span>
              ))}
            </div>
            <div className="calendar-grid" role="grid">
              {cells.map((day, index) => {
                if (!day) return <span className="calendar-day empty" key={`empty-${index}`} />;
                const key = dateKey(new Date(cursor.getFullYear(), cursor.getMonth(), day));
                const dayEvents = eventMap.get(key) ?? [];
                const isToday = dateKey(today) === key;
                const isSelected = selectedDate === key;
                return (
                  <button
                    className={`calendar-day ${dayEvents.length ? "has-event" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                    type="button"
                    key={key}
                    disabled={!dayEvents.length}
                    aria-label={`${key}${dayEvents.length ? `, ${dayEvents.length} event` : ""}`}
                    onClick={() => setSelectedDate(isSelected ? null : key)}
                  >
                    <span>{day}</span>
                    {dayEvents.length > 0 && <i aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="agenda" aria-live="polite">
            {visibleEvents.length ? visibleEvents.map((event) => {
              const eventDate = parseDate(event.date);
              const url = event.registration_url;
              const isExternal = /^https?:\/\//i.test(url ?? "");
              return (
                <article className="event-card" key={event.source}>
                  <div className="event-date">
                    <strong>{eventDate.getDate()}</strong>
                    <span>{new Intl.DateTimeFormat("en-CA", { month: "short" }).format(eventDate)}</span>
                    <small>{new Intl.DateTimeFormat("zh-CN", { month: "short" }).format(eventDate)}</small>
                  </div>
                  <div className="event-info">
                    <div className="event-tags">
                      <span><Icon name="clock" size={15} /> <Bilingual entry={event} field="time" /></span>
                      {event.is_sample && (
                        <span className="sample-badge dark">
                          <Bilingual entry={site} field="sample_label" />
                        </span>
                      )}
                    </div>
                    <Bilingual entry={event} field="title" as="h3" />
                    <Bilingual entry={event} field="description" as="p" />
                    <div className="event-footer">
                      <span><Icon name="pin" size={17} /> <Bilingual entry={event} field="location" /></span>
                      {url && (
                        <a
                          href={url}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                        >
                          <Bilingual
                            entry={event.registration_label_en ? event : site}
                            field={event.registration_label_en ? "registration_label" : "event_register"}
                          />
                          <Icon name="arrow" size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            }) : (
              <div className="agenda-empty">
                <Icon name="calendar" size={28} />
                <Bilingual entry={site} field="calendar_empty" as="p" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const site = content.site;
  const contact = content.contact;
  const details = [
    contact.email && {
      icon: "mail",
      label_en: localized(contact, "email_label", "en"),
      label_zh: localized(contact, "email_label", "zh"),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.instagram_label && {
      icon: "instagram",
      label_en: "Instagram",
      label_zh: "Instagram",
      value: contact.instagram_label,
      href: contact.instagram_url,
    },
    contact.wechat && {
      icon: "message",
      label_en: "WeChat",
      label_zh: "微信",
      value: contact.wechat,
    },
  ].filter(Boolean);

  return (
    <section className="section contact" id="contact">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <Bilingual entry={site} field="contact_kicker" as="p" className="eyebrow light" />
          <Bilingual entry={contact} field="title" as="h2" />
          <Bilingual entry={contact} field="intro" as="p" />
          <div className="contact-location">
            <Icon name="pin" />
            <Bilingual entry={contact} field="location" />
          </div>
          <Bilingual entry={contact} field="availability" as="small" />
          {contact.is_sample && (
            <div className="sample-note">
              <Bilingual entry={contact} field="sample_note" />
            </div>
          )}
        </div>
        <div className="contact-list">
          {details.map((detail) => {
            const body = (
              <>
                <span className="contact-icon"><Icon name={detail.icon} /></span>
                <span>
                  <small><span lang="en">{detail.label_en}</span><i lang="zh-CN">{detail.label_zh}</i></small>
                  <strong>{detail.value}</strong>
                </span>
                {detail.href && <Icon name="arrow" />}
              </>
            );
            return detail.href ? (
              <a key={detail.label_en} href={detail.href} target={detail.icon === "instagram" ? "_blank" : undefined} rel="noreferrer">
                {body}
              </a>
            ) : <div key={detail.label_en}>{body}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const site = content.site;
  const goatCounterCode = String(site.goatcounter_code ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  const [visitCount, setVisitCount] = useState("");

  useEffect(() => {
    if (!goatCounterCode) return undefined;

    const endpoint = `https://${goatCounterCode}.goatcounter.com/count`;
    let script = document.querySelector(`script[data-goatcounter="${endpoint}"]`);

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src = "https://gc.zgo.at/count.js";
      script.dataset.goatcounter = endpoint;
      document.head.appendChild(script);
    }

    if (site.show_visit_count === false) return undefined;

    const controller = new AbortController();
    fetch(`https://${goatCounterCode}.goatcounter.com/counter/TOTAL.json`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setVisitCount(String(data.count ?? "")))
      .catch(() => {});

    return () => controller.abort();
  }, [goatCounterCode, site.show_visit_count]);

  return (
    <footer>
      <div className="shell footer-inner">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">{site.site_mark}</span>
          <Bilingual entry={site} field="site_name" />
        </a>
        <Bilingual entry={site} field="footer_note" as="p" />
        <div className="footer-meta">
          <small>© {new Date().getFullYear()} {localized(site, "site_name", "en")}</small>
          {visitCount && (
            <span className="visit-counter" aria-live="polite">
              <span lang="en">{localized(site, "visit_count_label", "en")} {visitCount}</span>
              <span lang="zh-CN">{localized(site, "visit_count_label", "zh")}</span>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = localized(content.site, "site_name", "en");
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      `${localized(content.site, "meta_description", "en")} ${localized(content.site, "meta_description", "zh")}`,
    );
  }, []);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Highlights />
        <Calendar />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
