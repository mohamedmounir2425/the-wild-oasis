import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ numDays, numCabins, confirmedStays, bookings }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  const numNights = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);
  const occupation = (numNights / (numDays * numCabins)) * 100;

  return (
    <>
      <Stat
        title={"Booking"}
        color={"blue"}
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        value={Math.round(occupation) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
