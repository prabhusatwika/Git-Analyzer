
import type { AuthUser } from "@/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfileCardProps {
  user: AuthUser;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initials = (user.name ?? user.username)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[#303A32]">
          Your profile
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="h-14 w-14 border-2 border-[#E8E8DC]">
            {user.image && (
              <AvatarImage
                src={user.image}
                alt={user.name ?? user.username}
              />
            )}
            <AvatarFallback className="bg-[#E8E8DC] font-semibold text-[#52634D]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-semibold text-[#303A32]">
              {user.name ?? user.username}
            </p>
            <p className="truncate text-sm text-[#788078]">
              @{user.username}
            </p>
            {user.email && (
              <p className="truncate text-xs text-[#92958B]">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
