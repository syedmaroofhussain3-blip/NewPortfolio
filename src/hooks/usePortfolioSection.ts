import { useState, useEffect } from "react";
import { fetchSection, type PortfolioData } from "@/data/portfolioStore";

export function usePortfolioSection<K extends keyof PortfolioData>(section: K) {
  const [data, setData] = useState<PortfolioData[K] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSection(section).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [section]);

  return { data, loading };
}
