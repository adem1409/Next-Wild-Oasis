"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const filters = [
    {
      label: "All Cabins",
      urlName: "all",
    },
    {
      label: "1-2 Guests",
      urlName: "small",
    },
    {
      label: "3-7 Guests",
      urlName: "medium",
    },
    {
      label: "8> Guests",
      urlName: "large",
    },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <ul className=" flex ml-auto justify-between mb-4 items-center gap-2 border-primary-50/10 border w-fit">
      {filters.map((filter) => (
        <li
          key={filter.urlName}
          onClick={() => handleFilter(filter.urlName)}
          className={`px-5 py-2 hover:cursor-pointer ${
            (searchParams.get("capacity") || "all") == filter.urlName &&
            "bg-primary-700 text-primary-50"
          }`}
        >
          {filter.label}
        </li>
      ))}
    </ul>
  );
}

export default Filter;
