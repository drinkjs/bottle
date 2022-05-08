export interface RequestData {
  id: string;
  protocol: string;
  host: string;
  pathname: string;
  origin: string;
  href: string;
  search?: string;
  body?: any;
  headers?: { [key: string]: any };
  statusCode?: number;
  contentType?: string;
}

export interface ResponseData {
  id: string;
  statusCode: number;
  headers?: { [key: string]: any };
  body?: any;
}