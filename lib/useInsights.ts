"use client";
import { useEffect, useState } from "react";
import { api, apiError, AgentResponse } from "./api";
export function useInsights(revision = 0) {
  const [result, setResult] = useState<AgentResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    api.insights().then(value => { if (active) { setResult(value); setError(""); } }).catch(e => { if (active) setError(apiError(e)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [revision]);
  return { result, error, loading };
}
