const COLORS = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "green",
]

const createColorfulTags = (tags, colors = COLORS) => {
  const pills = [];
  for (let i = 0; i < tags.length; i++) {
    const pill = tags[i];
    const color = colors[i % colors.length];
    pills.push(
      <span
        key={pill}
        className={`text-rose-100 text-${color}-100 hover:bg-rose-900 cursor-pointer border rounded rounded-md text-xs 
                    whitespace-nowrap font-medium mr-1 px-2 mb-1 leading-6`}
      >
        {pill}
      </span>
    );
  }
  return pills
};

const Pills = ({ tags, colors }) => {
  return (
    <div className="mb-2 mt-10 text-sm flex flex-wrap w-screen adapt-xs lg:max-w-[760px]">
      {createColorfulTags(tags, colors)}
    </div>
  );
};

export default Pills;
