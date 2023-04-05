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

const createColorfulTags = (tags, colors = COLORS, onClick, isEditting = true) => {
  const pills = [];
  for (let i = 0; i < tags.length; i++) {
    const pill = tags[i];
    const color = colors[i % colors.length];
    pills.push(
      <span
        key={pill}
        className={`text-rose-100 text-${color}-100 ${isEditting ? "hover:bg-rose-900 cursor-pointer" : "cursor-not-allowed"} border rounded-md text-xs 
                    whitespace-nowrap font-medium mr-1 px-2 mb-1 leading-6`}
        onClick={() => {
          isEditting ? onClick(pill) : null}}
      >
        {pill}
      </span>
    );
  }
  return pills
};

const Pills = ({ tags, colors, onClick, maxWidth, isEditting=true }) => {
  return (
    <div className={`mb-2 text-sm flex flex-wrap adapt-xs ${maxWidth ? `lg:max-w-[${maxWidth}]` : "w-screen lg: max-w-fit"}`}>
      {createColorfulTags(tags, colors, onClick, isEditting)}
    </div>
  );
};

export default Pills;
