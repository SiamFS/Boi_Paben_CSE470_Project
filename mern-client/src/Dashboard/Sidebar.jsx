import React from 'react';
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloud, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

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
          <FlowbiteSidebar.Item href="./login" icon={HiUser}>
            <p>Login</p>
          </FlowbiteSidebar.Item>

          <FlowbiteSidebar.Item href="./logout" icon={HiArrowSmRight}>
          <p>Log Out</p>
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
}
