import { IBC } from '@ibootcloud/common-lib';
export interface SearchableInstanceSettingTypoTolerance {
  enabled?: boolean;
  disableOnWords?: string[];
  disableOnAttributes?: string[];
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
  facetsDistribution?: string[];
  attributesToRetrieve?: string[];
  matchesDetail?: boolean;
  sort?: string[];
}
export interface SearchableSearchResult {
  page: IBC.Page<
    object & {
      _matchesDetail?: Record<
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
  facetsDistribution?: Record<string, Record<string, number>>;
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
