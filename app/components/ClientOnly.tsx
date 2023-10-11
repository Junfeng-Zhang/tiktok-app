'use client'; // 这将充当包装组件。 如果我们的水合作用不匹配，用它来解决可能出错的其他事情。

import React, { useEffect, useState } from "react";

export default function ClientOnly({ children }: { children: React.ReactNode }) {

  const [isClient, setIsClient] = useState(false)
  useEffect(() => { setIsClient(true) }, [])

  return (<> {isClient ? <div>{children}</div> : null} </>);
};