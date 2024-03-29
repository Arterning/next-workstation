"use client";

import { deleteRequest } from "@/app/action/request";
import { Trash, MoreHorizontal, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const RequestItem = ({ request, setSelectedRequest }) => {
  return (
    <div
      className="p-2 border border-gray-300 rounded-lg cursor-pointer"
      key={request.id}
      onClick={() => setSelectedRequest(request)}
    >
      <div className="flex justify-between flex-nowrap max-w-md">
        <div>
          <div className="text-sm text-gray-500">{request.method}</div>
          <div className="text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {request.url}
          </div>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await deleteRequest(request.id);
                  toast.success("Request deleted");
                }}
              >
                <Trash className="h-4 w-4 mr-2"></Trash>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
