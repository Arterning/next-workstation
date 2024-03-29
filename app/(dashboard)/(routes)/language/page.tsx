"use client";

import { Languages } from "lucide-react";
import { Heading } from "@/components/heading";
import React, { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { columns } from "@/app/(dashboard)/(routes)/language/columns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useLangModal } from "@/hooks/use-lang-modal";
import { Skeleton } from "@/components/ui/skeleton";

export type StarDict = {
  id: string;
  word: string;
  definition: string;
  translation: string;
};

async function fetchData(): Promise<StarDict[]> {
  // Fetch data from your API here.
  try {
    const response = await axios.get("/api/dict");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
  }

  return [
    {
      id: "728ed52f",
      word: "dsf",
      definition: "pending",
      translation: "m@example.com",
    },
    // ...
  ];
}

const LanguagePage = () => {
  // const data = await getData()

  const [data, setData] = React.useState<StarDict[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const langModal = useLangModal();

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Heading
        title="Translate Language"
        description="Translate language with local data."
        icon={Languages}
        iconColor="text-red-500"
        bgColor="bg-red-700/10"
      />

      {isLoading ? (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-10">
          <Button onClick={langModal.onOpen} className="mb-5">
            Add new word
          </Button>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default LanguagePage;
