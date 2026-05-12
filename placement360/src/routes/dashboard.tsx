import { Headings } from "@/components/Headings";
import { InterviewPin } from "@/components/Pin";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) => {
          const id = doc.id;
          return {
            id,
            ...doc.data(),
          };
        }) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.log("Error on fetching : ", error);
        toast.error("Error..", {
          description: "Something went wrong.. Try again later..",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
        {/* headings */}
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock interview"
        />
        <Link to={"/generate/create"} className="w-full sm:w-auto">
          <Button size={"sm"} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>

      <Separator className="my-8" />
      {/* content section */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 rounded-md" />
          ))
        ) : interviews.length > 0 ? (
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          <div className="col-span-full w-full flex flex-grow items-center justify-center min-h-[400px] flex-col text-center px-4">
            <img
              src="/assets/svg/not-found.svg"
              className="w-44 h-44 object-contain opacity-50"
              alt="No data found"
            />

            <h2 className="text-xl font-semibold text-muted-foreground mt-4">
              No Data Found
            </h2>

            <p className="max-w-md text-sm text-neutral-400 mt-2">
              There is no available data to show. Please add some new mock
              interviews to get started.
            </p>

            <Link to={"/generate/create"} className="mt-6">
              <Button size={"sm"}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};