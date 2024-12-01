import CabinCard from "../_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return;
  let dispalyedCabins;
  if (filter === "all") dispalyedCabins = cabins;
  else if (filter === "small")
    dispalyedCabins = cabins.filter((cabin) => cabin.maxCapacity < 3);
  else if (filter === "medium") {
    dispalyedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 3 && cabin.maxCapacity < 8
    );
  } else if (filter === "large") {
    dispalyedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {dispalyedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
export default CabinList;
