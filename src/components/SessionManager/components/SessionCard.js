import { daysOfWeek } from "./SessionDayOfWeek";

const SessionCard = ({ data }) => {
  if (data.day_of_week.length > 0) {
    data.day_of_week.map((d) => {
      return (
        <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
          <div className="flex-1 mb-3">
            <p className="font-semibold tracking-tighter mb-1">{data.title}</p>
            <p>
              {data.duration}-hour • ${data.hourly_usd * data.duration} •
              <span
                className={`badge ${
                  data.is_live ? "badge-secondary" : "badge-neutral"
                } badge-sm`}
              >
                {data.is_live ? "live" : "draft"}
              </span>
              <Edit />
            </p>
          </div>
          <div className="border-t pb-2 dark:border-gray-500" />
          <h5 className="font-bold">Every {daysOfWeek[d]}</h5>
          <div className="flex items-center justify-center py-2 space-x-3 text-xs">
            <Pills tags={data.hours} maxWidth="800px" onClick={() => null} />
          </div>
          <p className="tracking-tighter mb-1">{data.description}</p>
        </div>
      );
    });
  } else {
    data.one_time_date.map((d) => {
      const dateObj = new Date(d);

      if (dateObj < new Date()) {
        return;
      }

      const dayOfWeek = dateObj.toLocaleString("en-US", { weekday: "short" });
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "long" });
      const formattedDate = `${dayOfWeek}, ${day}${getDaySuffix(day)} ${month}`;

      return (
        <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
          <div className="flex-1 mb-3">
            <p className="font-semibold tracking-tighter mb-1">{data.title}</p>
            <p>
              {data.duration}-hour • ${data.hourly_usd * data.duration} •
              <span
                className={`badge ${
                  data.is_live ? "badge-secondary" : "badge-neutral"
                } badge-sm`}
              >
                {data.is_live ? "live" : "draft"}
              </span>
              <Edit />
            </p>
          </div>
          <div className="border-t pb-2 dark:border-gray-500" />
          <h5 className="font-bold">Upcoming {formattedDate}</h5>
          <div className="flex items-center justify-center py-2 space-x-3 text-xs">
            <Pills tags={data.hours} maxWidth="800px" onClick={() => null} />
          </div>
          <p className="tracking-tighter mb-1">{data.description}</p>
        </div>
      );
    });
  }
};

export default SessionCard;
