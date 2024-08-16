import React from 'react';
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiOutlineCloud, HiShoppingBag, HiSupport, HiTable, HiViewBoards} from "react-icons/hi";




export function Sidebar() {
  return (
    <FlowbiteSidebar aria-label="Sidebar with content separator example">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            <p>Dashboard</p>
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloud}>
            <p>UploadBooks</p>
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            <p>ManageBooks</p>
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
}
