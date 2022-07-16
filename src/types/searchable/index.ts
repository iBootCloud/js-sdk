import { IBC } from '@ibootcloud/common-lib';

export namespace Searchable {
  export interface InstanceSettingTypoTolerance {
    enabled?: boolean;
    disableOnWords?: string[];
    disableOnAttributes?: string[];
  }

  export interface InstanceSettingFacet {
    maxValuesPerFacet?: number;
  }

  export interface InstanceSettingPagination {
    maxTotalHits?: number;
  }

  export interface InstanceSettings {
    idField?: string;
    rankingRules?: string[];
    distinctAttribute?: string;
    synonyms?: Record<string, string[]>;
    filterableAttributes?: string[];
    sortableAttributes?: string[];
    stopWords?: string[];
    searchableAttributes?: string[];
    displayedAttributes?: string[];
    faceting?: InstanceSettingFacet;
    pagination?: InstanceSettingPagination;
    typoTolerance?: InstanceSettingTypoTolerance;
  }

  export interface InstanceInfo {
    instanceId: string;
    settings: InstanceSettings;
  }

  export type InstanceInfoWithMeiliIndex = InstanceInfo & {
    meiliIndex: string;
  };
  export type Highlight = {
    attributesToHighlight?: string[];
    highlightPreTag?: string;
    highlightPostTag?: string;
  };
  export type Crop = {
    attributesToCrop?: string[];
    cropLength?: number;
    cropMarker?: string;
  };

  export interface SearchConfig {
    highlight?: Highlight;
    crop?: Crop;
    filter?: string;
    facets?: string[];
    attributesToRetrieve?: string[];
    showMatchesPosition?: boolean;
    sort?: string[];
  }

  export interface SearchResult {
    page: IBC.Page<
      object & {
        _matchesPosition?: Record<
          string,
          Array<{
            start: number;
            length: number;
          }>
        >;
        _formatted?: object;
      }
    >;
    processingTimeMs: number;
    facetDistribution?: Record<string, Record<string, number>>;
  }

  export interface SearchDocumentsBody {
    query?: string;
    config?: SearchConfig;
  }

  export interface InstanceStatus {
    count: number;
    isIndexing: boolean;
    fieldDistribution: Record<string, number>;
  }

  export interface InitInstanceBody {
    idField: string;
  }

  export interface RemoveDocumentsBody {
    id: string[];
  }

  export interface ListDocumentsResponse {
    page: IBC.Page<object>;
  }

  export interface SaveDocumentsBody {
    documents: object[];
  }

  export interface PartialUpdateDocumentsBody {
    documents: object[];
  }
}
