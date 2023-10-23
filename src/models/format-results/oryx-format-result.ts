export interface OryxStat {
  all: number;
  destroyed: number;
  damaged: number;
  abandoned: number;
  captured: number;
}

export interface OryxStatRoot {
  name: string;
  statistics: OryxStat;
}

export interface OryxDetailedEntityInfo {
  count: number;
  list: Array<string>;
}

export interface OryxDetailedEntity {
  name: string;
  count: number;
  destroyed: OryxDetailedEntityInfo;
  damaged: OryxDetailedEntityInfo;
  captured: OryxDetailedEntityInfo;
  abandoned: OryxDetailedEntityInfo;
  damagedAndCaptured: OryxDetailedEntityInfo;
  damagedAndAbandoned: OryxDetailedEntityInfo;
}

export interface OryxEntityType extends OryxStatRoot {
  details: Array<OryxDetailedEntity>;
}

export interface OryxFormatResult extends OryxStatRoot {
  entities: Array<OryxEntityType>;
}
