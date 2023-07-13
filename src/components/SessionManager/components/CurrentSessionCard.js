import { extractDayFromDateTime, shortDate } from "@/blocks/Body/SessionCard";
import { daysOfWeek } from "./SessionDayOfWeek";
import Pills from "@/blocks/Pills";
import Edit from "@/icons/Edit";

const CurrentSessionCard = ({ data }) => {
  if (data.day_of_week.length > 0) {
    let days = data.day_of_week.sort().map(d => daysOfWeek[d]);
    if (days.length > 3){
      days = days.splice(0,3);
      days.push("...")
    }

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
        <h5 className="font-bold">Every {days.join(", ")}</h5>
        <div className="flex items-center justify-center py-2 space-x-3 text-xs">
          <Pills 
            tags={data.hours.map(val => {
              if (val < 10) {
                return `0${val}:00`
              }
              return `${val}:00`
            })}
            maxWidth="800px" 
            onClick={() => null} 
          />
        </div>
        <p className="tracking-tighter mb-1">{data.description}</p>
      </div>
    );
  } else {
    let dates = data.one_time_date
      .filter(date => new Date(date) >= new Date())
      .sort()
      .map(d => `${extractDayFromDateTime(d)}, ${shortDate(d)}`);
    if (dates.length > 3){
      dates = dates.splice(0,3);
      dates.push("...")
    } 

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
        <h5 className="font-bold">Upcoming {dates.join(", ")}</h5>
        <div className="flex items-center justify-center py-2 space-x-3 text-xs">
          <Pills 
            tags={data.hours.map(val => {
              if (val < 10) {
                return `0${val}:00`
              }
              return `${val}:00`
            })}
            maxWidth="800px" 
            onClick={() => null} 
          />
        </div>
        <p className="tracking-tighter mb-1">{data.description}</p>
      </div>
    );
  }
};

export default CurrentSessionCard;
