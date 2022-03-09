interface AVIresource {
  AVIresourceID: string;
  subscription: string;
  resourcegroup: string;
  type: string;
  name: string;
  enrichments: enrichment;
}

interface AVIrelation {
  AVIrelationID: string;
  sourceID: string;
  sourceType: string;
  targetID: string;
  targetType: string;
  type: string;
}

interface enrichment {
  [key: string]: {
    parent?: string;
    enrichmentQueries?: enrichmentQuery[];
  };
}

interface enrichmentQuery {
  title: string;
  query: string;
  response: string;
  time: Date;
}

export type { AVIresource, AVIrelation };
