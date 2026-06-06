

import { getProjectEpics } from "@/lib/epics";
import { EpicList } from "@/lib/types/epic.types";
import { useEffect, useState, useRef, useCallback } from "react";

type UseGetEpicsParams = {
  id: string;
  limit?: number;
  offset?: number;
  append?: boolean;
  search?: string;
};

export default function useGetEpics({
  id,
  limit = 100,
  offset = 0,
  append = false,
  search,
}: UseGetEpicsParams) {
  const [epics, setEpics] = useState<EpicList>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isFirstFetch = useRef(true);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFirstFetch.current = true;
    setIsInitialLoad(true);
    setEpics([]);
    setTotal(0);
    setHasMore(false);
    setError(false);
  }, [id]);

  useEffect(() => {
    isFirstFetch.current = true;
    setIsInitialLoad(true);
    setEpics([]);
    setTotal(0);
    setHasMore(false);
    setError(false);
  }, [search]);

  const getAllEpics = useCallback(async () => {
    if (isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;

      setIsLoading(true);
      setError(false);

      const page = Math.floor(offset / limit) + 1;

      const { data, totalCount } = await getProjectEpics(
        page,
        limit,
        id,
        search
      );

      const incoming: EpicList = data ?? [];

      // setEpics((prev) =>
      //   !append || offset === 0
      //     ? incoming
      //     : [...prev, ...incoming]
      // );

      // setTotal(totalCount);

      // setHasMore(
      //   (offset ?? 0) + incoming.length < totalCount
      // );

setEpics(prev => {
  if (!append || offset === 0) return incoming;

  const map = new Map(prev.map(e => [e.id, e]));

  incoming.forEach(epic => {
    map.set(epic.id, epic);
  });

  return Array.from(map.values());
});
    } catch (err) {
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        return;
      }

      setError(true);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);

      if (isFirstFetch.current) {
        setIsInitialLoad(false);
        isFirstFetch.current = false;
      }
    }
  }, [id, limit, offset, append, search]);

  useEffect(() => {
    getAllEpics();
  }, [getAllEpics]);

  // const updateEpic = useCallback(
  //   (epicId: string, patch: Partial<EpicList[0]>) => {
  //     setEpics((prev) =>
  //       prev.map((epic) =>
  //         epic.id === epicId
  //           ? { ...epic, ...patch }
  //           : epic
  //       )
  //     );
  //   },
  //   []
  // );

  const updateEpic = useCallback((epicId: string, updatedEpic: EpicList[0]) => {
  setEpics(prev =>
    prev.map(epic =>
      epic.id === epicId ? updatedEpic : epic
    )
  );
}, []);

  const addEpic = useCallback((epic: EpicList[0]) => {
    setEpics((prev) => [epic, ...prev]);
    setTotal((t) => t + 1);
  }, []);

  return {
    epics,
    total,
    isLoading,
    isInitialLoad,
    error,
    hasMore,
    refetch: getAllEpics,
    updateEpic,
    addEpic,
  };
}