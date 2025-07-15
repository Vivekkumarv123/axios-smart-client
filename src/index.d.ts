export interface InitConfig {
  baseURLs: Record<string, string>;
  retries?: number;
  showLoading?: boolean;
  getToken?: () => string | null;
  onError?: (err: any) => void;
}

export function init(config: InitConfig): void;
export function api(
  base: string,
  method: string,
  url: string,
  data?: any
): Promise<any>;
