import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks";
import { ApiCardUrlInfo, ApiCardUrlInfoProps } from "./api-card-url-info";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiUrlList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params?.storeId}`;

  const apiUrls: Omit<ApiCardUrlInfoProps, "onCopy">[] = [
    {
      title: "GET",
      variant: "public",
      description: `${baseUrl}/${entityName}`,
    },
    {
      title: "GET",
      variant: "public",
      description: `${baseUrl}/${entityName}/{${entityIdName}}`,
    },
    {
      title: "POST",
      variant: "admin",
      description: `${baseUrl}/${entityName}`,
    },
    {
      title: "PATCH",
      variant: "admin",
      description: `${baseUrl}/${entityName}/{${entityIdName}}`,
    },
    {
      title: "DELETE",
      variant: "admin",
      description: `${baseUrl}/${entityName}/{${entityIdName}}`,
    },
  ];

  return (
    <div className="space-y-3">
      {apiUrls.map((apiUrl, index) => (
        <ApiCardUrlInfo
          key={index}
          title={apiUrl.title}
          variant={apiUrl.variant}
          description={apiUrl.description}
        />
      ))}
    </div>
  );
};
