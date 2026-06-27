import MainNav from "@/components/MainNav";
import React from "react";

const layout = () => {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <MainNav />
        {children}
      </body>
    </html>
  );
};

export default layout;
