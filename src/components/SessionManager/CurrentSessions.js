import Image from "next/image";

import CurrentSessionCard from "./components/CurrentSessionCard";

const CurrentSessions = ({ sessions, setIsEditting }) => {
  return (
    <div className="md:flex md:flex-row mt-4">
      <div className="grow">
        <div className="m-4 grid justify-items-center relative">
          {sessions.length === 0 ? (
            <div>
              <Image
                src="empty.svg"
                alt="Create your first Session."
                width={200}
                height={200}
              />
              <h3 className="font-display text-lg font-semibold text-gray-300">
                Offer your first Session to get started.
              </h3>
            </div>
          ) : (
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-300">
                Current Sessions
              </h3>
              <div className="container flex flex-col items-center justify-center mx-auto sm:py-2">
                <div className="flex flex-row flex-wrap justify-center mt-4">
                  { sessions.map(s => <CurrentSessionCard data={s} setIsEditting={setIsEditting} key={s.id}/>) }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentSessions;
