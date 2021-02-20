export class Import {
    id: number;
    Year: number;
    Month: number;
    Day: number;
    DateTime: Date;
    ResolutionCode: string;
    OutAreacode: string;
    OutAreaTypeCode: string;
    OutAreaName: string;
    OutMapCode: string;
    InAreacode: string;
    InAreaTypeCode: string;
    InAreaName: string;
    InMapCode: string;
    Capacity: number;
    UpdateTime: string;

    constructor(
        id: number,
        Year: number,
        Month: number,
        Day: number,
        DateTime: Date,
        ResolutionCode: string,
        OutAreacode: string,
        OutAreaTypeCode: string,
        OutAreaName: string,
        OutMapCode: string,
        InAreacode: string,
        InAreaTypeCode: string,
        InAreaName: string,
        InMapCode: string,
        Capacity: number,
        UpdateTime: string) {
        this.id = id;
        this.Year = Year;
        this.Month = Month;
        this.Day = Day;
        this.DateTime = DateTime;
        this.ResolutionCode = ResolutionCode;
        this.OutAreacode = OutAreacode;
        this.OutAreaTypeCode = OutAreaTypeCode;
        this.OutAreaName = OutAreaName;
        this.OutMapCode = OutMapCode;
        this.InAreacode = InAreacode;
        this.InAreaTypeCode = InAreaTypeCode;
        this.InAreaName = InAreaName;
        this.InMapCode = InMapCode;
        this.Capacity = Capacity;
        this.UpdateTime = UpdateTime;
    }
}