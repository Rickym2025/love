"use client";

import React from "react";
import ConfiguratorForm from "./ConfiguratorForm";
import ConfiguratorList from "./ConfiguratorList";
import ConfiguratorBrand from "./ConfiguratorBrand";
import { DRESS_CODE_PALETTES } from "./constants";

export { DRESS_CODE_PALETTES };

export default function AgencyConfigurator(props: any) {
  const { activeTab, style } = props;

  return (
    <div style={style} className="p-6 md:p-8 space-y-6 text-[#1E293B] w-full">
      {/* CONTENUTO TAB MODULARE */}
      {activeTab === "create" && <ConfiguratorForm {...props} />}
      {activeTab === "list" && <ConfiguratorList {...props} />}
      {activeTab === "brand" && <ConfiguratorBrand {...props} />}
    </div>
  );
}
