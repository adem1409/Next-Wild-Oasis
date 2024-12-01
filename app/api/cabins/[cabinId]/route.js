import { getCabin } from "@/app/_lib/data-service";

export async function GET(request, params) {
  const { name } = await getCabin(params.params.cabinId);
  return Response.json({ name });
}
