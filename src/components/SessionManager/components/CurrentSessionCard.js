import { extractDayFromDateTime, shortDate } from "@/blocks/Body/SessionCard";
import { daysOfWeek } from "./SessionDayOfWeek";
import Pills from "@/blocks/Pills";
import Edit from "@/icons/Edit";


const OneTimeSession = ({ sessionData }) => {
  return (
      <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
        <div className="flex-1 mb-3">
          <p className="font-semibold tracking-tighter mb-1">{sessionData.title}</p>
          <p>
            {sessionData.duration}-hour • ${sessionData.hourly_usd * sessionData.duration} •
            <span
              className={`badge ${
                sessionData.is_live ? "badge-secondary" : "badge-neutral"
              } badge-sm`}
            >
              {sessionData.is_live ? "live" : "draft"}
            </span>
            <Edit />
          </p>
        </div>
        <div className="border-t pb-2 dark:border-gray-500" />
        <h5 className="font-bold">Upcoming &nbsp;
          {extractDayFromDateTime(sessionData.one_time_date[0])}, {shortDate(sessionData.one_time_date[0])}
          {sessionData.one_time_date.length > 1 &&
            <span className="tooltip tooltip-info" data-tip="More available dates">
                &nbsp;
                <span className="badge badge-warning dark:badge-info badge-xs font-light text-[0.7em]">+{sessionData.one_time_date.length - 1}</span>
            </span>
          }
        </h5>
        <div className="flex items-center justify-center py-2 space-x-3 text-xs">
          <Pills 
            tags={sessionData.hours.map(val => {
              if (val < 10) {
                return `0${val}:00`
              }
              return `${val}:00`
            })}
            maxWidth="800px" 
            onClick={() => null} 
          />
        </div>
        <p className="tracking-tighter mb-1">{sessionData.description}</p>
      </div>
    );
}

const RecurringSession = ({ sessionData }) => {
  return (
    <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
      <div className="flex-1 mb-3">
        <p className="font-semibold tracking-tighter mb-1">{sessionData.title}</p>
        <p>
          {sessionData.duration}-hour • ${sessionData.hourly_usd * sessionData.duration} •
          <span
            className={`badge ${
              sessionData.is_live ? "badge-secondary" : "badge-neutral"
            } badge-sm`}
          >
            {sessionData.is_live ? "live" : "draft"}
          </span>
          <Edit />
        </p>
      </div>
      <div className="border-t pb-2 dark:border-gray-500" />
      <h5 className="font-bold">Every &nbsp;
        {daysOfWeek[sessionData.day_of_week[0]]}
        {sessionData.day_of_week.length > 1 &&
          <span className="tooltip tooltip-info" data-tip="More available days">
              &nbsp;
              <span className="badge badge-warning dark:badge-info badge-xs font-light text-[0.7em]">+{sessionData.day_of_week.length - 1}</span>
          </span>
        }
      </h5>
      <div className="flex items-center justify-center py-2 space-x-3 text-xs">
        <Pills 
          tags={sessionData.hours.map(val => {
            if (val < 10) {
              return `0${val}:00`
            }
            return `${val}:00`
          })}
          maxWidth="800px" 
          onClick={() => null} 
        />
      </div>
      <p className="tracking-tighter mb-1">{sessionData.description}</p>
    </div>
  );
}
const CurrentSessionCard = ({ data }) => {
  return data.one_time_date.length > 0 ?
    <OneTimeSession sessionData={data} /> :
    <RecurringSession sessionData={data} />
};

export default CurrentSessionCard;
