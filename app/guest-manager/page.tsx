import { redirect } from "next/navigation";

export default function GuestManagerRedirect() {
  redirect("/admin/guest-manager");
}
