declare namespace State {
  export interface Components {
    searchBarEditable: boolean;
    filterNoResult: boolean;
    mobileMenuVisible: boolean;
    headerSearchBarVisible: boolean;
  }

  export interface Settings {
    activeLayout: "simpleLayout";
  }

  export interface App {
    toast: ToastMessage | null;
    loading: boolean;
    secondLoading: boolean;
    appErrors: [{ type: "Network"; message: string[] }];
    nodeVersion: string;
    appWidth: number;
    appHeight: number;
    language: "en";
    primaryColor: string;
    secondaryColor: string;
    settings: Settings;
  }

  export interface AppState {
    app: App;
    components: Components;
  }

  export interface ToastMessage {
    message: string;
    type: "success" | "warning" | "danger";
    duration?: number;
    id: number;
  }

  export interface AppError {
    type: "Network";
    message: string[];
  }

  export interface AppPayload extends App, ToastMessage {
    appError: AppError;
  }
}

declare namespace Response {
  export interface Response<T> {
    data: T;
    meta?: Meta;
    error?: Error[];
  }

  export interface Error {
    id: string;
    code: number;
    status: number;
    title: string;
    detail: string;
    href: string;
  }

  export interface Meta {
    total: number;
    pageSize: number;
  }

  export interface Wrapper<T> {
    id: number;
    type: string;
    attributes: T;
  }
}

declare module "*.scss" {
  const content: string;
  export default content;
}

type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
};

type Concrete<Type> = {
  [Key in keyof Type]-?: Type[Key];
};
