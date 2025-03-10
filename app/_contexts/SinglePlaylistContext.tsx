"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useReducer, useState } from "react";
import { deleteItemFromList } from "../playlists/[playlistId]/actions";
import { useToast } from "../_hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

// context interface
interface IContext {
  isDeleting: boolean;
  selectedMoviesToDelete: string[];
  editTitleFormIsOpen: boolean;
  openEditTitle: () => void;
  closeEditTitle: () => void;
  startDeleting: () => void;
  endDeleting: () => void;
  addItemForDelete: (id: string) => void;
  removeItemForDelete: (id: string) => void;
  handleDelete: () => Promise<"success" | "fail">;
  sortBy: "newest" | "oldest";
  sortOldest: () => void;
  sortNewest: () => void;
}

// type of initial state of deleting process
interface IState {
  isDeleting: boolean;
  selectedItems: string[];
}

// reducer action types
type Actions =
  | { type: "addDeleteItem"; payload: string }
  | { type: "startDeleting" }
  | { type: "endDeleting" }
  | { type: "removeDeleteItem"; payload: string };

// Create Context
const SinglePlaylistContext: React.Context<IContext> = createContext<IContext>({
  editTitleFormIsOpen: false,
  isDeleting: false,
  selectedMoviesToDelete: [],
  closeEditTitle() {},
  openEditTitle() {},
  startDeleting() {},
  endDeleting() {},
  addItemForDelete() {},
  removeItemForDelete() {},
  handleDelete: async () => {
    return "success";
  },
  sortBy: "newest",
  sortNewest() {},
  sortOldest() {},
});

// Initials state of deleting process
const initialState: IState = { isDeleting: false, selectedItems: [] };

// reducer function for deleting process
const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "addDeleteItem":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };

    case "startDeleting":
      return { ...state, isDeleting: true };

    case "endDeleting":
      return { ...state, isDeleting: false, selectedItems: [] };

    case "removeDeleteItem":
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item !== action.payload,
        ),
      };

    default:
      throw new Error("Unknown action type");
  }
};

export function SinglePlaylistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [editTitleFormIsOpen, setEditTitleFormIsOpen] = useState(false);
  const notify = useToast();

  const [{ isDeleting, selectedItems }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const queryClient = useQueryClient();

  const pathname = usePathname();

  // handle close and open edit title form
  const handleOpenEditTitleForm = () => setEditTitleFormIsOpen(true);
  const handleCloseEditTitleForm = () => setEditTitleFormIsOpen(false);

  // handle start and end of deleting
  const handleStartDeleting = () => dispatch({ type: "startDeleting" });
  const handleEndDeleting = () => dispatch({ type: "endDeleting" });

  const handleAddItemForDeleting = (id: string) => {
    dispatch({ type: "addDeleteItem", payload: id });
  };

  const handleRemoveItemFromSelectedMovies = (id: string) => {
    dispatch({ type: "removeDeleteItem", payload: id });
  };

  const handleDeleteSelectedMovies = async () => {
    const listId = pathname.split("/")[2];

    const res = await deleteItemFromList(listId, selectedItems);

    if (res?.status === "success") {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
      return "success";
    } else {
      notify("error", "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید!");
      return "fail";
    }
  };

  const handleSortByOldest = () => setSortBy("oldest");

  const handleSortByNewest = () => setSortBy("newest");

  return (
    <SinglePlaylistContext
      value={{
        closeEditTitle: handleCloseEditTitleForm,
        editTitleFormIsOpen: editTitleFormIsOpen,
        isDeleting: isDeleting,
        openEditTitle: handleOpenEditTitleForm,
        selectedMoviesToDelete: selectedItems,
        startDeleting: handleStartDeleting,
        endDeleting: handleEndDeleting,
        addItemForDelete: handleAddItemForDeleting,
        removeItemForDelete: handleRemoveItemFromSelectedMovies,
        handleDelete: handleDeleteSelectedMovies,
        sortBy: sortBy,
        sortNewest: handleSortByNewest,
        sortOldest: handleSortByOldest,
      }}
    >
      {children}
    </SinglePlaylistContext>
  );
}

export const useSinglePlaylist = () => {
  const context = useContext(SinglePlaylistContext);

  if (context === undefined) {
    throw new Error("Context is used outside the provider");
  }

  return context;
};
