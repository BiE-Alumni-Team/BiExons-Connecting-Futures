'use client'

import { useRouter } from "next/router";
import Profile from "../../components/profile/Profile";
import { useAuth } from "@/context/AuthContext";
import NotFound from "../not-found";
import { notFound } from "next/navigation";

export default function Page() {

  const router = useRouter;
  const { loginsucces } = useAuth()

  console.log(loginsucces)


  return loginsucces ? <Profile /> : notFound();

}
