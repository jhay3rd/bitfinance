
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TabContentProps {
  title: string;
  children?: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ title, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children || <p>{title} details and options will appear here.</p>}
      </CardContent>
    </Card>
  );
};

export default TabContent;
