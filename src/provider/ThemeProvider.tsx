"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Providers;
