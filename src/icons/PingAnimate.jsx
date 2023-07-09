const PingAnimate = () => {
  return (
    <>
      <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
    </>
  );
};

export default PingAnimate;
