
"use client";

import { fetchProjects } from "@/redux/features/project/project";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { fetchepics } from "@/redux/features/epics/epic";

import EpicCardSkeleton from "@/components/EpicCardSkeleton";
import EpicsCard from "@/components/EpicsCard";
import Pagination from "@/components/Pagination";
import EpicDetailsModal from "@/components/EpicDetailModal";


type epics = {
  id: string;
  title: string;
  assigneeName: string;
  created_at: string;
  created_by: string;
};


export default function page() {


  const { epics, loadingEpic, error, totalCount } = useAppSelector(
    (state) => state.epics
  ) as {
    epics: epics[];
    loadingEpic: boolean;
    error: string | null;
    totalCount: number;
  };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const params = useParams();
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const limit = 6;
  const totalPages = Math.ceil(totalCount / limit);
  useEffect(() => {
    if (!projectId) return;
    dispatch(fetchepics({ page: currentPage, limit, projectId }));
  }, [dispatch, currentPage, projectId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Epics</h1>
          <p className="text-sm text-gray-500">
            Manage and curate your epics
          </p>
        </div>

        <button
          onClick={() => router.push(`/projects/${projectId}/epics/new`)}
          className="hidden md:block bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
        >
          + Create New Epic
        </button>
      </div>

      {/*  ERROR STATE */}
      {error && (
        <div className="flex justify-center items-center mt-20">
          <div className="flex flex-col items-center text-center">

            <div className="p-4 bg-[#FFDAD6] rounded-lg">
              {/* نفس SVG بتاعك */}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              Something went wrong
            </h3>

            <p className="text-gray-500 max-w-md mt-2">
              We couldn’t load your epics. Please try again.
            </p>

            <button
              onClick={() => {
                if (!projectId) return;

                dispatch(
                  fetchepics({
                    page: currentPage,
                    limit,
                    projectId,
                  })
                );
              }}
              className="mt-4 bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/*  LOADING STATE */}
      {loadingEpic && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EpicCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/*  EMPTY STATE */}
      {!loadingEpic && !error && epics.length === 0 && (
        <div className="flex justify-center items-center mt-20">
          <div className="text-center">
            <Image
              src="/images/noprojects.png"
              alt="No epics"
              className="mx-auto"
              width={200}
              height={200}
            />

            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              No epics found
            </h3>

            <p className="text-gray-500 max-w-md mx-auto mt-2">
              You don’t have any epics yet. Start by creating your first epic.
            </p>

            <button
              onClick={() =>
                router.push(`/projects/${projectId}/epics/new`)
              }
              className="mt-4  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
            >
              + Create New Epic
            </button>
          </div>
        </div>
      )}

      {/*  DATA */}
      {!loadingEpic && !error && epics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {epics.map((epic) => (
            <EpicsCard
              key={epic.id}
              epic={epic}
              onClick={() => {
                setSelectedEpicId(epic.id);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* MOBILE BUTTON */}
      <span className="flex md:hidden justify-center mt-5">
        <button
          onClick={() =>
            router.push(`/projects/${projectId}/epics/new`)
          }
          className="px-6 py-3 text-white bg-primary rounded-2xl text-3xl"
        >
          +
        </button>
      </span>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        limit={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* MODAL */}
      <EpicDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        epicId={selectedEpicId}
        projectId={projectId}
      />
    </div>
  );


}
