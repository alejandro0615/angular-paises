
export interface Country {

  names: {
    common: string;
    official: string;
    translations?: {
      [key: string]: {
        common: string;
        official: string;
      };
    };
  };

  codes: {
    alpha_2: string;
    alpha_3?: string;
  };

  capitals?: {
    name: string;
    coordinates?: number[];
  }[];

  region?: string;
  subregion?: string;
  population?: number;
  borders?: string[];

  flag?: {
    emoji?: string;
    description?: string;
    url_png?: string;
    url_svg?: string;
  };

}
