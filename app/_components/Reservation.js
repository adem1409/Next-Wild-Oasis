import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import ReservationContext from "./ReservationContext";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const settings = await getSettings();
  const session = await auth();
  return (
    <div>
      <h2 className="text-accent-600 font-semi-bold text-5xl text-center mb-4">
        Reserve {cabin.name} today. Pay on arrival
      </h2>
      <div className="grid grid-cols-2 border border-primary-800 gap-1 min-h-[400px]">
        <ReservationContext>
          <DateSelector
            cabin={cabin}
            settings={settings}
            bookedDates={bookedDates}
          />
          {session?.user ? (
            <ReservationForm cabin={cabin} user={session.user} />
          ) : (
            <LoginMessage />
          )}
        </ReservationContext>
      </div>
    </div>
  );
}

export default Reservation;
