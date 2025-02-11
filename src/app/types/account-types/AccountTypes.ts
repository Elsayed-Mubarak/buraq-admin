export type Setting = {
  _id: string;
  name: string;
  id: string;
};

export type TeamSize = {
  min: number;
  max: number;
  current: number;
};

export type ResultItem = {
  _id: string;
  owner: string;
  status: "active" | string; // Assuming status can be other strings besides "active", otherwise just use "active"
  createdAt: string; //  Could also use Date if you need to work with Date objects, but string works for simple storage.
  settings?: Setting; // Optional because not all items have it
  teamSize: TeamSize; // Use the defined TeamSize type
  id: string;
};

export type ResponseData = {
  results: ResultItem[];
  metadata: {
    totalResult: number;
    totalPages: number;
  };
};

export type TopLevelResponse = {
  data: ResponseData;
  metadata: {
    // Top level metadata
    totalResult: number;
    totalPages: number;
  };
};
