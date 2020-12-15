export class Price {
    id: number;
    Year: number;
    Month: number;
    Day: number;
    DateTime: Date;
    ResolutionCode: string;
    areacode: string;
    AreaTypeCode: string;
    AreaName: string;
    MapCode: string
    Price: number;
    Currency: string;
    UpdateTime: string;
  
    constructor(
      id: number,
      Year: number,
      Month: number,
      Day: number,
      DateTime: Date,
      ResolutionCode: string,
      areacode: string,
      AreaTypeCode: string,
      AreaName: string,
      MapCode: string,
      Price: number,
      Currency: string,
      UpdateTime: string) {
      this.id = id;
      this.Year = Year;
      this.Month = Month;
      this.Day = Day;
      this.DateTime = DateTime;
      this.ResolutionCode = ResolutionCode;
      this.areacode = areacode;
      this.AreaTypeCode = AreaTypeCode;
      this.AreaName = AreaName;
      this.MapCode = MapCode;
      this.Price = Price;
      this.Currency = Currency;
      this.UpdateTime = UpdateTime;
    }
  }
  