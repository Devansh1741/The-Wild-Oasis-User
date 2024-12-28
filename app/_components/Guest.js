"use client";
import Link from "next/link";
import { useAuth } from "../_context/AuthContext";
import { useSession } from "next-auth/react";

function Guest() {
  const { user } = useSession();
  console.log(user);
  return (
    <li>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="flex items-center gap-4 transition-colors hover:text-accent-400"
        >
          <img
            className="h-8 rounded-full"
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
          />
          <span>Guest Area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="transition-colors hover:text-accent-400"
        >
          Guest Area
        </Link>
      )}
    </li>
  );
}

export default Guest;
