"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateGuest as updateGuestApi,
} from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session)
    throw new Error("User should be logged in before updating data");

  const nationalIdPattern = /^[a-zA-Z0-9]{8,12}$/;
  if (!nationalIdPattern.test(formData.get("nationalID")))
    throw new Error("Enter a valid national ID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updataData = {
    nationality,
    countryFlag,
    nationalID: formData.get("nationalID"),
  };

  await updateGuestApi(session.user.guestId, updataData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session)
    throw new Error("User should be logged in before deleting booking");

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((booking) => booking.id);

  if (!bookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session)
    throw new Error("User should be logged in before updating booking");

  const guestId = Number(formData.get("guestId"));
  if (session.user.guestId !== guestId)
    throw new Error("You are not allowed to update this booking");

  const updatedData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { data } = await updateReservation(formData.get("id"), updatedData);
  console.log(data);

  revalidatePath(`/account/reservations/edit/${formData.get("id")}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("User should be logged in before creating booking");
  const newBooking = {
    ...bookingData,
    status: "uncofirmed",
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
}
