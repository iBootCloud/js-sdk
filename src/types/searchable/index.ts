import { IBC } from '@ibootcloud/common-lib';
export interface SearchableInstanceSettingTypoTolerance {
  enabled?: boolean;
  disableOnWords?: string[];
  disableOnAttributes?: string[];
}
export interface SearchableInstanceSettingFacet {
  maxValuesPerFacet?: number;
}
export interface SearchableInstanceSettingPagination {
  maxTotalHits?: number;
}
export interface SearchableInstanceSettings {
  idField?: string;
  rankingRules?: string[];
  distinctAttribute?: string;
  synonyms?: Record<string, string[]>;
  filterableAttributes?: string[];
  sortableAttributes?: string[];
  stopWords?: string[];
  searchableAttributes?: string[];
  displayedAttributes?: string[];
  faceting?: SearchableInstanceSettingFacet;
  pagination?: SearchableInstanceSettingPagination;
  typoTolerance?: SearchableInstanceSettingTypoTolerance;
}
export interface SearchableInstanceInfo {
  instanceId: string;
  settings: SearchableInstanceSettings;
}
export type SearchableInstanceInfoWithMeiliIndex = SearchableInstanceInfo & {
  meiliIndex: string;
};
export type SearchableHighlight = {
  attributesToHighlight?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
};
export type SearchableCrop = {
  attributesToCrop?: string[];
  cropLength?: number;
  cropMarker?: string;
};
export interface SearchableSearchConfig {
  highlight?: SearchableHighlight;
  crop?: SearchableCrop;
  filter?: string;
  facets?: string[];
  attributesToRetrieve?: string[];
  showMatchesPosition?: boolean;
  sort?: string[];
}
export interface SearchableSearchResult {
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
export interface SearchableSearchDocumentsBody {
  query?: string;
  config?: SearchableSearchConfig;
}
export interface SearchableInstanceStatus {
  count: number;
  isIndexing: boolean;
  fieldDistribution: Record<string, number>;
}
export interface SearchableInitInstanceBody {
  idField: string;
}
export interface SearchableRemoveDocumentsBody {
  id: string[];
}
export interface SearchableListDocumentsResponse {
  page: IBC.Page<object>;
}
export interface SearchableSaveDocumentsBody {
  documents: object[];
}
export interface SearchablePartialUpdateDocumentsBody {
  documents: object[];
}
