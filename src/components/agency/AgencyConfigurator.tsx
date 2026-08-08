"use client";

import React from "react";
import ConfiguratorForm from "./ConfiguratorForm";
import ConfiguratorList from "./ConfiguratorList";
import ConfiguratorBrand from "./ConfiguratorBrand";
import WhatsAppSender from "./WhatsAppSender";
import { SectionMonogramStudio } from "./subsections/SectionMonogramStudio";
import { SectionTableauDeMariage } from "./subsections/SectionTableauDeMariage";
import { SectionBudgetPlanner } from "./subsections/SectionBudgetPlanner";

export interface AgencyConfiguratorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // ... altre props ...
  [key: string]: any;
}

export default function AgencyConfigurator(props: AgencyConfiguratorProps) {
  const { activeTab } = props;

  const handleUpdate = (field: string, value: any) => {
    const setterName = `set${field.charAt(0).toUpperCase()}${field.slice(1)}`;
    if (typeof (props as any)[setterName] === "function") {
      (props as any)[setterName](value);
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      {/* 1. CONFIGURATORE FORMS */}
      {activeTab === "create" && <ConfiguratorForm {...props} onUpdate={handleUpdate} />}

      {/* 2. INVITI SALVATI IN ARCHIVIO */}
      {activeTab === "list" && <ConfiguratorList />}

      {/* 3. SIGILLO & INIZIALI 3D */}
      {activeTab === "monogram" && (
        <SectionMonogramStudio
          coupleNames={props.coupleNames}
          waterImageUrl={props.waterImageUrl}
          handleUpdate={handleUpdate}
        />
      )}

      {/* 4. TABLEAU & MAPPA TAVOLI */}
      {activeTab === "tableau" && (
        <SectionTableauDeMariage coupleNames={props.coupleNames} slug={props.coupleNames} />
      )}

      {/* 5. CONTROLLO SPESE & BUDGET */}
      {activeTab === "budget" && (
        <SectionBudgetPlanner coupleNames={props.coupleNames} slug={props.coupleNames} />
      )}

      {/* 6. LISTA INVITATI & SPEDIZIONE WHATSAPP */}
      {activeTab === "whatsapp" && (
        <WhatsAppSender slug={props.coupleNames} coupleNames={props.coupleNames} />
      )}

      {/* 7. BRAND & LOGO PERSONALIZZATO */}
      {activeTab === "brand" && <ConfiguratorBrand />}
    </div>
  );
}
