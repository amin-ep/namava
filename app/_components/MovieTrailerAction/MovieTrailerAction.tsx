"use client";

import React, { useState } from "react";
import LinkButton from "../LinkButton";
import MovieTrailerActionModal from "./MovieTrailerActionModal";

type Props = { videoUrl: string };

function MovieTrailerAction({ videoUrl }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <LinkButton
        extraStyles="z-20"
        color="glassy"
        variation="button"
        buttonType="button"
        onClick={handleOpenModal}
      >
        پیش نمایش
      </LinkButton>
      <MovieTrailerActionModal
        onClose={handleCloseModal}
        open={openModal}
        videoUrl={videoUrl}
      />
    </>
  );
}

export default MovieTrailerAction;
