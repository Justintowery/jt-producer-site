export type WorkItem = {
  id: string;
  brand: string;
  // Put a YouTube or Vimeo URL here when you have it.
  videoUrl?: string;
  // Optional: show "Password protected" or "Available on request"
  status?: "Available on request" | "Password protected";
};

export const work: WorkItem[] = [
  {
    id: "sony-anaconda-mccaffrey",
    brand: "Sony Anaconda / C. McCaffrey",
    status: "Available on request",
  },
  {
    id: "placeholder-1",
    brand: "Global Brand",
    // videoUrl: "https://vimeo.com/123456789",
    status: "Available on request",
  },
  {
    id: "placeholder-2",
    brand: "Athletic Brand",
    // videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
    status: "Available on request",
  },
];