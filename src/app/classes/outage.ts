export class Outage {
    id: number;
    Year: number;
    Month: number;
    Day: number;
    StartTS: Date;
    EndTS: Date;
    TimeZone: string;
    Mrid: string;
    Status: string;
    Type: string;
    areacode: string;
    AreaTypeCode: string;
    AreaName: string;
    MapCode: string;
    PowerResourceEIC: string;
    UnitName: string;
    ProductionType: string;
    InstalledGenerationCapacity: number;
    UnavailabilityValue: number;
    Version: number;
    Reason: string;
    UpdateTime: string;
  
    constructor(
      id: number,
      Year: number,
      Month: number,
      Day: number,
      StartTS: Date,
      EndTS: Date,
      TimeZone: string,
      Mrid: string,
      Status: string,
      Type: string,
      areacode: string,
      AreaTypeCode: string,
      AreaName: string,
      MapCode: string,
      PowerResourceEIC: string,
      UnitName: string,
      ProductionType: string,
      InstalledGenerationCapacity: number,
      UnavailabilityValue: number,
      Version: number,
      Reason: string,
      UpdateTime: string) {
      this.id = id;
      this.Year = Year;
      this.Month = Month;
      this.Day = Day;
      this.StartTS = StartTS;
      this.EndTS = EndTS;
      this.TimeZone = TimeZone;
      this.Mrid = Mrid;
      this.Status = Status;
      this.Type = Type;
      this.areacode = areacode;
      this.AreaTypeCode = AreaTypeCode;
      this.AreaName = AreaName;
      this.MapCode = MapCode;
      this.PowerResourceEIC = PowerResourceEIC;
      this.UnitName = UnitName;
      this.ProductionType = ProductionType;
      this.InstalledGenerationCapacity = InstalledGenerationCapacity;
      this.UnavailabilityValue = UnavailabilityValue;
      this.Version = Version;
      this.Reason = Reason;
      this.UpdateTime = UpdateTime;
    }
  }
  
  