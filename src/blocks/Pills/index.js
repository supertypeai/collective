const createColorfulTags = (tags, colors = []) => {
  const pills = [];
  for (let i = 0; i < tags.length; i++) {
    const pill = tags[i];
    const color = colors[i % colors.length];
    pills.push(
      <span
        key={pill}
        className={`text-${color}-500 hover:bg-rose-900 cursor-pointer border rounded-full text-xs 
                    whitespace-nowrap font-medium mr-1 px-2.5 pt-0.5 pb-1 leading-6`}
      >
        {pill}
      </span>
    );
  }
  return pills;
};

const Pills = ({ tags, colors }) => {
  return (
    <div className="mb-2 -600 mt-10 text-sm">
      {createColorfulTags(tags, colors)}
    </div>
  );
};

export default Pills;
