const Petals = () => {
  const petals = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 14 + Math.random() * 14;
        const delay = Math.random() * 12;
        const size = 8 + Math.random() * 12;
        return (
          <span
            key={i}
            className="petal"
            style={{
              left: `${left}vw`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};
export default Petals;
