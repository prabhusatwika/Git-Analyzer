import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/auth/actions";

export function LogoutButton() {
  return (
    <form action={signOutUser}>
      <Button type="submit" variant="ghost" size="sm" className="w-full justify-start gap-2">
        <LogOut className="size-4" />
        Log out
      </Button>
    </form>
  );
}
