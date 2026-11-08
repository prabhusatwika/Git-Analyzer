/** Backend API types for repository connection. */

export interface ConnectedRepositoryRecord {
  id: string;
  github_repo_id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  is_private: boolean;
  default_branch: string;
  html_url: string;
  updated_at_github: string | null;
  connected_at: string;
}

export interface ConnectRepositoryPayload {
  url: string;
}

export class BackendApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}
