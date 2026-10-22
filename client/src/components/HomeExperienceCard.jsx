function HomeExperienceCard({ exp, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Only activate on mobile/tablet (desktop uses hover)
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the card is visible
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const linkPath = exp.title.includes("Rooms")
    ? "/rooms"
    : exp.title.includes("Events")
    ? "/events"
    : "/contact";

  return (
    <Reveal delay={index * 150}>
      <Link
        ref={cardRef}
        to={linkPath}
        className={`home-exp-card ${inView ? "in-view" : ""}`}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        <div className="home-exp-media">
          <img src={images[exp.imageKey]} alt={exp.title} />
          <video ref={videoRef} src={exp.videoUrl} muted loop playsInline />
        </div>

        <div className="home-exp-overlay" />

        <div className="home-exp-content">
          <span className="home-exp-tag">{exp.tag}</span>
          <h3>{exp.title}</h3>
          <p>{exp.description}</p>
        </div>

        <div className="home-exp-icon">
          <ArrowRight size={20} />
        </div>
      </Link>
    </Reveal>
  );
}