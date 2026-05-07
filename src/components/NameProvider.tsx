"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

interface NameContextType {
  partnerName: string;
  setPartnerName: (name: string) => void;
  isNameSet: boolean;
  setIsNameSet: (isSet: boolean) => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export function NameProvider({ children }: { children: ReactNode }) {
  const [partnerName, setPartnerName] = useState("Sayang");
  const [isNameSet, setIsNameSet] = useState(false);
  const value = useMemo(() => ({ partnerName, setPartnerName, isNameSet, setIsNameSet }), [partnerName, isNameSet]);

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
}

export function useName() {
  const context = useContext(NameContext);
  if (context === undefined) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
}