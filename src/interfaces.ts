interface AVIresource {
  AVIresourceID: string;
  subscription: string;
  resourcegroup: string;
  type: string;
  name: string;
  enrichments: [enrichment];
}

interface enrichment {
  title: string;
  query: string;
  response: string;
  time: Date;
}

export type { AVIresource };
