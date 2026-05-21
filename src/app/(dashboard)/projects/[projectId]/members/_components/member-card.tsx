"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import MembersTable from "./members-table";

import { useEffect } from "react";
import { fetchProjectMembers } from "@/redux/features/project/project";

export default  function MemberCard({ id }: { id: string | null }) {
  // const { data: members } = await getProjectMembers(id ?? "");
  
const dispatch = useAppDispatch();
  const { projectMembers, loadingMembers } = useAppSelector(
    (state) => state.projects
  );
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectMembers(id));
      
    }
  }, [id, dispatch]);
  return (
    <div>
      <MembersTable members={projectMembers} />
    </div>
  );
}